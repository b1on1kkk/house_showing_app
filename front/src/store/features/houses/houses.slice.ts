import axios from "axios";

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { Converter } from "../../../utils/Converter";

import {
  InitialExtentedHouse,
  ExtendedHouse,
  House
} from "../../interfaces/interface";

const initialState: InitialExtentedHouse = {
  houses: []
};

const config = {
  headers: {
    "Content-Type": "application/json"
  }
};

export const getHouses = createAsyncThunk(
  "houses/getHouses",
  async (queries: string) => {
    const res = await axios.get<House[]>(
      `http://localhost:2005/houses${queries}`
    );

    const newHouse: ExtendedHouse[] = [];

    res.data.map((e) => {
      newHouse.push({
        house: { ...e },
        extensions: {
          show_more: false,
          changer: false,
          array_of_idx_to_delete: [],
          price_in_BYN: Converter(e.price)
        }
      });
    });

    return newHouse;
  }
);

export const changeDataInDatabase = createAsyncThunk(
  "houses/changeDataInDatabase",
  async (houseData: House) => {
    const res = await axios.post(
      "http://localhost:2005/changed_data",
      houseData,
      config
    );

    return res;
  }
);

export const addNewFilesToServer = createAsyncThunk(
  "houses/changeDataInDatabase",
  async (file: FormData) => {
    const res = await axios.post("http://localhost:2005/files", file);

    return res;
  }
);

export const deleteHouseHanlder = createAsyncThunk(
  "houses/deleteHouseHanlder",
  async (id: string) => {
    const res = await axios.delete(`http://localhost:2005/houses/${id}`);

    return res;
  }
);

export const addNewHouseToDatabase = createAsyncThunk(
  "houses/addNewPostToDatabase",
  async (houseData: House) => {
    const res = axios.post(
      "http://localhost:2005/add_new_post",
      houseData,
      config
    );

    return res;
  }
);

const houseSlice = createSlice({
  name: "houses",
  initialState,
  reducers: {
    toggleToShowMoreAboutHouse: (state, action) => {
      const toggledHouse = state.houses.find(
        (house) => house.house.id === action.payload
      );

      toggledHouse!.extensions.show_more = !toggledHouse!.extensions.show_more;
    },

    toggleToChangeDataHouse: (state, action) => {
      const toggledHouse = state.houses.find(
        (house) => house.house.id === action.payload
      );

      toggledHouse!.extensions.changer = !toggledHouse!.extensions.changer;
    },

    textHandlerChanger: (state, action) => {
      const {
        new_data,
        key_name,
        id
      }: { new_data: string | number; key_name: keyof House; id: number } =
        action.payload;

      const HouseToChangeData: any = state.houses.find(
        (house) => house.house.id === id
      );

      HouseToChangeData.house[key_name] = new_data;
    },

    changeMoreInfCheckboxes: (state, action) => {
      const { key_name, id } = action.payload;

      const HouseToChangeState = state.houses.find(
        (house) => house.house.id === id
      );

      console.log(HouseToChangeState, "-------------");

      const house_extensions = JSON.parse(
        HouseToChangeState!.house.house_extensions
      );

      console.log(house_extensions);

      house_extensions[key_name] = !house_extensions[key_name];

      HouseToChangeState!.house.house_extensions =
        JSON.stringify(house_extensions);
    },

    pictureToDelete: (state, action) => {
      const { picture_id, id } = action.payload;

      const HouseToDeletePicture = state.houses.find(
        (house) => house.house.id === id
      );

      HouseToDeletePicture!.house.photos = HouseToDeletePicture!.house.photos
        .split(",")
        .filter((_, idx) => idx !== picture_id)
        .toString();
    },

    setUpNewPictures: (state, action) => {
      const { new_links, id } = action.payload;

      const HouseToChangePictures = state.houses.find(
        (house) => house.house.id === id
      );

      // state.houses[id].house.photos = new_links

      HouseToChangePictures!.house.photos = new_links;
    },

    NewHouseHandler: (state, action) => {
      const {
        data,
        status
      }: { data: ExtendedHouse | null; status: "push" | "pop" } =
        action.payload;

      if (status === "push") state.houses.push(data!);
      else state.houses.pop();
    }
  },
  extraReducers: (builder) => {
    builder.addCase(getHouses.fulfilled, (state, action) => {
      state.houses = action.payload;
    });
  }
});

export const {
  toggleToShowMoreAboutHouse,
  toggleToChangeDataHouse,
  textHandlerChanger,
  changeMoreInfCheckboxes,
  pictureToDelete,
  setUpNewPictures,
  NewHouseHandler
} = houseSlice.actions;

export default houseSlice;
