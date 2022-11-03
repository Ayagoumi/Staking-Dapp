import { stakingAddress } from "@/constants/addresses";
import { useContractRead } from "wagmi";
import guerliABI from "@/utils/guerliABI.json";
import { ethers, BigNumberish } from "ethers";

export function useTotalStaked(address: `0x${string}`) {
  const {
    data,
    isLoading,
    isSuccess,
    refetch: refetchStaked,
  } = useContractRead({
    address: stakingAddress,
    abi: guerliABI,
    functionName: "stakedAmount",
    args: [address],
  });

  const stakedBalance = data
    ? ethers.utils.formatEther(data as BigNumberish)
    : 0;

  return { stakedBalance, isLoading, isSuccess, refetchStaked };
}
