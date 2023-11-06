import { configureStore } from "@reduxjs/toolkit";

import housesSlice from "./features/houses/houses.slice";
import getAvgData from "./features/avg_cost/avg_cost.slice";
import getAvgDataOfAll from "./features/avg_cost_by_rooms/avg_cost_by_rooms";

export const store = configureStore({
  reducer: {
    api: housesSlice.reducer,
    get_avg_data: getAvgData.reducer,
    get_avg_data_of_all: getAvgDataOfAll.reducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false
    })
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
