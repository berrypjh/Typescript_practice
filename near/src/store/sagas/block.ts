import { call, put, takeLatest } from "redux-saga/effects";
import { Near, connect, keyStores } from "near-api-js";
import { GET_BLOCK_REQUEST, GET_BLOCK_SUCCESS } from "src/store/actionType";
import { BlockResult } from "near-api-js/lib/providers/provider";

// NEAR Connect
async function connetNear() {
  const keyStore = new keyStores.BrowserLocalStorageKeyStore();

  const near = await connect({
    keyStore,
    networkId: "testnet",
    nodeUrl: "https://archival-rpc.testnet.near.org",
  });

  return near;
}

// Block Info
async function getBlockInfo(near: Near) {
  const blockInfo = await near.connection.provider.block({
    finality: "final",
  });
  const response = await near.connection.provider.block({ blockId: 100000000 });
  console.log(response);

  return blockInfo;
}

function* getBlock() {
  try {
    const near: Near = yield call(connetNear);
    const blockInfo: BlockResult = yield call(getBlockInfo, near);

    yield put({
      type: GET_BLOCK_SUCCESS,
      data: blockInfo,
    });
  } catch (err) {
    yield put({
      type: GET_BLOCK_SUCCESS,
      data: err,
    });
  }
}

function* blockSaga() {
  yield takeLatest(GET_BLOCK_REQUEST, getBlock);
}

export default blockSaga;
