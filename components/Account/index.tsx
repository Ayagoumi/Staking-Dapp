import React, { useEffect } from "react";
import { useNetwork } from "wagmi";
import { Box } from "@mui/material";
import { UnsupportedNetworkButton } from "./UnsuportedNetworkButton";
import { useAppDispatch } from "@/redux/store";
import { setSupportedNetwork } from "@/redux/slices/wagmiSlice";
import Actions from "./Actions";

export default function Account() {
  const { chain } = useNetwork();
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (chain) dispatch(setSupportedNetwork(chain.unsupported));
  }, [chain]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <>
      <Box sx={{ display: "flex", justifyContent: "center", flex: 1 }}>
        {chain?.unsupported && <UnsupportedNetworkButton />}
        {!chain?.unsupported && chain?.name && (
          <Actions chainName={chain?.name} />
        )}
      </Box>
    </>
  );
}
