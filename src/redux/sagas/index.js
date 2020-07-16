import { all } from 'redux-saga/effects';

import * as userSaga from './userSaga';
import * as accountSaga from './accountSaga';

function* rootSaga() {
  yield all([
    userSaga.watchSignupUserSagaAsync(),
    userSaga.watchSigninUserSagaAsync(),
    accountSaga.watchGetAccountsSagaAsync(),
    accountSaga.watchCreateAccountSagaAsync(),
    accountSaga.watchDepositAccountSagaAsync(),
    accountSaga.watchWithdrawAccountSagaAsync(),
    accountSaga.watchTransferAccountSagaAsync(),
  ]);
}

export default rootSaga;
