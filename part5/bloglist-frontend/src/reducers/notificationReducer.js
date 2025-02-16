import { createSlice } from "@reduxjs/toolkit";

const initialState = { message: "", type: "" };

const notificationSlice = createSlice({
  name: "notification",
  initialState,
  reducers: {
    createNotification(state, action) {
      return { message: action.payload.message, type: action.payload.type };
    },
    removeNotification() {
      return { message: "", type: "" };
    },
  },
});

export const { createNotification, removeNotification } =
  notificationSlice.actions;

export const setNotification = (message, type) => {
  return (dispatch) => {
    dispatch(createNotification({ message, type }));
    setTimeout(() => {
      dispatch(removeNotification());
    }, 2000);
  };
};

export default notificationSlice.reducer;
