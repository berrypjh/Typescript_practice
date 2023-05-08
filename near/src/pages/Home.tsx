import React from "react";
import { connect } from "near-api-js";
import { BlockId, BlockReference } from "near-api-js/lib/providers/provider";

const Home = () => {
  const keyStore = new keyStores.BrowserLocalStorageKeyStore();

  const getBlockInfo = async (blockId?: BlockId) => {
    const near = connect(keyStore, "testnet", "https://archival-rpc.testnet.near.org");
    const blockQuery: BlockReference = blockId ? { blockId } : { finality: "final" };

    const blockInfoByHeight = await near.connection.provider.block(blockQuery);
  };

  getBlockInfo("");

  return <div>Home</div>;
};

export default Home;
