import { all, fork } from "redux-saga/effects";
import blockSaga from "src/store/sagas/block";

export default function* rootSaga() {
  yield all([fork(blockSaga)]);
}
