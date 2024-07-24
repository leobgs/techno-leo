import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  greeting: "",
  name: "",
  saldo: 0,
  point: 0,
  qrcode: "",
  banner: [],
  error: null,
};

export const fetchHomeData = createAsyncThunk(
  "home/fetchHomeData",
  async ({ tokenType, accessToken }) => {
    const response = await axios.get("https://soal.staging.id/api/home", {
      headers: {
        Authorization: `${tokenType} ${accessToken}`,
      },
    });
    return response.data.result;
  }
);

const homeSlice = createSlice({
  name: "home",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchHomeData.fulfilled, (state, action) => {
        state.greeting = action.payload.greeting;
        state.name = action.payload.name;
        state.saldo = action.payload.saldo;
        state.point = action.payload.point;
        state.qrcode = action.payload.qrcode;
        state.banner = action.payload.banner;
        state.error = null;
      })
      .addCase(fetchHomeData.rejected, (state, action) => {
        state.error = action.error.message;
      });
  },
});

export default homeSlice.reducer;
