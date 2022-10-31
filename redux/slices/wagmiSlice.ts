import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";

export interface IWagmiState {
  isConnected: boolean;
  address: `0x${string}` | null;
}

const initialState: IWagmiState = {
  isConnected: false,
  address: null,
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
  },
});

export const { setConnectionStatus, setAddress } = WagmiSlice.actions;

export const getConnectionStatus = (state: RootState) =>
  state.wagmi.isConnected;

export const getAddress = (state: RootState) => state.wagmi.address;

export default WagmiSlice.reducer;
