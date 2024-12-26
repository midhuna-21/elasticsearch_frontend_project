import { createSlice } from "@reduxjs/toolkit";
import Cookies from "js-cookie";

const getInitialUserInfo = () => {
  if (typeof window !== "undefined") {
    const userInfoString = localStorage.getItem("userInfo");
    return userInfoString ? JSON.parse(userInfoString) : null;
  }
  return null;
};

const userSlice = createSlice({
  name: "user",
  initialState: {
    userInfo: getInitialUserInfo(),
    isAuthenticated: !!getInitialUserInfo(),
    resetToken: null,
  },

  reducers: {
    addUser: (state, action) => {
      state.userInfo = action.payload;
      state.isAuthenticated = true;
      if (typeof window !== "undefined") {
        localStorage.setItem("userInfo", JSON.stringify(state.userInfo));
      }
    },
    clearUser: (state) => {
      state.userInfo = {};
      state.isAuthenticated = false;
      if (typeof window !== "undefined") {
        localStorage.removeItem("userInfo");
        Cookies.remove("useraccessToken");
      }
    },
  },
});

export const { addUser, clearUser } = userSlice.actions;
export const userName = userSlice.name;
export default userSlice.reducer;
