import { all } from 'redux-saga/effects';

import * as userSaga from './userSaga';

function* rootSaga() {
  yield all([
    userSaga.watchAuthenticateUserSagaAsync(),
  ]);
}

export default rootSaga;
