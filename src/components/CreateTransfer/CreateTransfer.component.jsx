import React, { useState, useEffect, useRef } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import * as accountActions from '../../redux/actionCreators/accountActions';
import TextInput from '../TextInput/TextInput.component';
import Button from '../Button/Button.component';
import Dropdown from '../Dropdown/Dropdown.component';
import { validateCreateTransfer } from '../../helpers/validators/accountValidator';
import { currencies } from '../../helpers/defaults';
import './CreateTransfer.styles.scss';

const CreateTransfer = ({
  createTransfer, isLoading: reduxIsLoading, closeModal,
  errorMessage, accountTransferSuccess, dataTestId,
}) => {
  const [values, setValues] = useState({
    accountNo: '',
    transferAccountNo: '',
    amount: '',
    currency: '',
  });

  const [formErrors, setFormErrors] = useState({
    accountNo: '',
    transferAccountNo: '',
    amount: '',
    currency: '',
  });

  const [isLoading, setIsLoading] = useState(false);

  const [serverError, setServerError] = useState('');

  const formSubmitted = useRef(false);
  const hasServerOperationOccurred = useRef(false);

  useEffect(() => {
    if (!reduxIsLoading && accountTransferSuccess && formSubmitted.current) {
      setIsLoading(false);
      closeModal();
      formSubmitted.current = false;
      return;
    }

    if (!reduxIsLoading && formSubmitted.current) {
      setIsLoading(false);
      formSubmitted.current = false;
    }
  }, [reduxIsLoading, accountTransferSuccess, closeModal]);

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
    const { isValid, errors } = validateCreateTransfer(values);
    setFormErrors({
      ...errors,
    });
    if (!isValid) {
      return;
    }

    setIsLoading(true);

    createTransfer({
      accountNo: values.accountNo,
      transferAccountNo: values.transferAccountNo,
      amount: values.amount,
      currency: values.currency,
    });

    formSubmitted.current = true;
    hasServerOperationOccurred.current = true;
  };

  const renderCreateForm = () => (
    <div className="transfer-container">
        <div>
            <p>Make a transfer</p>
            <span className="error-text">{serverError}</span>
            <TextInput
                name="accountNo"
                placeholder="3245"
                title="Enter the account number to transfer from"
                type="text"
                value={values.accountNo}
                error={formErrors.accountNo}
                onChange={handleChange}
                dataTestId={`${dataTestId}-accountNo`} />
            <TextInput
                name="transferAccountNo"
                placeholder="1294"
                title="Enter the account number to transfer to"
                type="text"
                value={values.transferAccountNo}
                error={formErrors.transferAccountNo}
                onChange={handleChange}
                dataTestId={`${dataTestId}-transferAccountNo`} />
            <TextInput
                name="amount"
                placeholder="5000"
                title="Enter the amount to transfer"
                type="text"
                value={values.amount}
                error={formErrors.amount}
                onChange={handleChange}
                dataTestId={`${dataTestId}-amount`} />
            <Dropdown
                options={currencies}
                name="currency"
                optionsTitleProperty="name"
                optionsValueProperty="id"
                value={values.currency}
                error={formErrors.currency}
                onChange={handleChange}
                placeholder="select amount currency"
                dataTestId={`${dataTestId}-currency`}
            />
            <br />
            <Button
                title="Transfer"
                handleClick={handleClick}
                showLoader={isLoading}
                disabled={isLoading}
                dataTestId={`${dataTestId}-transfer`}
            />
        </div>
        <br />
    </div>
  );

  return (
        <div className="transfer-account-container">
            <div className="form-container">
                    {renderCreateForm()}
                </div>
        </div>
  );
};

CreateTransfer.propTypes = {
  createTransfer: PropTypes.func.isRequired,
  closeModal: PropTypes.func.isRequired,
  isLoading: PropTypes.bool.isRequired,
  accountTransferSuccess: PropTypes.bool.isRequired,
  errorMessage: PropTypes.string.isRequired,
  dataTestId: PropTypes.string,
};

CreateTransfer.defaultProps = {
  dataTestId: 'createtransfer',
};

const mapStateToProps = ({ account }) => ({
  isLoading: account.isTransferAccountLoading,
  accountTransferSuccess: account.accountTransferSuccess,
  errorMessage: account.errorMessage,
});

const mapDispatchToProps = {
  createTransfer: accountActions.createTransfer,
};

export {
  CreateTransfer,
};

export default connect(mapStateToProps, mapDispatchToProps)(CreateTransfer);
