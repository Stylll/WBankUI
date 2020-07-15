import axios from 'axios';

const baseUrl = process.env.REACT_APP_API_URL;

class AccountAPI {
  static getAccounts() {
    return axios.get(`${baseUrl}/accounts`);
  }

  static createAccount(accountData) {
    return axios.post(`${baseUrl}/accounts`, accountData);
  }

  static makeDeposit(requestData) {
    return axios.post(`${baseUrl}/accounts/${requestData.accountNo}/deposits`, requestData);
  }
}

export default AccountAPI;
