import Video from "../models/Video.js";
import mongoose from "mongoose";

export const addVideo = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const { title, description, videoUrl } = req.body;
    if (!title || !description || !videoUrl) {
      return next(new Error("Incomplete credentials"));
    }
    if (!userId) {
      return next(new Error("You are not logged in"));
    }

    const video = new Video({ userId, ...req.body });

    const savedVideo = await video.save();

    if (savedVideo) {
      return res.status(200).json({
        status: 200,
        message: "Video added successfully",
        video: savedVideo,
      });
    }
  } catch (err) {
    console.log(err);
    return next(new Error("Something went wrong while adding the video"));
  }
};

// export const updateVideo = async (req, res, next) => {
//   try {
//     const videoId = req.params.id;
//     const requestingUser = req.user.id;

//     if (!videoId || !requestingUser) {
//       return next(new Error("Incomplete Details"));
//     }

//     const targetVideo = await Video.findOne({
//       _id: videoId,
//       userId: requestingUser,
//     });

//     if (!targetVideo) {
//       return next(new Error("The creator can only edit a video"));
//     }

//     const updatedVideo = await Video.findByIdAndUpdate(
//       videoId,
//       { $set: req.body },
//       { new: true }
//     );

//     if (!updatedVideo) {
//       return next(new Error("Some problem occurred while updating video"));
//     }

//     return res.status(200).json({
//       status: 200,
//       message: "Video updated successfully",
//       video: updatedVideo,
//     });
//   } catch (err) {
//     console.log(err);
//     return next(err); // Pass the error to the error handling middleware
//   }
// };

export const likeVideo = async (req, res, next) => {
  try {
    const videoId = req.params.id;
    const requestingUser = req.user.id;

    if (!videoId || !requestingUser) {
      return next(new Error("Incomplete Details"));
    }

    const targetVideo = await Video.findById(videoId);

    if (!targetVideo) {
      return next(new Error("Could not find the requested video"));
    }

    if (targetVideo.userId === requestingUser) {
      return next(new Error("The creator cannot like their own video"));
    }

    let updatedVideo;

    if (targetVideo.likes.includes(requestingUser)) {
      updatedVideo = await Video.findByIdAndUpdate(
        videoId,
        {
          $pull: { likes: requestingUser },
        },
        { new: true }
      ).populate("userId");
    } else {
      updatedVideo = await Video.findByIdAndUpdate(
        videoId,
        {
          $addToSet: { likes: requestingUser },
          $pull: { dislikes: requestingUser },
        },
        { new: true }
      ).populate("userId");
    }

    if (!updatedVideo) {
      return next(new Error("Some problem occurred while updating the video"));
    }

    return res.status(200).json({
      status: 200,
      message: "Video liked successfully",
      video: updatedVideo,
    });
  } catch (err) {
    console.log(err);
    return next(err);
  }
};

export const dislikeVideo = async (req, res, next) => {
  try {
    const videoId = req.params.id;
    const requestingUser = req.user.id;

    if (!videoId || !requestingUser) {
      return next(new Error("Incomplete Details"));
    }

    const targetVideo = await Video.findById(videoId);

    if (!targetVideo) {
      return next(new Error("Could not find the requested video"));
    }

    if (targetVideo.userId === requestingUser) {
      return next(new Error("The creator cannot dislike their own video"));
    }

    let updatedVideo;

    if (targetVideo.dislikes.includes(requestingUser)) {
      updatedVideo = await Video.findByIdAndUpdate(
        videoId,
        {
          $pull: { dislikes: requestingUser },
        },
        { new: true }
      );
    } else {
      updatedVideo = await Video.findByIdAndUpdate(
        videoId,
        {
          $addToSet: { dislikes: requestingUser },
          $pull: { likes: requestingUser },
        },
        { new: true }
      );
    }

    if (!updatedVideo) {
      return next(new Error("Some problem occurred while updating the video"));
    }

    return res.status(200).json({
      status: 200,
      message: "Video disliked successfully",
      video: updatedVideo,
    });
  } catch (err) {
    console.log(err);
    return next(err);
  }
};

export const commentVideo = async (req, res, next) => {
  try {
    const videoId = req.params.id;
    const requestingUser = req.user.id;
    const message = req.body.message;

    if (!videoId || !requestingUser || !message) {
      return next(new Error("Incomplete Details"));
    }

    const targetVideo = await Video.findById(videoId);

    if (!targetVideo) {
      return next(new Error("Could not find the requested video"));
    }

    if (targetVideo.userId === requestingUser) {
      return next(new Error("The creator cannot comment on their own video"));
    }

    const commentToBeAdded = {
      userId: requestingUser,
      comment: message,
    };

    const updatedVideo = await Video.findByIdAndUpdate(
      videoId,
      { $push: { comments: commentToBeAdded } },
      { new: true }
    ).populate("userId");

    if (!updatedVideo) {
      return next(new Error("Some problem occurred while updating the video"));
    }

    return res.status(200).json({
      status: 200,
      message: "Video comment added successfully",
      video: updatedVideo,
    });
  } catch (err) {
    console.log(err);
    return next(err);
  }
};

// export const commentUpdate = async (req, res, next) => {
//   try {
//     const videoId = req.params.id;
//     const commentId = req.body.commentId;
//     const requestingUser = req.user.id;
//     const message = req.body.message;

