import React from 'react';
import { Route, Switch } from 'react-router-dom';
import HomePage from '../views/HomePage';

const Routes = () => (
  <Switch>
    <Route
      path="/"
      exact
      component={HomePage}
    />
   </Switch>
);

export default Routes;
