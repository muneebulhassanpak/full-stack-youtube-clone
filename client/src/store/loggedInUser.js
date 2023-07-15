import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  loggedIn: false,
  user: {},
  subscribedChannels: null,
};
const loggedInUser = createSlice({
  name: "loggedInUser",
  initialState,
  reducers: {
    loggedIn: (state, action) => {
      state.loggedIn = true;
      state.user = action.payload;
    },
    loginUser: (state) => {
      state.loggedIn = true;
    },
    logoutUser: (state) => {
      state.loggedIn = false;
      state.user = {};
    },
    setLoggedInUser: (state, action) => {
      state.user = action.payload;
    },
    subscribe: (state, action) => {
      const channel = action.payload;
      let user = state.user;

      if (user.subscribedTo.includes(channel)) {
        state.user.subscribedTo = user.subscribedTo.filter(
          (id) => id !== channel
        );
      } else {
        state.user.subscribedTo.push(channel);
      }
    },
    saveVideo: (state, action) => {
      const videoId = action.payload;
      let user = state.user;
      if (user.savedVideos.includes(videoId)) {
        state.user.savedVideos = user.savedVideos.filter(
          (id) => id !== videoId
        );
      } else {
        state.user.savedVideos.push(videoId);
      }
    },
    setUser: (state, action) => {
      if (action.payload) {
        state.user = action.payload;
      }
    },
    setSubscribedChannels: (state, action) => {
      state.subscribedChannels = action.payload;
    },
  },
});
// now available:
export const {
  loggedIn,
  logoutUser,
  subscribe,
  loginUser,
  setLoggedInUser,
  saveVideo,
  setUser,
  setSubscribedChannels,
} = loggedInUser.actions;

export default loggedInUser.reducer;
// also available:
