import React from 'react';
import { Router } from 'react-router-dom';
import { createBrowserHistory } from 'history';

import Routes from '../../routes';

const history = createBrowserHistory();

const App = () => (
    <div className="App">
      <Router history={history}>
        <Routes />
      </Router>
    </div>
);

export default App;
