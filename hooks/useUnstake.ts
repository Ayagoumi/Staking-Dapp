import { stakingAddress } from "@/constants/addresses";
import { useContractWrite } from "wagmi";
import {
  setIsApproved,
  setIsUnstaked,
  setUnstakedMessage,
  getIsUnstaked,
} from "@/redux/slices/wagmiSlice";
import { useAppDispatch, useAppSelector } from "@/redux/store";
import guerliABI from "@/utils/guerliABI.json";

export function useUnstake(amount: number, refetch: () => void) {
  const dispatch = useAppDispatch();
  const isUnstaked = useAppSelector(getIsUnstaked);
  const amountString = Number(amount * 10 ** 18).toLocaleString("fullwide", {
    useGrouping: false,
  });

  const {
    data: unstakedBalance,
    isLoading,
    isSuccess,
    write: writeUnstake,
  } = useContractWrite({
    mode: "recklesslyUnprepared",
    address: stakingAddress,
    abi: guerliABI,
    functionName: "unstake",
    args: [amountString],
    onMutate: () => {
      dispatch(setIsUnstaked("pending"));
      dispatch(setUnstakedMessage(""));
    },
    onSuccess: async (response) => {
      try {
        await response.wait(1);
        dispatch(setIsUnstaked("approved"));
        dispatch(setIsApproved("idle"));
        refetch();
      } catch (error) {
        dispatch(setIsApproved("idle"));
        dispatch(setIsUnstaked("denied"));
        console.log(error);
      }
    },
    onError: (err) => {
      dispatch(setIsUnstaked("denied"));
      dispatch(setUnstakedMessage(err.message));
    },
  });

  return { unstakedBalance, isLoading, isSuccess, isUnstaked, writeUnstake };
}
