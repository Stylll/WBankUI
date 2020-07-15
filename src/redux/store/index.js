import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import createSagaMiddleware from 'redux-saga';

import rootReducer from '../reducers';
import rootSaga from '../sagas';
import { jwtKey } from '../../helpers/defaults';
import { setAuthorizationToken } from '../../helpers/utils';

const sagaMiddleware = createSagaMiddleware();
// const reduxRouterMiddleware = routerMiddleware(history);
const middleware = composeWithDevTools(applyMiddleware(sagaMiddleware));
const store = createStore(rootReducer, middleware);

// eslint-disable-next-line no-undef
const token = localStorage.getItem(jwtKey);

setAuthorizationToken(token);

sagaMiddleware.run(rootSaga);

export default store;
