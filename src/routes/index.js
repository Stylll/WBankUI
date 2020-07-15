import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import HomePage from '../views/HomePage';
import SignupPage from '../views/SignupPage';
import SigninPage from '../views/SigninPage';
import { getUserDetails } from '../helpers/utils';
import AuthenticateView from '../components/Hoc/AuthenticateView';

const Routes = () => (
  <Switch>
    <Route
      path="/dashboard"
      component={AuthenticateView(HomePage)}
    />
    <Route
      path="/"
      exact
      render={() => {
        const { isAuthenticated } = getUserDetails();
        if (!isAuthenticated) return <SigninPage />;
        return <Redirect to="/dashboard" />;
      }}
    />
    <Route
      path={['/signup']}
      render={() => {
        const { isAuthenticated } = getUserDetails();
        if (!isAuthenticated) return <SignupPage />;
        return <Redirect to="/dashboard" />;
      }}
    />
    <Route
      path={['/signin']}
      render={() => {
        const { isAuthenticated } = getUserDetails();
        if (!isAuthenticated) return <SigninPage />;
        return <Redirect to="/dashboard" />;
      }}
    />
   </Switch>
);

export default Routes;
