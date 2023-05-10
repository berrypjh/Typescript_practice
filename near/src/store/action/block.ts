import { GET_BLOCK } from "src/store/actionType/block";

export type GetBlockAction = {
  type: typeof GET_BLOCK;
};

export const getBlock = (): GetBlockAction => ({
  type: GET_BLOCK,
});
