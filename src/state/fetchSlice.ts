import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { Product } from "../types";

const axios = require("axios");

export const fetchProducts = createAsyncThunk("fetch/fetchProducts", () =>
  axios
    .get("https://api.punkapi.com/v2/beers")
    .then((response: any) => response.data)
    .catch((error: any) => error)
);

const initialState: { products: Product[] } = {
  products: [],
};

const fetchSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    abvAscending: (state) => {
      state.products.sort((a, b) => a.abv - b.abv);
    },
    abvDescending: (state) => {
      state.products.sort((a, b) => b.abv - a.abv);
    },
    nameAscending: (state) => {
      state.products.sort((a, b) =>
        a.name < b.name ? -1 : a.name > b.name ? 1 : 0
      );
    },
    nameDescending: (state) => {
      state.products.sort((a, b) =>
        a.name > b.name ? -1 : a.name < b.name ? 1 : 0
      );
    },
    resetSort: (state) => {
      state.products.sort((a, b) => a.id - b.id);
    },
  },
  extraReducers: {
    [fetchProducts.fulfilled as any]: (state, action) => {
      state.products = action.payload;
    },
  },
});
export const {
  abvAscending,
  abvDescending,
  nameAscending,
  nameDescending,
  resetSort,
} = fetchSlice.actions;

export default fetchSlice.reducer;
