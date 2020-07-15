import axios from 'axios';

const baseUrl = process.env.REACT_APP_API_URL;

class UserAPI {
  static signup(userData) {
    return axios.post(`${baseUrl}/customers`, userData);
  }

  static signin(userData) {
    return axios.post(`${baseUrl}/customers/authenticate`, userData);
  }
}

export default UserAPI;
