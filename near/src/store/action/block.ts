import { BlockResult } from "near-api-js/lib/providers/provider";
import { GET_BLOCK_FAILURE, GET_BLOCK_REQUEST, GET_BLOCK_SUCCESS } from "src/store/actionType";

export type GetBlock = {
  type: typeof GET_BLOCK_REQUEST | typeof GET_BLOCK_SUCCESS | typeof GET_BLOCK_FAILURE;
  data: BlockResult | null;
  error: Error | string | null;
};

export const getBlockRequest = (): GetBlock => ({
  type: GET_BLOCK_REQUEST,
  data: null,
  error: null,
});
