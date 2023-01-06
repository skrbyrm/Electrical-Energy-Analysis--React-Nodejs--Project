import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import config from "config";

const baseUrl = process.env.REACT_APP_BACKEND_SERVER;

const initialState = {
  mode: "dark",

  user: null,
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: ""
};

export const LoginUser = createAsyncThunk("user/LoginUser", async(user, thunkAPI) => {
  try {
      const response = await axios.post(config.urls.REACT_SERVER_LOGIN, {
          email: user.email,
          password: user.password
      });
      return response.data;
  } catch (error) {
      if(error.response){
          const message = error.response.data.msg;
          return thunkAPI.rejectWithValue(message);
      }
  }
});

export const getMe = createAsyncThunk("user/getMe", async(_, thunkAPI) => {
  try {
      const response = await axios.get(config.urls.REACT_SERVER_ME);
      return response.data;
  } catch (error) {
      if(error.response){
          const message = error.response.data.msg;
          return thunkAPI.rejectWithValue(message);
      }
  }
});

export const LogOut = createAsyncThunk("user/LogOut", async() => {
  await axios.delete(config.urls.REACT_SERVER_LOGOUT);
});

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setMode: (state) => {
      state.mode = state.mode === "dark" ? "light" : "dark";
    },
    reset: (state) => initialState
  },
  extraReducers:(builder) =>{
    builder.addCase(LoginUser.pending, (state) =>{
        state.isLoading = true;
    });
    builder.addCase(LoginUser.fulfilled, (state, action) =>{
        state.isLoading = false;
        state.isSuccess = true;
        state.user = action.payload;
    });
    builder.addCase(LoginUser.rejected, (state, action) =>{
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
    })

    // Get User Login
    builder.addCase(getMe.pending, (state) =>{
        state.isLoading = true;
    });
    builder.addCase(getMe.fulfilled, (state, action) =>{
        state.isLoading = false;
        state.isSuccess = true;
        state.user = action.payload;
    });
    builder.addCase(getMe.rejected, (state, action) =>{
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
    })
}
});

export const { setMode, reset } = authSlice.actions;

export default authSlice.reducer;
