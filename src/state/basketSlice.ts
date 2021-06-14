import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Product } from "../types";

const initialState: { contents: Product[] } = {
  contents: [],
};
export const basketSlice = createSlice({
  name: "basket",
  initialState,
  reducers: {
    addToBasket: (state, action: PayloadAction<Product>) => {
      const index = state.contents.findIndex(
        (element) => element.id === action.payload.id
      );

      if (index !== -1) {
        state.contents[index].quantity++;
      } else {
        state.contents.push({ ...action.payload, quantity: 1 });
      }
    },
    removeFromBasket: (state, action: PayloadAction<Product>) => {
      const index = state.contents.findIndex(
        (element) => element.id === action.payload.id
      );

      if (index !== -1) {
        state.contents[index].quantity--;
      }
    },
    removeAllFromBasket: (state, action: PayloadAction<Product>) => {
      const index = state.contents.findIndex(
        (element) => element.id === action.payload.id
      );
      if (index !== -1) {
        state.contents.splice(index, 1);
      }
    },
  },
});

export const { addToBasket, removeFromBasket, removeAllFromBasket } =
  basketSlice.actions;

export default basketSlice.reducer;
