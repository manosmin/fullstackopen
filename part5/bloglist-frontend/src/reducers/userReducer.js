import { createSlice } from "@reduxjs/toolkit";
import userService from "../services/users";

const userSlice = createSlice({
  name: "users",
  initialState: { username: "", token: "" },
  reducers: {
    setUser(state, action) {
      localStorage.setItem("username", JSON.stringify(action.payload.username));
      localStorage.setItem("token", JSON.stringify(action.payload.token));
      return { username: action.payload.username, token: action.payload.token };
    },
    removeUser(state, action) {
      localStorage.removeItem("username");
      localStorage.removeItem("token");
      return { username: "", token: "" };
    },
  },
});

export const { setUser, removeUser } = userSlice.actions;

export const initializeUser = () => {
  return async (dispatch) => {
    const storedUsername = localStorage.getItem("username");
    const storedToken = localStorage.getItem("token");
    if (storedUsername && storedToken) {
      dispatch(
        setUser({
          username: JSON.parse(storedUsername),
          token: JSON.parse(storedToken),
        }),
      );
    }
  };
};

export const login = (creds) => {
  return async (dispatch) => {
    try {
      const response = await userService.login(creds);
      dispatch(setUser(response));
    } catch (error) {
      throw new Error(error.response.data.error);
    }
  };
};

export const logout = () => {
  return async (dispatch) => {
    dispatch(removeUser());
  };
};

export default userSlice.reducer;
