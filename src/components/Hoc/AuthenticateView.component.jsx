import React, { Fragment, useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';

import { getUserDetails } from '../../helpers/utils';
import * as UserActions from '../../redux/actionCreators/userActions';

export default function (View) {
  const AuthenticatedView = (props) => {
    const {
      logoutUser, signupUserSuccess,
    } = props;

    const history = useHistory();
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
      const { isAuthenticated, userData } = getUserDetails();

      if (!isAuthenticated) {
        logoutUser();
        history.push('/signup');
      } else {
        signupUserSuccess({ isAuthenticated, userData });
        setIsLoading(false);
      }
    }, [logoutUser, signupUserSuccess, history]);

    return (
        <Fragment>
        {!isLoading && <View {...props} />}
        </Fragment>
    );
  };

  AuthenticatedView.propTypes = {
    logoutUser: PropTypes.func.isRequired,
    signupUserSuccess: PropTypes.func.isRequired,
  };

  const actionCreators = {
    logoutUser: UserActions.logoutUser,
    signupUserSuccess: UserActions.signupUserSuccess,
  };

  return connect('', actionCreators)(AuthenticatedView);
}
