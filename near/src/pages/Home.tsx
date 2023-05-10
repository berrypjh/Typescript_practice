import React, { useCallback, useEffect, useMemo } from "react";
import { connect, keyStores } from "near-api-js";
import { BlockId, BlockReference, BlockResult } from "near-api-js/lib/providers/provider";

const Home = () => {
  const keyStore = new keyStores.BrowserLocalStorageKeyStore();

  const getBlockInfo = useCallback(async (blockId?: BlockId) => {
    const near = await connect({
      keyStore,
      networkId: "testnet",
      nodeUrl: "https://archival-rpc.testnet.near.org",
    });

    const blockInfo = await near.connection.provider.block({
      finality: "final",
    });
    console.log(blockInfo);
    const response = await near.connection.provider.block({ blockId: 100000000 });
    console.log(response);
    return blockInfo;
  }, []);

  useEffect(() => {
    getBlockInfo();
  }, []);

  return <div>Home</div>;
};

export default Home;
