import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  loading: false,
  video: {},
};
const videoSlice = createSlice({
  name: "video",
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
      state.video = action.payload;
    },
    setVideo: (state, action) => {
      state.video = action.payload;
    },
    likeVideo: (state, action) => {
      const userId = action.payload;
      let video = state.video;

      if (video.likes.includes(userId)) {
        state.video.likes = video.likes.filter((id) => id !== userId);
      } else {
        state.video.likes.push(userId);
        if (video.dislikes.includes(userId)) {
          state.video.dislikes = video.dislikes.filter((id) => id !== userId);
        }
      }
    },
    dislikeVideo: (state, action) => {
      const userId = action.payload;
      let video = state.video;

      if (video.dislikes.includes(userId)) {
        state.video.dislikes = video.dislikes.filter((id) => id !== userId);
      } else {
        state.video.dislikes.push(userId);
        if (state.video.likes.includes(userId)) {
          state.video.likes = video.likes.filter((id) => id !== userId);
        }
      }
    },
    addComment: (state, action) => {
      const commenterId = action.payload.commenterId;
      const commentMessage = action.payload.message;
      const video = state.video;
      if (video && commenterId) {
        const commentObject = {
          userId: commenterId,
          comment: commentMessage,
        };
        state.video.comments = [commentObject, ...video.comments];
      }
    },
  },
});
// now available:
export const {
  startLoading,
  endLoading,
  successfulLoading,
  dislikeVideo,
  likeVideo,
  setVideo,
  addComment,
} = videoSlice.actions;

export default videoSlice.reducer;
// also available:
