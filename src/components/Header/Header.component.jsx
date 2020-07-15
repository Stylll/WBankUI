import React, { useState, useEffect, Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { getUserDetails, logout } from '../../helpers/utils';
import * as UserActions from '../../redux/actionCreators/userActions';
import './Header.styles.scss';

const Header = ({
  logoutUser,
}) => {
  const [isAuth, setIsAuth] = useState(false);
  const [user, setUser] = useState({});
  const history = useHistory();

  useEffect(() => {
    const { isAuthenticated, userData } = getUserDetails();

    if (!isAuthenticated) {
      setIsAuth(false);
      setUser({});
    } else {
      setIsAuth(true);
      setUser(userData.user);
    }
  }, []);

  const handleLogout = () => {
    logoutUser();
    logout();
    history.push('/');
  };

  return (
      <Fragment>
        <div className="header container">
            <div className="link">
              WBank
            </div>
            <div className="topRight">
              {isAuth && <div className="link" onClick={handleLogout}>
                logout
              </div>}
            </div>
        </div>
        <div className="bottom container">
          {isAuth && <div>Welcome, {user && user.name}</div>}
          {isAuth && <div>Customer Id: {user && user.id} (Please note: you will
          need the customer id to login to your account)</div>}
        </div>
      </Fragment>
  );
};

Header.propTypes = {
  logoutUser: PropTypes.func.isRequired,
};

const actionCreators = {
  logoutUser: UserActions.logoutUser,
};

export default connect('', actionCreators)(Header);
