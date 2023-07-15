import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    default: "",
  },
  subscribers: {
    type: Number,
    default: 0,
  },
  subscribedTo: {
    type: [mongoose.Schema.Types.ObjectId],
    ref: "User",
    default: [],
  },
  savedVideos: {
    type: [mongoose.Schema.Types.ObjectId],
    ref: "User",
    default: [],
  },
});

const User = mongoose.model("user", userSchema);

export default User;
