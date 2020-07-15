import axios from 'axios';

const baseUrl = process.env.REACT_APP_API_URL;

class AccountAPI {
  static getAccounts() {
    return axios.get(`${baseUrl}/accounts`);
  }
}

export default AccountAPI;
