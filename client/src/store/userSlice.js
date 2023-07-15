import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  loading: false,
  loggedIn: false,
  user: {},
};
const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    startLoading: (state) => {
      state.loading = true;
    },
    endLoading: (state) => {
      state.loading = false;
    },
    successfulLoading: (state, action) => {
      state.loading = false;
      state.user = action.payload;
    },
    login: (state) => {
      state.loggedIn = true;
    },
    setUser: (state, action) => {
      state.user = action.payload;
    },
  },
});
// now available:
export const { startLoading, endLoading, successfulLoading, login } =
  userSlice.actions;

export default userSlice.reducer;
// also available:
