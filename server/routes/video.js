import express from "express";
import {
  addVideo,
  getVideo,
  // updateVideo,
  // deleteVideo,
  likeVideo,
  dislikeVideo,
  commentVideo,
  searchForVideo,
  // commentUpdate,
  getComments,
  getRandomVideos,
  getSuggestionVideos,
} from "../controllers/video.js";

import { verifyUser } from "../config/verify.js";

const router = express.Router();

router.get("/comments/:id", getComments);

router.post("/add", verifyUser, addVideo);

// router.put("/video/update/:id", verifyUser, updateVideo);

router.post("/comment/:id", verifyUser, commentVideo);

router.put("/like/:id", verifyUser, likeVideo);

router.put("/dislike/:id", verifyUser, dislikeVideo);

// router.put("comment/update/:id", verifyUser, commentUpdate);

// router.delete("/video/delete/:id", verifyUser, deleteVideo);

router.get("/random", getRandomVideos);

router.get("/search", searchForVideo);

router.get("/suggestions", getSuggestionVideos);

router.get("/:id", getVideo);

export default router;
