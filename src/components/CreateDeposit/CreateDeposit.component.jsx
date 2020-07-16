import React, { useState, useEffect, useRef } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import * as accountActions from '../../redux/actionCreators/accountActions';
import TextInput from '../TextInput/TextInput.component';
import Button from '../Button/Button.component';
import Dropdown from '../Dropdown/Dropdown.component';
import { validateCreateDeposit } from '../../helpers/validators/accountValidator';
import { currencies } from '../../helpers/defaults';
import './CreateDeposit.styles.scss';

const CreateDeposit = ({
  createDeposit, isLoading: reduxIsLoading, closeModal,
  errorMessage, accountDepositSuccess,
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
    if (!reduxIsLoading && accountDepositSuccess && formSubmitted.current) {
      setIsLoading(false);
      closeModal();
      formSubmitted.current = false;
      return;
    }

    if (!reduxIsLoading && formSubmitted.current) {
      setIsLoading(false);
      formSubmitted.current = false;
    }
  }, [reduxIsLoading, accountDepositSuccess, closeModal]);

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
    const { isValid, errors } = validateCreateDeposit(values);
    setFormErrors({
      ...errors,
    });
    if (!isValid) {
      return;
    }

    setIsLoading(true);

    createDeposit({
      accountNo: values.accountNo,
      amount: values.amount,
      currency: values.currency,
    });

    formSubmitted.current = true;
    hasServerOperationOccurred.current = true;
  };

  const renderCreateForm = () => (
    <div className="deposit-container">
        <div>
            <p>Make a deposit</p>
            <span className="error-text">{serverError}</span>
            <TextInput
                name="accountNo"
                placeholder="3245"
                title="Enter the account number to deposit"
                type="text"
                value={values.accountNo}
                error={formErrors.accountNo}
                onChange={handleChange} />
            <TextInput
                name="amount"
                placeholder="5000"
                title="Enter the amount to deposit"
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
                title="Deposit"
                handleClick={handleClick}
                showLoader={isLoading}
                disabled={isLoading}
            />
        </div>
        <br />
    </div>
  );

  return (
        <div className="deposit-account-container">
            <div className="form-container">
                    {renderCreateForm()}
                </div>
        </div>
  );
};

CreateDeposit.propTypes = {
  createDeposit: PropTypes.func.isRequired,
  closeModal: PropTypes.func.isRequired,
  isLoading: PropTypes.bool.isRequired,
  accountDepositSuccess: PropTypes.bool.isRequired,
  errorMessage: PropTypes.string.isRequired,
};

const mapStateToProps = ({ account }) => ({
  isLoading: account.isDepositAccountLoading,
  accountDepositSuccess: account.accountDepositSuccess,
  errorMessage: account.errorMessage,
});

const mapDispatchToProps = {
  createDeposit: accountActions.createDeposit,
};

export default connect(mapStateToProps, mapDispatchToProps)(CreateDeposit);
