import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';
import Header from '../../components/Header/Header.component';
import TextInput from '../../components/TextInput/TextInput.component';
import Button from '../../components/Button/Button.component';
import { validateSignup } from '../../helpers/validators/authValidator';
import * as userActions from '../../redux/actionCreators/userActions';
import './styles.scss';

const SignupPage = ({
  signupUser, isLoading: reduxIsLoading, userErrorMessage,
}) => {
  const [values, setValues] = useState({
    fullname: '',
    email: '',
  });

  const [formErrors, setFormErrors] = useState({
    fullname: '',
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
    const { isValid, errors } = validateSignup(values);
    setFormErrors({
      ...errors,
    });
    if (!isValid) {
      return;
    }

    setIsLoading(true);

    signupUser({
      name: values.fullname,
      email: values.email,
    });
  };

  const navigateToSignin = () => {
    history.push('/signin');
  };

  const renderSignupForm = (errorMessage) => (
        <div className="signup-container">
            <div>
                <p>Create an account</p>
                <span className="error-text">{errorMessage}</span>
                <TextInput
                    name="fullname"
                    placeholder="Jim Halpert"
                    title="Enter your fullname"
                    value={values.fullname}
                    error={formErrors.fullname}
                    onChange={handleChange} />
                <TextInput
                    name="email"
                    placeholder="jimhalpert@dundermuflin.com"
                    title="Enter your email"
                    value={values.email}
                    error={formErrors.email}
                    onChange={handleChange} />
                <Button
                    title="Signup"
                    handleClick={handleClick}
                    showLoader={isLoading}
                    disabled={isLoading}
                />
            </div>
            <br />
            <h4 className="link" onClick={() => { navigateToSignin(); }}>
              Already have an account?. click here to login
            </h4>
        </div>
  );

  return (
        <div className="">
            <Header />
            <div className="authpage container">
                <div>
                    <h2 className="intro-text">Welcome To WBank</h2>
                    {renderSignupForm(userErrorMessage)}
                </div>
            </div>
        </div>
  );
};

SignupPage.propTypes = {
  signupUser: PropTypes.func.isRequired,
  isLoading: PropTypes.bool.isRequired,
  userErrorMessage: PropTypes.string.isRequired,
};

const mapStateToProps = ({ user }) => ({
  isLoading: user.isLoading,
  userErrorMessage: user.errorMessage,
});

const mapDispatchToProps = {
  signupUser: userActions.signupUser,
};

export default connect(mapStateToProps, mapDispatchToProps)(SignupPage);
