import { combineReducers } from "redux";
import blockReducer from "src/store/reducers/block";

const rootReducer = combineReducers({
  block: blockReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
