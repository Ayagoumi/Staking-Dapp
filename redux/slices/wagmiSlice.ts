import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";

export interface IWagmiState {
  isConnected: boolean;
  address: `0x${string}` | null;
  supportedNetwork: boolean;
}

const initialState: IWagmiState = {
  isConnected: false,
  address: null,
  supportedNetwork: false,
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
    setSupportedNetwork: (state, action) => {
      state.supportedNetwork = action.payload;
    },
  },
});

export const { setConnectionStatus, setAddress, setSupportedNetwork } =
  WagmiSlice.actions;

export const getConnectionStatus = (state: RootState) =>
  state.wagmi.isConnected;

export const getAddress = (state: RootState) => state.wagmi.address;

export const getSupportedNetwork = (state: RootState) =>
  state.wagmi.supportedNetwork;

export default WagmiSlice.reducer;
