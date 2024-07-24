import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  categories: [],
  error: null,
};

export const fetchMenuData = createAsyncThunk(
  "menu/fetchMenuData",
  async ({ tokenType, accessToken }) => {
    const response = await axios.post(
      "https://soal.staging.id/api/menu",
      {
        show_all: 1, // Body yang dikirim dalam permintaan POST
      },
      {
        headers: {
          Authorization: `${tokenType} ${accessToken}`, // Header Authorization
        },
      }
    );
    return response.data.result;
  }
);

const menuSlice = createSlice({
  name: "menu",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchMenuData.fulfilled, (state, action) => {
        state.categories = action.payload.categories;
        state.error = null;
      })
      .addCase(fetchMenuData.rejected, (state, action) => {
        state.error = action.error.message;
      });
  },
});

export default menuSlice.reducer;
