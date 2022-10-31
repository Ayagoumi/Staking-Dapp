import React, { useEffect } from "react";
import Layout from "@/layout/index";
import Connect from "@/components/Connect";
import { useIsMounted } from "@/hooks/index";
import { useAccount } from "wagmi";
import { useAppDispatch } from "@/redux/store";
import { setConnectionStatus, setAddress } from "@/redux/slices/wagmiSlice";

export default function Home() {
  const isMounted = useIsMounted();
  const { address, isConnected } = useAccount();
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (isConnected) dispatch(setConnectionStatus(isConnected));
    if (address) dispatch(setAddress(address));
  }, [isConnected]); // eslint-disable-line react-hooks/exhaustive-deps

  if (!isMounted) return null;
  return <Layout>{!isConnected && <Connect />}</Layout>;
}
