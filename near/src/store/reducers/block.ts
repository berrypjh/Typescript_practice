import { BlockHeader, BlockResult } from "near-api-js/lib/providers/provider";
import { GetBlock } from "src/store/action";
import { GET_BLOCK_FAILURE, GET_BLOCK_REQUEST, GET_BLOCK_SUCCESS } from "src/store/actionType";

type ReducerState = {
  getBlockLoading: boolean;
  getBlockError: Error | string | null;
  getBlockDone: boolean;
  getBlockData: BlockResult | null;
};

const initialState: ReducerState = {
  getBlockLoading: false,
  getBlockError: null,
  getBlockDone: false,
  getBlockData: {
    author: "",
    chunks: [],
    header: {} as BlockHeader,
  },
};

type ReducerActions = GetBlock;
const blockReducer = (state: ReducerState = initialState, action: ReducerActions): ReducerState => {
  switch (action.type) {
    case GET_BLOCK_REQUEST:
      return {
        ...state,
        getBlockLoading: true,
        getBlockError: null,
        getBlockDone: false,
      };
    case GET_BLOCK_SUCCESS:
      return {
        ...state,
        getBlockLoading: false,
        getBlockError: null,
        getBlockDone: true,
        getBlockData: action.data,
      };
    case GET_BLOCK_FAILURE:
      return {
        ...state,
        getBlockLoading: false,
        getBlockError: action.error,
        getBlockDone: true,
        getBlockData: null,
      };
    default:
      return state;
  }
};

export default blockReducer;
