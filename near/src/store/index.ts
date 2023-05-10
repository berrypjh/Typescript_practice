import { configureStore } from "@reduxjs/toolkit";
import createSagaMiddleware from "redux-saga";

import reducer from "src/store/reducers";
import mySaga from "src/store/sagas";

const sagaMiddleware = createSagaMiddleware();

const store = configureStore({
  reducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(sagaMiddleware),
});

sagaMiddleware.run(mySaga);

export default store;
