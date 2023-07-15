import express from "express";
import { verifyUser } from "../config/verify.js";

import {
  updateUser,
  // deleteUser,
  getUser,
  subscribeUser,
  unsubscribeUser,
  getSubscriptionsChannels,
  numberOfSubscribers,
  getSubscriptionChannelVideos,
  getVerifiedUser,
  saveVideo,
  allSavedVideos,
} from "../controllers/user.js";

const router = express.Router();

router.get("/subscriptions", verifyUser, getSubscriptionsChannels);

router.put("/subscribe/:id", verifyUser, subscribeUser);

router.get("/subscriptions/videos", verifyUser, getSubscriptionChannelVideos);

router.get("/verified", verifyUser, getVerifiedUser);

router.put("/save/:id", verifyUser, saveVideo);

router.get("/saved/videos", verifyUser, allSavedVideos);

router.get("/subscribers/:id", numberOfSubscribers);

router.put("/unsubscribe/:id", verifyUser, unsubscribeUser);

router.put("/update/:id", verifyUser, updateUser);

router.get("/:id", getUser);

// router.delete("/:id", verifyUser, deleteUser);

export default router;
