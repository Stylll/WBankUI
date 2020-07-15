import React, {  useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Header from '../../components/Header/Header.component';
import Loader from '../../components/Loader/Loader.component';
import * as accountActions from '../../redux/actionCreators/accountActions';
import './styles.scss';

const HomePage = ({
  accounts, getAccounts, isLoading,
}) => {
  useEffect(() => {
    getAccounts();
  }, [getAccounts]);

  const loaderStyles = {
    width: '20px',
    height: '20px',
  };

  const renderTableBody = (userAccounts) => {
    if (!userAccounts.length) {
      return (
        <tbody>
        <tr>
          <td colSpan="5">No account records.</td>
        </tr>
      </tbody>
      );
    }

    return (
      <tbody>
        {userAccounts.map((account, key) => {
          const id = key + 1;
          return (
            <tr key={key}>
              <td>{id}</td>
              <td>{account.accountNo}</td>
              <td>{account.accountName}</td>
              <td>{`CAD$${Number.parseFloat(account.openingBalance).toFixed(2)}`}</td>
              <td>{`CAD$${Number.parseFloat(account.currentBalance).toFixed(2)}`}</td>
            </tr>
          );
        })}
      </tbody>
    );
  };

  const renderTable = (userAccounts) => {
    return (
      <div className="table">
        <table>
          <thead>
            <tr>
              <th>S/N</th>
              <th>AccountNo</th>
              <th>AccountName</th>
              <th>Opening Bal</th>
              <th>Current Bal</th>
            </tr>
          </thead>
          {renderTableBody(userAccounts)}
        </table>
      </div>
    );
  };

  return (
    <div>
      <Header />
      <div className="account-container">
        <div>
          {isLoading && <Loader customStyles={loaderStyles} message="fetching account records, hang tight..." />}
          {!isLoading && (<p>My Accounts</p>)}
          {!isLoading && renderTable(accounts)}
        </div>
      </div>
    </div>
  );
};

HomePage.propTypes = {
  getAccounts: PropTypes.func.isRequired,
  isLoading: PropTypes.bool.isRequired,
  userErrorMessage: PropTypes.string.isRequired,
  accounts: PropTypes.array.isRequired,
};

const mapStateToProps = ({ account }) => ({
  isLoading: account.isLoading,
  userErrorMessage: account.errorMessage,
  accounts: account.accounts,
});

const mapDispatchToProps = {
  getAccounts: accountActions.getAccounts,
};

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
