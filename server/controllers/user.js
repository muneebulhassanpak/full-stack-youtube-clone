// import { setUser } from "../../client/src/store/loggedInUser.js";
import User from "../models/User.js";
import Video from "../models/Video.js";
import mongoose from "mongoose";

export const updateUser = async (req, res) => {
  const sentId = req.params.id;
  console.log(sentId, req.user.id);
  if (sentId == req.user.id) {
    try {
      const updatedUser = await User.findOneAndUpdate(
        { _id: new mongoose.Types.ObjectId(sentId) },
        { $set: req.body },
        { new: true }
      );
      return res.status(200).json({
        status: 200,
        message: "success",
        user: updatedUser,
      });
    } catch (err) {
      console.log(err);
      return res.status(500).json({
        status: 500,
        message: "An error occurred while updating user",
      });
    }
  } else {
    return res.status(403).json({
      status: 403,
      message: "Not the right person",
    });
  }
};

// export const deleteUser = async (req, res) => {
//   const sentId = req.params.id;
//   if (sentId == req.user.id) {
//     try {
//       await User.findOneAndDelete({ _id: new mongoose.Types.ObjectId(sentId) });
//       return res.status(200).json({
//         status: 200,
//         message: "Successfully deleted user",
//         user: {},
//       });
//     } catch (err) {
//       console.log(err);
//       return res.status(500).json({
//         status: 500,
//         message: "An error occurred while updating user",
//       });
//     }
//   } else {
//     return res.status(403).json({
//       status: 403,
//       message: "Not the right person",
//     });
//   }
// };

export const getUser = async (req, res, next) => {
  const targetChannel = req.params.id;
  console.log(targetChannel);
  try {
    if (targetChannel) {
      const user = await User.findById(targetChannel);
      if (user) {
        return res.status(200).json({
          message: "User found successfully",
          user: user,
        });
      }
      return res.status(404).json({
        status: 404,
        message: "No such user exists",
        user: {},
      });
    }
  } catch (err) {
    console.log(err, "gtttttttt");
  }
};

export const getVerifiedUser = async (req, res, next) => {
  const targetUser = req.user.id;
  try {
    if (targetUser) {
      const user = await User.findById(targetUser);
      if (user) {
        return res.status(200).json({
          message: "success",
          user: user,
        });
      }
      return res.status(404).json({
        status: 404,
        message: "No such user exists",
        user: {},
      });
    }
  } catch (err) {
    return next(new Error("Something went wrong in verification"));
  }
};

export const subscribeUser = async (req, res, next) => {
  const personHimself = req.user.id;
  const targetChannel = req.params.id;

  try {
    const person = await User.findById(personHimself);

    if (person.subscribedTo.includes(targetChannel)) {
      const updatedUser = await User.findByIdAndUpdate(
        personHimself,
        { $pull: { subscribedTo: targetChannel } },
        { new: true }
      );

      const updatedTargetChannel = await User.findByIdAndUpdate(
        targetChannel,
        { $inc: { subscribers: -1 } },
        { new: true }
      );

      return res.status(200).json({
        status: 200,
        message: "Unsubscribed successfully",
        user: updatedUser,
      });
    }

    const updatedUser = await User.findByIdAndUpdate(
      personHimself,
      { $addToSet: { subscribedTo: targetChannel } },
      { new: true }
    );

    const updatedTargetChannel = await User.findByIdAndUpdate(
      targetChannel,
      { $inc: { subscribers: 1 } },
      { new: true }
    );

    return res.status(200).json({
      status: 200,
      message: "Subscribed successfully",
      user: updatedUser,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      status: 500,
      message: "An error occurred while updating subscriptions",
    });
  }
};

export const unsubscribeUser = async (req, res, next) => {
  const personHimself = req.user.id;
  const targetChannel = req.params.id;

  try {
    const person = await User.findById(personHimself);
    if (person.subscribedTo.includes(targetChannel)) {
      const updatedUser = await User.findByIdAndUpdate(personHimself, {
        $pull: { subscribedTo: targetChannel },
      });
      const updatedTargetChannel = await User.findByIdAndUpdate(
        targetChannel,
        { $inc: { subscribers: -1 } },
        { new: true }
      );
      return res.status(200).json({
        status: 200,
        message:
          "Removed from subscription list and target channel subscriber decreased",
        user: updatedUser,
      });
    } else {
      return res.status(400).json({
        status: 400,
        message: "Already notsubscribed to this channel",
      });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      status: 500,
      message: "An error occurred while updating subscriptions",
    });
  }
};

