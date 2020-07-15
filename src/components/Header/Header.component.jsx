import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';
import { getUserDetails, logout } from '../../helpers/utils';
import * as UserActions from '../../redux/actionCreators/userActions';
import './Header.styles.scss';

const Header = ({
  logoutUser,
}) => {
  const [isAuth, setIsAuth] = useState(false);
  const history = useHistory();

  useEffect(() => {
    const { isAuthenticated } = getUserDetails();

    if (!isAuthenticated) {
      setIsAuth(false);
    } else {
      setIsAuth(true);
    }
  }, []);

  const handleLogout = () => {
    logoutUser();
    logout();
    history.push('/');
  };

  return (
        <div className="header container">
            <div className="link">
              WBank
            </div>
            <div className="topRight">
              {isAuth && <div className="link">
                <Link to="/dashboard">Dashboard</Link>
              </div>}
              {isAuth && <div className="link" onClick={handleLogout}>
                logout
              </div>}
            </div>
        </div>
  );
};

Header.propTypes = {
  logoutUser: PropTypes.func.isRequired,
};

const actionCreators = {
  logoutUser: UserActions.logoutUser,
};

export default connect('', actionCreators)(Header);
