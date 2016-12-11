const express = require('express');
const mongoose = require('mongoose').set('debug', true);
const bodyParser = require('body-parser');
const cors = require('cors');
const port = 3000;
const app = express();
var ObjectId = require('mongodb').ObjectID;


// configure bodyParser (for receiving form data)
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(cors());
mongoose.Promise = global.Promise;

// connect to mongodb
mongoose.connect('mongodb://localhost/retalk');

let User = require('./models/User');
let Chat = require('./models/Chat');

// let Message = require('./models/Message');


var seedUsers = require('./seeds/users');

/*
 * Get a single response object and 404 if it isn't found.
 * @param err {Object} Error reported from Mongo.
 * @param foundObject {Object} An Object found by Mongo.
 * @this Express Response Object
 */
function getSingularResponse (err, foundObject) {
  if (err) {
    this.status(500).json({ error: err.message });
  } else {
    if (foundObject === null) {
      this.status(404).json({ error: 'Not found' });
    } else {
      this.status(200).json(foundObject);
    }
  }
}

// GET USERS
app.get('/users', (req, res) => {
  // find all userss in db
  User.find(function (err, allUsers) {
    if (err) {npm
      res.status(500).json({ error: err.message });
    } else {
      res.json({ users: allUsers });
    }
  });
});

// GET ONE USER
app.get('/users/:id', (req, res) => {
  User.findOne({_id : req.params.id}, getSingularResponse.bind(res));
});

// DELETE USER
app.delete('/users/:id', (req, res) => {
  User.findOneAndRemove({ _id: req.params.id }, getSingularResponse.bind(res));
});

// POST USER
app.post('/users', (req, res) => {

  let newUser = new User({ name: req.body.name });

  newUser.save((err, savedUser) => {
    if (err) {
      res.status(500).json({ error: err.message });
    } else {
      res.status(201).json(savedUser);
    }
  });
});

// "_user1": "584ca1a2d3ebbd2a04320713",
// "_user2": "584ca1a8d3ebbd2a04320714",
// POST CHAT
app.post('/chats', (req, res, next) => {

  let creationPossible = false;
  let _user1 = req.body.id1;
  let _user2 = req.body.id2;

  Chat.count(
    { $or:
      [
        { _user1: _user1, _user2: _user2 },
        { _user1: _user2, _user2: _user1 }
      ]
    } ,
    (err, count) => {
      if (count > 0) {
        return res.status(404).json({ error: 'Already exists' });
      }
      else {
        User.count({_id: _user1, _id: _user2}, (err, count) => {
          creationPossible = true;
          if (creationPossible) {
            let newChat = new Chat({
              _user1: _user1,
              _user2: _user2
            });
            newChat.save( (err, newChat) => {
              if (err) {
                res.status(500).json({ error: err.message });
              } else {

                User.findByIdAndUpdate(_user1,
                  {$push: {"chats": newChat._id}},
                  {safe: true, upsert: true, new : true},
                  function(err, model) {
                    User.findByIdAndUpdate(_user2,
                      {$push: {"chats": newChat._id}},
                      {safe: true, upsert: true, new : true},
                      function(err, model) {
                        res.status(201).json(newChat);
                      }
                    );
                  }
                );
              }
            });
          }
          else {
            res.status(404).json({ error: 'Not found' });
          }
        });
      }
    }
  )
});

// POST CHAT
app.post('/chats/:id', (req, res) => {

  console.log('Date.now', Date.now);
  let newMessage = {
    _author : req.body.author,
    content: req.body.content
  };

  Chat.findByIdAndUpdate(
    req.params.id,
    {$push: {"messages": newMessage}},
    {safe: true, upsert: true, new : true},
    function(err, model) {
      if (err) {
        res.status(500).json({ error: err.message });
      } else {
        res.status(201).json(model);
      }
    }
  );
});

// GET CHATS
app.get('/chats', (req, res) => {
  // find all chatss in db
  Chat.find(function (err, allChats) {
    if (err) {npm
      res.status(500).json({ error: err.message });
    } else {
      res.json({ chats: allChats });
    }
  });
});

app.get('/purge', (req, res) => {
  User.remove({}, (err) => {
    Chat.remove({}, (err) => {
      if (err) {
        res.status(500).json({ error: err.message });
      } else {
        res.status(201).json({purge: 'ok'});
      }
    });
  });
});


app.listen(port, () => {
    console.log('Now listening on port: ', port);
});
