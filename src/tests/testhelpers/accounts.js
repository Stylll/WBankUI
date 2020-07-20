export const newAccountFromServer = {
  name: 'Account A',
  accountNo: '5466',
  openingBalance: 589,
  currentBalance: 589,
};

export const newAccountBFromServer = {
  name: 'Account B',
  accountNo: '5467',
  openingBalance: 589,
  currentBalance: 589,
};

export const accountA = {
  accountName: newAccountFromServer.name,
  accountNo: newAccountFromServer.accountNo,
  openingBalance: newAccountFromServer.openingBalance,
  currentBalance: newAccountFromServer.currentBalance,
};

export const accountB = {
  accountName: newAccountBFromServer.name,
  accountNo: newAccountBFromServer.accountNo,
  openingBalance: newAccountBFromServer.openingBalance,
  currentBalance: newAccountBFromServer.currentBalance,
};

export const newAccountData = {
  account: newAccountFromServer,
};

export const newAccountDataB = {
  account: newAccountBFromServer,
};

export const getAccountsData = [accountA, accountB];

export const depositResponse = {
  accountNo: accountB.accountNo,
  cadAmount: 400,
};

export const depositedAccountB = {
  ...accountB,
  currentBalance: accountB.currentBalance + depositResponse.cadAmount,
};

export const withdrawResponse = {
  accountNo: accountA.accountNo,
  cadAmountDebited: 250,
};

export const withdrawAccountA = {
  ...accountA,
  currentBalance: accountA.currentBalance - withdrawResponse.cadAmountDebited,
};

export const transferResponse = {
  accountNo: accountA.accountNo,
  cadAmountTransferred: 300,
  transfer: {
    accountNo: accountB.accountNo,
  },
};

export const transferAccountA = {
  ...accountA,
  currentBalance: accountA.currentBalance - transferResponse.cadAmountTransferred,
};

export const transferAccountB = {
  ...accountB,
  currentBalance: accountB.currentBalance + transferResponse.cadAmountTransferred,
};

export const errorData = {
  message: 'An error occurred',
};

export const serverError = {
  response: {
    status: 400,
    data: {
      errors: {
        openingBalance: 'Opening balance is required',
      },
    },
  },
};

export const serverErrorB = {
  response: {
    status: 400,
    data: {
      errors: {
        accountNo: 'Account No does not exist',
      },
    },
  },
};

export const createAccountApiResponse = {
  data: {
    data: {
      accountNo: '1234',
      name: 'My Account',
      openingBalance: 4556,
    },
  },
};

export const getAccountsApiResponse = {
  data: {
    data: [{
      accountNo: '1234',
      name: 'My Account',
      openingBalance: 4556,
    }, {
      accountNo: '1234',
      name: 'My Account 2',
      openingBalance: 4563,
    }],
  },
};

export const depositAccountRequest = {
  accountNo: '234',
  amount: '5000',
  currency: 'usd',
};

export const depositAccountApiResponse = {
  data: {
    data: {
      accountNo: depositAccountRequest.accountNo,
      name: 'My Account',
      amount: depositAccountRequest.amount,
      cadAmount: depositAccountRequest.amount,
      depositCurrency: depositAccountRequest.currency,
    },
  },
};

export const withdrawAccountRequest = {
  accountNo: '234',
  amount: '5000',
  currency: 'usd',
};

export const withdrawAccountApiResponse = {
  data: {
    data: {
      accountNo: withdrawAccountRequest.accountNo,
      name: 'My Account',
      amountDebited: withdrawAccountRequest.amount,
      cadAmountDebited: withdrawAccountRequest.amount,
      depositCurrency: withdrawAccountRequest.currency,
    },
  },
};

export const transferAccountRequest = {
  accountNo: '234',
  transferAccountNo: '123',
  amount: '5000',
  currency: 'usd',
};

export const transferAccountApiResponse = {
  data: {
    data: {
      accountNo: transferAccountRequest.accountNo,
      name: 'My Account',
      transfer: {
        accountNo: transferAccountRequest.transferAccountNo,
        name: 'My Account B',
      },
      amountTransferred: transferAccountRequest.amount,
      cadAmountTransferred: transferAccountRequest.amount,
      transferCurrency: transferAccountRequest.currency,
    },
  },
};