//     if (!videoId || !requestingUser || !message || !commentId) {
//       return next(new Error("Incomplete Details"));
//     }

//     const targetVideo = await Video.findById(videoId);

//     if (!targetVideo) {
//       return next(new Error("Could not find the requested video"));
//     }

//     const commentIndex = targetVideo.comments.findIndex(
//       (item) => item.userId == requestingUser && item._id == commentId
//     );

//     if (commentIndex === -1) {
//       return next(new Error("No such comment exists"));
//     }

//     targetVideo.comments[commentIndex].comment = message;

//     const updatedVideo = await targetVideo.save();

//     if (!updatedVideo) {
//       return next(new Error("Some problem occurred while updating the video"));
//     }

//     return res.status(200).json({
//       status: 200,
//       message: "Video comment updated successfully",
//       video: updatedVideo,
//     });
//   } catch (err) {
//     console.log(err);
//     return next(err);
//   }
// };

// export const deleteVideo = async (req, res, next) => {
//   try {
//     const videoId = req.params.id;
//     const requestingUser = req.user.id;

//     if (!videoId || !requestingUser) {
//       return next(new Error("Incomplete Details"));
//     }

//     const targetVideo = await Video.findOne({
//       _id: videoId,
//       userId: requestingUser,
//     });

//     if (!targetVideo) {
//       return next(new Error("The creator can only delete a video"));
//     }

//     const updatedVideo = await Video.findByIdAndDelete(videoId);

//     if (!updatedVideo) {
//       return next(new Error("Some problem occurred while updating video"));
//     }

//     return res.status(200).json({
//       status: 200,
//       message: "Video deleted successfully",
//     });
//   } catch (err) {
//     console.log(err);
//     return next(new Error("Something went wrong")); // Pass the error to the error handling middleware
//   }
// };

export const getVideo = async (req, res, next) => {
  try {
    const videoId = req.params.id;
    const videoStatus = await Video.findById(videoId);
    if (!videoStatus) {
      return next(new Error("No such video exists"));
    }
    const updatedVideo = await Video.findByIdAndUpdate(
      videoId,
      { $inc: { views: 1 } },
      { new: true }
    )
      .populate({
        path: "comments.userId",
        select: "name image",
      })
      .populate("userId");
    if (!updatedVideo) {
      return next(new Error("Error while updating the video"));
    }
    return res.status(200).json({
      status: 200,
      message: "Video views added successfully",
      video: updatedVideo,
    });
  } catch (err) {
    console.log(err);
    return next(new Error("Something went wrong"));
  }
};

export const searchForVideo = async (req, res, next) => {
  const query = req.query.q;
  if (!query) {
    return next(new Error("Please fill the search bar"));
  }
  const videos = await Video.find({
    title: { $regex: query, $options: "i" },
  })
    .limit(30)
    .populate("userId");
  res.status(200).json({
    sucess: true,
    message: "Successfully fetched videos",
    videos,
  });
};

export const getComments = async (req, res, next) => {
  const videoId = req.params.id;
  if (!videoId) {
    return next(new Error("No Id passed "));
  }
  try {
    const video = await Video.findById(videoId);
    if (!video) {
      return next(new Error("Invalid video id "));
    }
    return res.status(200).json(video);
  } catch (err) {
    return next(new Error("Something went wrong fetching comments"));
  }
};

export const getRandomVideos = async (req, res, next) => {
  try {
    const videos = await Video.aggregate([{ $sample: { size: 30 } }])
      .lookup({
        from: "users",
        localField: "userId",
        foreignField: "_id",
        as: "user",
      })
      .project({
        _id: 1,
        title: 1,
        views: 1,
        createdAt: 1,
        videoUrl: 1,
        "user.name": 1,
        "user.image": 1,
      })
      .exec();

    // The `videos` variable will now contain an array of video objects with the `user` property populated with the `name` field from the related user.

    if (videos) {
      return res.status(200).json({
        message: "Successfully fetched videos",
        videos: videos,
      });
    }
    return next(new Error("Error fetching videos"));
  } catch (error) {
    console.error(error);
    return next(new Error("Error fetching videos"));
  }
};

export const getSuggestionVideos = async (req, res, next) => {
  try {
    const query = req.query.title;
    const videoId = req.query.id;
    const cleanString = query.replace(/[^\w\s]/g, "");
    const wordArray = cleanString.split(" ");
    // Query optimization by using aggregation pipeline
    const videos = await Video.aggregate([
      // Match videos that have at least one title word from the wordArray
      {
        $match: {
          title: { $regex: wordArray.join("|"), $options: "i" },
          _id: { $ne: new mongoose.Types.ObjectId(videoId) }, // Exclude video with the same ID
        },
      },
      // Lookup to populate user information based on userId
      {
        $lookup: {
          from: "users",
          localField: "userId",
          foreignField: "_id",
          as: "user",
        },
      },
      // Unwind the user array
      { $unwind: "$user" },
      // Project the necessary fields from the video and user
      {
        $project: {
          _id: 1,
          title: 1,
          videoUrl: 1,
          views: 1,
          createdAt: 1,
          "user.name": 1,

          // Include other user fields as needed
        },
      },
      // Limit to 15 videos
      { $limit: 15 },
    ]);
    if (!videos) {
      return res.next(new Error("HAH"));
    }
    return res.status(200).json({
      success: true,
      videos,
    });
  } catch (error) {
    next(error);
  }
};
