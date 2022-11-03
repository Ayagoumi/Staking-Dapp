import { stakingAddress } from "@/constants/addresses";
import { useContractWrite } from "wagmi";
import {
  setIsApproved,
  setIsStaked,
  getIsStaked,
  setStakedMessage,
} from "@/redux/slices/wagmiSlice";
import { useAppDispatch, useAppSelector } from "@/redux/store";
import guerliABI from "@/utils/guerliABI.json";

export function useStake(amount: number, refetch: () => void) {
  const dispatch = useAppDispatch();
  const isStaked = useAppSelector(getIsStaked);
  const amountString = Number(amount * 10 ** 18).toLocaleString("fullwide", {
    useGrouping: false,
  });

  const {
    data: stakeBalance,
    isLoading,
    isSuccess,
    write: writeStake,
  } = useContractWrite({
    mode: "recklesslyUnprepared",
    address: stakingAddress,
    abi: guerliABI,
    functionName: "stake",
    args: [amountString],
    onMutate: () => {
      dispatch(setIsStaked("pending"));
      dispatch(setStakedMessage(""));
    },
    onSuccess: async (response) => {
      dispatch(setIsStaked("pending"));
      try {
        await response.wait(1);
        dispatch(setIsStaked("approved"));
        dispatch(setIsApproved("idle"));
        refetch();
      } catch (error) {
        dispatch(setIsApproved("idle"));
        dispatch(setIsStaked("denied"));
        console.log(error);
      }
    },
    onError: (err) => {
      dispatch(setIsStaked("denied"));
      dispatch(setStakedMessage(err.message));
    },
  });
  return { stakeBalance, isLoading, isSuccess, isStaked, writeStake };
}
