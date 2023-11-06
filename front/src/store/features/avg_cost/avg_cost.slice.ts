import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

interface InitialState {
  data: { avg_price: number }[];
}

const initialState: InitialState = {
  data: []
};

export const getAvgPrice = createAsyncThunk(
  "getAvgData/getAvgPrice",
  async () => {
    const res = await axios.get("http://localhost:2005/avg_all");

    return res;
  }
);

const getAvgData = createSlice({
  name: "getAvgData",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getAvgPrice.fulfilled, (state, action) => {
      state.data = action.payload.data;
    });
  }
});

export default getAvgData;
