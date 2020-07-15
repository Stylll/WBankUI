import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import createSagaMiddleware from 'redux-saga';
import axios from 'axios';

import rootReducer from '../reducers';
import rootSaga from '../sagas';
import { jwtKey } from '../../helpers/defaults';

const sagaMiddleware = createSagaMiddleware();
// const reduxRouterMiddleware = routerMiddleware(history);
const middleware = composeWithDevTools(applyMiddleware(sagaMiddleware));
const store = createStore(rootReducer, middleware);

// eslint-disable-next-line no-undef
const token = localStorage.getItem(jwtKey);

axios.defaults.headers.common.authorization = token;

sagaMiddleware.run(rootSaga);

export default store;