export const getSubscriptionsChannels = async (req, res, next) => {
  const requestingUser = req.user.id;
  if (!requestingUser) {
    return next(new Error("Only logged-in users can request this"));
  }

  try {
    const user = await User.findById(requestingUser);
    if (!user) {
      return next(new Error("No such user exists"));
    }

    const allChannels = user.subscribedTo;
    const channelPromises = allChannels.map((channelId) =>
      User.findById(channelId).select("name _id image")
    );

    const channelList = await Promise.all(channelPromises);

    return res.status(200).json({
      message: "Successfully retrieved subscription channels",
      channels: channelList,
    });
  } catch (err) {
    console.log(err);
    return next(new Error("Something went wrong!"));
  }
};

export const getSubscriptionChannelVideos = async (req, res, next) => {
  try {
    const requestingUser = req.user.id;

    if (!requestingUser) {
      return next(new Error("Only logged-in users can request this"));
    }

    const user = await User.findById(requestingUser);

    if (!user) {
      return next(new Error("No such user exists"));
    }

    const allChannels = user.subscribedTo;
    const videoPromises = allChannels.map((channelId) =>
      Video.find({ userId: channelId }).limit(30).populate("userId")
    );

    const videoList = await Promise.all(videoPromises);
    const mergedVideoList = videoList.flat();

    return res.status(200).json({
      message: "Successfully fetched videos",
      subscriptions: user.subscribedTo,
      videos: mergedVideoList,
    });
  } catch (err) {
    console.log(err);
    return next(new Error("Something went wrong!"));
  }
};

export const numberOfSubscribers = async (req, res, next) => {
  try {
    const targetChannel = req.params.id;

    if (!targetChannel) {
      return next(new Error("Invalid Channel"));
    }

    const channel = await User.findById(targetChannel);

    if (!channel) {
      return next(new Error("Could not find the requested channel"));
    }

    const subsCount = channel.subscribers;

    return res.status(200).json({
      status: 200,
      message: "Success",
      subsCount,
    });
  } catch (err) {
    console.log(err);
    return next(err);
  }
};

export const saveVideo = async (req, res, next) => {
  const userId = req.user.id;
  const channel = req.params.id;

  if (!userId || !channel) {
    return next(new Error("Incomplete details"));
  }

  try {
    const user = await User.findById(userId);

    if (!user) {
      return next(new Error("Error fetching user"));
    }

    const userSavedVideos = user.savedVideos;
    let updatedVideo;

    if (userSavedVideos.includes(channel)) {
      updatedVideo = await User.findByIdAndUpdate(
        userId,
        { $pull: { savedVideos: channel } },
        { new: true }
      );
    } else {
      updatedVideo = await User.findByIdAndUpdate(
        userId,
        { $addToSet: { savedVideos: channel } },
        { new: true }
      );
    }

    if (!updatedVideo) {
      return next(new Error("Some problem occurred while updating the video"));
    }

    return res.status(200).json({
      status: 200,
      message: "Video saved successfully",
      video: updatedVideo,
    });
  } catch (err) {
    console.log(err);
    return next(new Error("Something went wrong"));
  }
};

export const allSavedVideos = async (req, res, next) => {
  const userId = req.user.id;
  try {
    const user = await User.findById(userId);
    if (!user) {
      return next(new Error("Error fetching user"));
    }
    const userSavedVideos = user.savedVideos;
    const videoPromises = userSavedVideos.map((videoId) =>
      Video.findById(videoId).populate("userId")
    );

    const videoList = await Promise.all(videoPromises);
    const mergedVideoList = videoList.filter((video) => video !== null);

    return res.status(200).json({
      message: "Successfully fetched videos",
      videos: mergedVideoList,
    });
  } catch (err) {
    console.log(err);
    return next(new Error("Something went wrong"));
  }
};
