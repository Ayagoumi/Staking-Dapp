import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";

export interface IWagmiState {
  isConnected: boolean;
  address: `0x${string}` | undefined;
  isUnsupportedNetwork: boolean;
  balance: number | undefined;
  isApproved: "idle" | "pending" | "approved" | "denied";
  isStaked: "idle" | "pending" | "approved" | "denied";
  isUnstaked: "idle" | "pending" | "approved" | "denied";
  approvedMessage: string | undefined;
  stakedMessage: string | undefined;
  unstakedMessage: string | undefined;
  stakedBalance: number | undefined;
}

const initialState: IWagmiState = {
  isConnected: false,
  address: undefined,
  isUnsupportedNetwork: false,
  balance: 0,
  isApproved: "idle",
  isStaked: "idle",
  isUnstaked: "idle",
  approvedMessage: "",
  stakedMessage: "",
  unstakedMessage: "",
  stakedBalance: 0,
};

export const WagmiSlice = createSlice({
  name: "wagmi",
  initialState,
  reducers: {
    setConnectionStatus: (state, action) => {
      state.isConnected = action.payload;
    },
    setAddress: (state, action) => {
      state.address = action.payload;
    },
    setIsUnsupportedNetwork: (state, action) => {
      state.isUnsupportedNetwork = action.payload;
    },
    setBalance: (state, action) => {
      state.balance = Number(action.payload);
      // state.refetchBalance = action.meta.arg;
    },
    setIsApproved: (state, action) => {
      state.isApproved = action.payload;
    },
    setIsStaked: (state, action) => {
      state.isStaked = action.payload;
    },
    setIsUnstaked: (state, action) => {
      state.isUnstaked = action.payload;
    },
    setApprovedMessage: (state, action) => {
      state.approvedMessage = action.payload;
    },
    setStakedMessage: (state, action) => {
      state.stakedMessage = action.payload;
    },
    setUnstakedMessage: (state, action) => {
      state.unstakedMessage = action.payload;
    },
    setStakedBalance: (state, action) => {
      state.stakedBalance = Number(action.payload);
    },
    setMsgsReset: (state) => {
      state.approvedMessage = "";
      state.stakedMessage = "";
      state.unstakedMessage = "";
    },
    resetStore: (state) => {
      state.isConnected = false;
      state.address = undefined;
      state.isUnsupportedNetwork = false;
      state.balance = 0;
      state.isApproved = "idle";
      state.isStaked = "idle";
      state.isUnstaked = "idle";
      state.approvedMessage = "";
      state.stakedMessage = "";
      state.unstakedMessage = "";
      state.stakedBalance = 0;
    },
  },
});

export const {
  setConnectionStatus,
  setAddress,
  setIsUnsupportedNetwork,
  setBalance,
  setIsApproved,
  setIsStaked,
  setIsUnstaked,
  setApprovedMessage,
  setStakedMessage,
  setUnstakedMessage,
  setStakedBalance,
  setMsgsReset,
  resetStore,
} = WagmiSlice.actions;

export const getConnectionStatus = (state: RootState) =>
  state.wagmi.isConnected;

export const getAddress = (state: RootState) => state.wagmi.address;

export const getIsUnupportedNetwork = (state: RootState) =>
  state.wagmi.isUnsupportedNetwork;

export const getBalance = (state: RootState) => state.wagmi.balance;

export const getIsApproved = (state: RootState) => state.wagmi.isApproved;

export const getIsStaked = (state: RootState) => state.wagmi.isStaked;

export const getIsUnstaked = (state: RootState) => state.wagmi.isUnstaked;

export const getApprovedMessage = (state: RootState) =>
  state.wagmi.approvedMessage;

export const getStakedMessage = (state: RootState) => state.wagmi.stakedMessage;

export const getUnstakedMessage = (state: RootState) =>
  state.wagmi.unstakedMessage;

export const getStakedBalance = (state: RootState) => state.wagmi.stakedBalance;

export default WagmiSlice.reducer;
