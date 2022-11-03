import { ybcAddress } from "@/constants/addresses";
import { useContractWrite } from "wagmi";
import ybcABI from "@/utils/ybcABI.json";
import {
  getIsApproved,
  setApprovedMessage,
  setIsApproved,
} from "@/redux/slices/wagmiSlice";
import { useAppDispatch, useAppSelector } from "@/redux/store";

export function useApprove(amount: number, spender: `0x${string}`) {
  const dispatch = useAppDispatch();
  const isApproved = useAppSelector(getIsApproved);
  const amountString = Number(amount * 10 ** 18).toLocaleString("fullwide", {
    useGrouping: false,
  });

  const { data, write: writeApprove } = useContractWrite({
    mode: "recklesslyUnprepared",
    address: ybcAddress,
    abi: ybcABI,
    functionName: "approve",
    args: [spender, amountString],
    onMutate: () => {
      dispatch(setIsApproved("pending"));
      dispatch(setApprovedMessage(""));
    },
    onSuccess: async (res) => {
      dispatch(setIsApproved("pending"));
      try {
        await res.wait(1);
        dispatch(setIsApproved("approved"));
      } catch (err) {
        dispatch(setIsApproved("denied"));
      }
    },
    onError: (err) => {
      dispatch(setIsApproved("denied"));
      dispatch(setApprovedMessage(err.message));
    },
  });

  return { data, isApproved, writeApprove };
}
