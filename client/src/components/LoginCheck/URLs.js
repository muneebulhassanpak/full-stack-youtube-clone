import Cookies from "js-cookie";

const baseURL = "http://localhost:3001";

const authRoutes = `${baseURL}/auth`;
export const loginURL = `${authRoutes}/signin`;
export const signUpURL = `${authRoutes}/signup`;

const userRoutes = `${baseURL}/user`;
export const loggedInUserURL = `${userRoutes}/verified`;
export const subscriptionVideosURL = `${userRoutes}/subscriptions/videos`;
export const savedVideosURL = `${userRoutes}/saved/videos`;
export const getSubscribedChannels = `${userRoutes}/subscriptions`;
export const subChannel = (channelId) => `${userRoutes}/subscribe/${channelId}`;
export const saveAVideo = (videoId) => `${userRoutes}/save/${videoId}`;
export const updateAUser = (userId) => `${userRoutes}/update/${userId}`;

const videoRoutes = `${baseURL}/videos`;
export const homePageURL = (place) => `${videoRoutes}/${place}`;
export const getAVideo = (id) => `${videoRoutes}/${id}`;
export const likeAVideo = (id) => `${videoRoutes}/like/${id}`;
export const dislikeAVideo = (id) => `${videoRoutes}/dislike/${id}`;
export const addAComment = (id) => `${videoRoutes}/comment/${id}`;
export const searchAVideo = (query) => `${videoRoutes}/search?q=${query}`;
export const uploadAVideo = `${videoRoutes}/add`;
export const getVideoSuggestions = (id, query) =>
  `${videoRoutes}/suggestions?id=${id}&title=${query}`;

const cookie = () => {
  return `${Cookies.get("access_token")}`;
};

export const headers = {
  "Content-Type": "application/json",
  Authorization: `${Cookies.get("access_token")}` || cookie(),
};
