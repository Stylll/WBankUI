/* eslint-disable import/prefer-default-export */
export const user = {
  id: 5,
  email: 'user@email.com',
  name: 'UserA',
};

export const signupUserData = {
  userData: {
    user,
  },
};

export const signinUserData = {
  userData: {
    user,
  },
};

export const errorData = {
  message: 'An error occurred',
};

export const signupRequest = {
  customerId: '23',
  email: 'myemail@yahoo.com',
};

export const signupApiResponse = {
  data: {
    token: '1234567890',
  },
};

export const signinApiResponse = {
  data: {
    token: '1234567890',
  },
};

export const serverError = {
  response: {
    status: 400,
    data: {
      errors: {
        name: 'Email is required',
      },
    },
  },
};
