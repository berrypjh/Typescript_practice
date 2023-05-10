import { GetBlockAction } from "src/store/action/block";

type ReducerState = {
  block: "";
};

const initialState: ReducerState = {
  block: "",
};

type ReducerActions = GetBlockAction;
const blockReducer = (state: ReducerState = initialState, action: ReducerActions): ReducerState => {
  switch (action.type) {
    default:
      return state;
  }
};

export default blockReducer;
