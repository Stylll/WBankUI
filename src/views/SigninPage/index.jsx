import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';
import Header from '../../components/Header/Header.component';
import TextInput from '../../components/TextInput/TextInput.component';
import Button from '../../components/Button/Button.component';
import { validateSignin } from '../../helpers/validators/authValidator';
import * as userActions from '../../redux/actionCreators/userActions';
import './styles.scss';

const SigninPage = ({
  signinUser, isLoading: reduxIsLoading, userErrorMessage,
}) => {
  const [values, setValues] = useState({
    customerId: '',
    email: '',
  });

  const [formErrors, setFormErrors] = useState({
    customerId: '',
    email: '',
  });

  const [isLoading, setIsLoading] = useState(false);

  const history = useHistory();

  useEffect(() => {
    if (!reduxIsLoading) {
      setIsLoading(false);
    }
  }, [reduxIsLoading]);

  const handleChange = (event) => {
    event.preventDefault();
    setValues({
      ...values,
      [event.target.name]: event.target.value,
    });
  };

  const handleClick = (event) => {
    event.preventDefault();
    const { isValid, errors } = validateSignin(values);
    setFormErrors({
      ...errors,
    });
    if (!isValid) {
      return;
    }

    setIsLoading(true);

    signinUser({
      customerId: values.customerId,
      email: values.email,
    });
  };

  const navigateToSignup = () => {
    history.push('/signup');
  };

  const renderSigninForm = (errorMessage) => (
        <div className="signin-container">
            <div>
                <p>Sign in to account</p>
                <span className="error-text">{errorMessage}</span>
                <TextInput
                    name="customerId"
                    placeholder="3214"
                    title="Enter your customer id"
                    type="text"
                    value={values.customerId}
                    error={formErrors.customerId}
                    onChange={handleChange} />
                <TextInput
                    name="email"
                    placeholder="jimhalpert@dundermuflin.com"
                    title="Enter your email"
                    type="text"
                    value={values.email}
                    error={formErrors.email}
                    onChange={handleChange} />
                <Button
                    title="Signin"
                    handleClick={handleClick}
                    showLoader={isLoading}
                    disabled={isLoading}
                />
            </div>
            <br />
            <h4 className="link" onClick={() => { navigateToSignup(); }}>
              Don't have an account?. click here to signup
            </h4>
        </div>
  );

  return (
        <div className="">
            <Header />
            <div className="signinpage container">
                <div className="form-container">
                    <h2 className="intro-text">Welcome To WBank</h2>
                    {renderSigninForm(userErrorMessage)}
                </div>
            </div>
        </div>
  );
};

SigninPage.propTypes = {
  signinUser: PropTypes.func.isRequired,
  isLoading: PropTypes.bool.isRequired,
  userErrorMessage: PropTypes.string.isRequired,
};

const mapStateToProps = ({ user }) => ({
  isLoading: user.isLoading,
  userErrorMessage: user.errorMessage,
});

const mapDispatchToProps = {
  signinUser: userActions.signinUser,
};

export default connect(mapStateToProps, mapDispatchToProps)(SigninPage);
