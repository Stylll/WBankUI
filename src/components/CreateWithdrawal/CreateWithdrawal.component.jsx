import React, { useState, useEffect, useRef } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import * as accountActions from '../../redux/actionCreators/accountActions';
import TextInput from '../TextInput/TextInput.component';
import Button from '../Button/Button.component';
import Dropdown from '../Dropdown/Dropdown.component';
import { validateCreateWithdrawal } from '../../helpers/validators/accountValidator';
import { currencies } from '../../helpers/defaults';
import './CreateWithdrawal.styles.scss';

const CreateWithdrawal = ({
  createWithdrawal, isLoading: reduxIsLoading, closeModal,
  errorMessage, accountWithdrawalSuccess,
}) => {
  const [values, setValues] = useState({
    accountNo: '',
    amount: '',
    currency: '',
  });

  const [formErrors, setFormErrors] = useState({
    accountNo: '',
    amount: '',
    currency: '',
  });

  const [isLoading, setIsLoading] = useState(false);

  const [serverError, setServerError] = useState('');

  const formSubmitted = useRef(false);
  const hasServerOperationOccurred = useRef(false);

  useEffect(() => {
    if (!reduxIsLoading && accountWithdrawalSuccess && formSubmitted.current) {
      setIsLoading(false);
      closeModal();
      formSubmitted.current = false;
      return;
    }

    if (!reduxIsLoading && formSubmitted.current) {
      setIsLoading(false);
      formSubmitted.current = false;
    }
  }, [reduxIsLoading, accountWithdrawalSuccess, closeModal]);

  useEffect(() => {
    if (errorMessage && hasServerOperationOccurred.current) {
      setServerError(errorMessage);
    }
  }, [errorMessage]);

  const handleChange = (event) => {
    event.preventDefault();
    setValues({
      ...values,
      [event.target.name]: event.target.value,
    });
  };

  const handleClick = (event) => {
    event.preventDefault();
    const { isValid, errors } = validateCreateWithdrawal(values);
    setFormErrors({
      ...errors,
    });
    if (!isValid) {
      return;
    }

    setIsLoading(true);

    createWithdrawal({
      accountNo: values.accountNo,
      amount: values.amount,
      currency: values.currency,
    });

    formSubmitted.current = true;
    hasServerOperationOccurred.current = true;
  };

  const renderCreateForm = () => (
    <div className="withdraw-container">
        <div>
            <p>Make a withdrawal</p>
            <span className="error-text">{serverError}</span>
            <TextInput
                name="accountNo"
                placeholder="3245"
                title="Enter the account number to withdraw from"
                type="text"
                value={values.accountNo}
                error={formErrors.accountNo}
                onChange={handleChange} />
            <TextInput
                name="amount"
                placeholder="5000"
                title="Enter the amount to withdraw"
                type="text"
                value={values.amount}
                error={formErrors.amount}
                onChange={handleChange} />
            <Dropdown
                options={currencies}
                name="currency"
                optionsTitleProperty="name"
                optionsValueProperty="id"
                value={values.currency}
                error={formErrors.currency}
                onChange={handleChange}
                placeholder="select amount currency"
            />
            <br />
            <Button
                title="Withdraw"
                handleClick={handleClick}
                showLoader={isLoading}
                disabled={isLoading}
            />
        </div>
        <br />
    </div>
  );

  return (
        <div className="withdraw-account-container">
            <div className="form-container">
                    {renderCreateForm()}
                </div>
        </div>
  );
};

CreateWithdrawal.propTypes = {
  createWithdrawal: PropTypes.func.isRequired,
  closeModal: PropTypes.func.isRequired,
  isLoading: PropTypes.bool.isRequired,
  accountWithdrawalSuccess: PropTypes.bool.isRequired,
  errorMessage: PropTypes.string.isRequired,
};

const mapStateToProps = ({ account }) => ({
  isLoading: account.isWithdrawAccountLoading,
  accountWithdrawalSuccess: account.accountWithdrawalSuccess,
  errorMessage: account.errorMessage,
});

const mapDispatchToProps = {
  createWithdrawal: accountActions.createWithdrawal,
};

export default connect(mapStateToProps, mapDispatchToProps)(CreateWithdrawal);
