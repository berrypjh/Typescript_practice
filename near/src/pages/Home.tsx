import React, { useCallback, useEffect, useMemo } from "react";
import { Near, connect, keyStores } from "near-api-js";
import {
  BlockId,
  BlockReference,
  BlockResult,
} from "near-api-js/lib/providers/provider";

const Home = () => {
  const keyStore = new keyStores.BrowserLocalStorageKeyStore();

  const nearConfig = useCallback(() => {
    return {
      keyStore,
      networkId: "testnet",
      nodeUrl: "https://archival-rpc.testnet.near.org",
    };
  }, []);

  const getBlockInfo = useCallback(async (blockId?: BlockId) => {
    const near = await connect(nearConfig());
    const blockQuery: BlockReference = blockId
      ? { blockId }
      : { finality: "final" };

    const blockInfo = await near.connection.provider.block(blockQuery);
    console.log(blockInfo);
    return blockInfo;
  }, []);

  useEffect(() => {
    getBlockInfo("");
  }, []);

  return <div>Home</div>;
};

export default Home;
