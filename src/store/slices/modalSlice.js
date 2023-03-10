import { createSlice } from "@reduxjs/toolkit";

const modalSlice = createSlice({
    name: "modal",
    initialState: false,
    reducers: {
      toggleModal(state, action) {
          return action.payload;
      }
    }
});

export const { toggleModal } = modalSlice.actions;
export const modalReducer = modalSlice.reducer;