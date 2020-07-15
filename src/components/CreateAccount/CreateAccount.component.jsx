import React, { useState, useEffect, useRef } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import * as accountActions from '../../redux/actionCreators/accountActions';
import TextInput from '../TextInput/TextInput.component';
import Button from '../Button/Button.component';
import { validateCreateAccount } from '../../helpers/validators/accountValidator';
import './CreateAccount.styles.scss';

const CreateAccount = ({
  createAccount, isLoading: reduxIsLoading, closeModal,
  errorMessage, accountCreateSuccess,
}) => {
  const [values, setValues] = useState({
    name: '',
    openingBalance: '',
  });

  const [formErrors, setFormErrors] = useState({
    name: '',
    openingBalance: '',
  });

  const [isLoading, setIsLoading] = useState(false);

  const formSubmitted = useRef(false);

  useEffect(() => {
    if (!reduxIsLoading && accountCreateSuccess && formSubmitted.current) {
      setIsLoading(false);
      closeModal();
      formSubmitted.current = false;
      return;
    }

    if (!reduxIsLoading && formSubmitted.current) {
      setIsLoading(false);
      formSubmitted.current = false;
    }
  }, [reduxIsLoading, accountCreateSuccess, closeModal]);

  const handleChange = (event) => {
    event.preventDefault();
    setValues({
      ...values,
      [event.target.name]: event.target.value,
    });
  };

  const handleClick = (event) => {
    event.preventDefault();
    const { isValid, errors } = validateCreateAccount(values);
    setFormErrors({
      ...errors,
    });
    if (!isValid) {
      return;
    }

    setIsLoading(true);

    createAccount({
      name: values.name,
      openingBalance: values.openingBalance,
    });

    formSubmitted.current = true;
  };

  const renderCreateForm = () => (
    <div className="create-container">
        <div>
            <p>Create your bank account</p>
            <span className="error-text">{errorMessage}</span>
            <TextInput
                name="name"
                placeholder="My Savings Account"
                title="Enter your preferred account name"
                type="text"
                value={values.name}
                error={formErrors.name}
                onChange={handleChange} />
            <TextInput
                name="openingBalance"
                placeholder="5000"
                title="Enter your Opening balance"
                type="text"
                value={values.openingBalance}
                error={formErrors.openingBalance}
                onChange={handleChange} />
            <Button
                title="Create"
                handleClick={handleClick}
                showLoader={isLoading}
                disabled={isLoading}
            />
        </div>
        <br />
        <h4 className="link">
          Please note, opening balance is saved in CAD.
        </h4>
    </div>
  );

  return (
        <div className="create-account-container">
            <div className="form-container">
                    {renderCreateForm()}
                </div>
        </div>
  );
};

CreateAccount.propTypes = {
  createAccount: PropTypes.func.isRequired,
  closeModal: PropTypes.func.isRequired,
  isLoading: PropTypes.bool.isRequired,
  accountCreateSuccess: PropTypes.bool.isRequired,
  errorMessage: PropTypes.string.isRequired,
};

const mapStateToProps = ({ account }) => ({
  isLoading: account.isCreateAccountLoading,
  accountCreateSuccess: account.accountCreateSuccess,
  errorMessage: account.errorMessage,
});

const mapDispatchToProps = {
  createAccount: accountActions.createAccount,
};

export default connect(mapStateToProps, mapDispatchToProps)(CreateAccount);
