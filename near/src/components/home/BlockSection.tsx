import React, { useEffect, useState } from "react";
import { BlockHeader, BlockResult } from "near-api-js/lib/providers/provider";
import { useSelector, useDispatch } from "react-redux";
import { getBlockRequest } from "src/store/action";
import { RootState } from "src/store/reducers";

const BlockSection = () => {
  const dispatch = useDispatch();
  const blockState = useSelector((state: RootState) => state.block);
  const [loading, setLoading] = useState(false);
  const [blockData, setBlockData] = useState<BlockResult>({
    author: "",
    chunks: [],
    header: {} as BlockHeader,
  });

  useEffect(() => {
    dispatch(getBlockRequest());
  }, []);

  useEffect(() => {
    const { getBlockLoading, getBlockData } = blockState;

    setLoading(getBlockLoading);
    if (getBlockData) {
      setBlockData(getBlockData);
    }
  }, [blockState]);

  return <>{loading ? <>로딩 중</> : <>{blockData.author}</>} </>;
};

export default BlockSection;
