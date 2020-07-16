import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Header from '../../components/Header/Header.component';
import Loader from '../../components/Loader/Loader.component';
import Modal from '../../components/Modal/Modal.component';
import CreateAccount from '../../components/CreateAccount/CreateAccount.component';
import CreateDeposit from '../../components/CreateDeposit/CreateDeposit.component';
import CreateWithdrawal from '../../components/CreateWithdrawal/CreateWithdrawal.component';
import CreateTransfer from '../../components/CreateTransfer/CreateTransfer.component';
import * as accountActions from '../../redux/actionCreators/accountActions';
import './styles.scss';

const HomePage = ({
  accounts, getAccounts, isLoading,
}) => {
  const [showCreateAccountModal, setShowCreateAccountModal] = useState(false);
  const [showCreateDepositModal, setShowCreateDepositModal] = useState(false);
  const [showCreateWithdrawalModal, setShowCreateWithdrawalModal] = useState(false);
  const [showCreateTransferModal, setShowCreateTransferModal] = useState(false);

  useEffect(() => {
    getAccounts();
  }, [getAccounts]);

  const loaderStyles = {
    width: '20px',
    height: '20px',
  };

  const showCreateAccount = () => {
    setShowCreateAccountModal(true);
  };

  const hideCreateAccount = () => {
    setShowCreateAccountModal(false);
  };

  const showCreateDeposit = () => {
    setShowCreateDepositModal(true);
  };

  const hideCreateDeposit = () => {
    setShowCreateDepositModal(false);
  };

  const showCreateWithdrawal = () => {
    setShowCreateWithdrawalModal(true);
  };

  const hideCreateWithdrawal = () => {
    setShowCreateWithdrawalModal(false);
  };

  const showCreateTransfer = () => {
    setShowCreateTransferModal(true);
  };

  const hideCreateTransfer = () => {
    setShowCreateTransferModal(false);
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
              <th>Account Name</th>
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
      <div className="navigation-container">
        <div className="navbox create" onClick={showCreateAccount}>
          Create Account
        </div>
        <div className="navbox deposit" onClick={showCreateDeposit}>
          Deposit
        </div>
        <div className="navbox withdrawal" onClick={showCreateWithdrawal}>
          Withdrawal
        </div>
        <div className="navbox transfer" onClick={showCreateTransfer}>
          Transfer
        </div>
      </div>
      <div className="account-container">
        <div>
          {isLoading && <Loader customStyles={loaderStyles} message="fetching account records, hang tight..." />}
          {!isLoading && (<h3>My Accounts</h3>)}
          {!isLoading && renderTable(accounts)}
        </div>
      </div>
      <Modal isModalVisible={showCreateAccountModal}
        handleModalClose={hideCreateAccount}
      >
        <CreateAccount closeModal={hideCreateAccount} />
      </Modal>
      <Modal isModalVisible={showCreateDepositModal}
        handleModalClose={hideCreateDeposit}
      >
        <CreateDeposit closeModal={hideCreateDeposit} />
      </Modal>
      <Modal isModalVisible={showCreateWithdrawalModal}
        handleModalClose={hideCreateWithdrawal}
      >
        <CreateWithdrawal closeModal={hideCreateWithdrawal} />
      </Modal>
      <Modal isModalVisible={showCreateTransferModal}
        handleModalClose={hideCreateTransfer}
      >
        <CreateTransfer closeModal={hideCreateTransfer} />
      </Modal>
    </div>
  );
};

HomePage.propTypes = {
  getAccounts: PropTypes.func.isRequired,
  isLoading: PropTypes.bool.isRequired,
  accounts: PropTypes.array.isRequired,
};

const mapStateToProps = ({ account }) => ({
  isLoading: account.isLoading,
  accounts: account.accounts,
});

const mapDispatchToProps = {
  getAccounts: accountActions.getAccounts,
};

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
