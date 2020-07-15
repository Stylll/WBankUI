import { all } from 'redux-saga/effects';

import * as userSaga from './userSaga';

function* rootSaga() {
  yield all([
    userSaga.watchSignupUserSagaAsync(),
    userSaga.watchSigninUserSagaAsync(),
  ]);
}

export default rootSaga;
