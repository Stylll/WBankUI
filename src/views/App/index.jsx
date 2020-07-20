import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import ReduxToastr from 'react-redux-toastr';
import store from '../../redux/store';

import Routes from '../../routes';
import { Footer } from '../../components/Footer/Footer.component';

import 'react-redux-toastr/lib/css/react-redux-toastr.min.css';
import './styles.scss';

const App = () => (
  <div>
    <div className="App">
      <Provider store={store}>
        <Router>
        <ReduxToastr
          timeOut={4000}
          newestOnTop
          preventDuplicates
          position="top-right"
          getState={(state) => state.toastr}
          transitionIn="fadeIn"
          transitionOut="fadeOut"
          progressBar
          closeOnToastrClick/>
          <Routes />
        </Router>
      </Provider>
    </div>
    <Footer />
  </div>
);

export default App;
