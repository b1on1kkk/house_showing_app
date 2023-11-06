import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

interface InitialState {
  data: { number_of_rooms: number; avg_price: number }[];
}

const initialState: InitialState = {
  data: []
};

export const getAvgPriceOfAllRooms = createAsyncThunk(
  "getAvgDataOfAll/getAvgPriceOfAllRooms",
  async () => {
    const res = await axios.get("http://localhost:2005/avg_price_by_rooms");

    return res;
  }
);

const getAvgDataOfAll = createSlice({
  name: "getAvgDataOfAll",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getAvgPriceOfAllRooms.fulfilled, (state, action) => {
      state.data = action.payload.data;
    });
  }
});

export default getAvgDataOfAll;
