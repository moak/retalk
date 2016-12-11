import axios from 'axios';

class User {

  static getUsers() {
    return axios.get('http://localhost:3000/users')
  }

  // static addUser(movie) {
  //   console.log('movie in service', movie);
  //   return axios.post('http://localhost:4000/movies/', { title: movie.title, description: movie.description })
  // }
  //
  // static deleteUser(id) {
  //   return axios.delete('http://localhost:4000/movies/' + id)
  // }
  //
  // static editUser(movie) {
  //   console.log('service edit moviz');
  //   return axios.put('http://localhost:4000/movies/' + movie.id, { title: movie.title, description: movie.description })
  // }
}

export default User;
