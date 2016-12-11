import React from 'react';

import {
  Platform,
  StyleSheet,
  Text,
  View,
} from 'react-native';

import Navbar from './Navbar';

import {GiftedChat, Bubble} from 'react-native-gifted-chat';

export default class Chat extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      messages: [],
      loadEarlier: true,
      typingText: null,
      isLoadingEarlier: false,
    };

    this._isMounted = false;
    this.onSend = this.onSend.bind(this);
    this.onReceive = this.onReceive.bind(this);
    this.renderBubble = this.renderBubble.bind(this);
    this.renderFooter = this.renderFooter.bind(this);
    this.onLoadEarlier = this.onLoadEarlier.bind(this);

    this._isAlright = null;
  }

  componentWillMount() {

    this.props.getUsers();
    this._isMounted = true;
    this.setState(() => {
      return { messages: require('../data/messages.js') };
    });
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  onLoadEarlier() {
    this.setState((previousState) => {
      return { isLoadingEarlier: true };
    });

    setTimeout(() => {
      if (this._isMounted === true) {
        this.setState((previousState) => {
          return {
            messages: GiftedChat.prepend(previousState.messages, [
              {
                _id: Math.round(Math.random() * 1000000),
                text: 'Yes, and I used Chat!',
                createdAt: new Date(Date.UTC(2016, 7, 30, 17, 20, 0)),
                user: {
                  _id: 1,
                  name: 'Developer',
                },
              },
              {
                _id: Math.round(Math.random() * 1000000),
                text: 'FUUUU',
                createdAt: new Date(Date.UTC(2016, 7, 30, 17, 20, 0)),
                user: {
                  _id: 1,
                  name: 'Developer',
                },
              },
              {
                _id: Math.round(Math.random() * 1000000),
                text: 'Are you building a chat app?',
                createdAt: new Date(Date.UTC(2016, 7, 30, 17, 20, 0)),
                user: {
                  _id: 2,
                  name: 'React Native',
                },
              },
              {
                _id: Math.round(Math.random() * 1000000),
                text: 'Are you building a chat app?',
                createdAt: new Date(Date.UTC(2016, 7, 30, 17, 20, 0)),
                user: {
                  _id: 2,
                  name: 'React Native',
                },
              },
            ]),
            loadEarlier: false,
            isLoadingEarlier: false,
          };


        });
      }
    }, 1000); // simulating network
  }

  onSend(messages = []) {
    this.setState((previousState) => {
      return { messages: GiftedChat.append(previousState.messages, messages)};
    });

    // for demo purpose
    this.answerDemo(messages);
  }

  answerDemo(messages) {
    if (messages.length > 0) {
      if (!this._isAlright) {
        this.setState((previousState) => {
          return { typingText: 'React Native is typing' };
        });
      }
    }

    setTimeout(() => {
      if (this._isMounted === true) {
        if (messages.length > 0) {
          if (!this._isAlright) {
            this._isAlright = true;
            this.onReceive('Alrigt');
          }
          this._isAlright = false;
        }
      }

      this.setState((previousState) => {
        return { typingText: null };
      });
    }, 1000);
  }

  onReceive(text) {
    this.setState((previousState) => {
      return {
        messages: GiftedChat.append(previousState.messages, {
          _id: Math.round(Math.random() * 1000000),
          text: text,
          createdAt: new Date(),
          user: {
            _id: 2,
            name: 'React Native',
          },
        }),
      };
    });
  }


  renderBubble(props) {
    return (
      <Bubble
        {...props}
        wrapperStyle={{
          left: {
            backgroundColor: '#f0f0f0',
          }
        }}
      />
    );
  }


  renderFooter(props) {
    if (this.state.typingText) {
      return (
        <View style={styles.footerContainer}>
          <Text style={styles.footerText}>
            {this.state.typingText}
          </Text>
        </View>
      );
    }
    return null;
  }

  render() {
    console.log(this.props.users);
    return (
      <View>
        <Navbar right="Menu" left="Back" />
        <GiftedChat
          messages={this.state.messages}
          onSend={this.onSend}
          loadEarlier={this.state.loadEarlier}
          onLoadEarlier={this.onLoadEarlier}
          isLoadingEarlier={this.state.isLoadingEarlier}

          user={{
            _id: 1, // sent messages should have same user._id
          }}

          renderBubble={this.renderBubble}
          renderFooter={this.renderFooter}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  footerContainer: {
    marginTop: 5,
    marginLeft: 10,
    marginRight: 10,
    marginBottom: 10,
  },
  footerText: {
    fontSize: 14,
    color: '#aaa',
  },
});
