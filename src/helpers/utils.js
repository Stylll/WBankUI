/* eslint-disable import/prefer-default-export */
import jwt from 'jsonwebtoken';
import { jwtKey } from './defaults';

export const isExpired = (expiredTimeInSec) => {
  const now = new Date();
  const nowInSec = Math.floor(now.getTime() * 0.001); // Convert date to sec
  return nowInSec > expiredTimeInSec;
};

export const logout = () => {
  localStorage.removeItem(jwtKey);
};

export const getUserDetails = (tokn) => {
  try {
    const token = tokn || localStorage.getItem(jwtKey);
    const userData = jwt.decode(token);
    const isAuthenticated = !!(userData && !isExpired(userData.exp));

    if (tokn && isAuthenticated) {
      localStorage.setItem(jwtKey, tokn);
    }

    if (!isAuthenticated) {
      localStorage.removeItem(jwtKey);
    }

    const data = {
      isAuthenticated,
      userData,
    };

    return data;
  } catch (error) {
    localStorage.removeItem(jwtKey);
    return {
      isAuthenticated: false,
      userData: null,
    };
  }
};

export const apiErrorHandler = (error) => {
  let errorMessage;
  let validationErrors;
  // if server gets an error response, handle it
  if (error.response) {
    /**
       * using a switch statement instead of if/else because there is
       * a chance that we have to handle other error codes when we make
       * requests like GET to the server
       */
    switch (error.response.status) {
      case 500:
        errorMessage = 'Server error, try again';
        break;
      case 400:
        if (error.response.data.errors && error.response.data.errors.length) {
          validationErrors = error.response.data.errors
            .map((err) => err.msg || err.message)
            .join(', ');
          errorMessage = `${validationErrors}`;
        } else if (error.response.data.errors) {
          validationErrors = Object.keys(error.response.data.errors)
            .map((key) => error.response.data.errors[key] || error.response.data.errors[key].msg
              || error.response.data.errors[key].message)
            .join(', ');
          errorMessage = `${validationErrors}`;
        }
        else {
          errorMessage = error.response.data.message || error.response.statusText;
        }
        break;
      default:
        errorMessage = error.response.data.error || error.response.data.message;
    }
  } else {
    //  if server is down, client won't get a response
    errorMessage = 'Possible network error, please check your connection and try again';
  }
  return errorMessage;
};
