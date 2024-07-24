import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  token_type: null,
  access_token: null,
  loading: false,
  error: null,
};

export const login = createAsyncThunk(
  "auth/login",
  async ({ username, password }) => {
    const response = await axios.post(
      "https://soal.staging.id/oauth/token",
      new URLSearchParams({
        grant_type: "password",
        client_secret: "0a40f69db4e5fd2f4ac65a090f31b823",
        client_id: "e78869f77986684a",
        username,
        password,
      })
    );
    return response.data;
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.loading = true;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.loading = false;
        state.token_type = action.payload.token_type;
        state.access_token = action.payload.access_token;
        state.error = null;
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default authSlice.reducer;
