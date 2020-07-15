import axios from 'axios';

const baseUrl = process.env.REACT_APP_API_URL;

class UserAPI {
  static signup(userData) {
    return axios.post(`${baseUrl}/customers`, userData);
  }
}

export default UserAPI;
