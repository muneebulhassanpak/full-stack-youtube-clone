import React, { useState } from "react";
import academind from "../../../public/academind.jpg";
import sparrow from "../../../public/sparrow.jpg";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import PaddingWrapper from "../../Wrappers/PaddingWrapper";
import { useSelector, useDispatch } from "react-redux";
import { likeVideo, dislikeVideo } from "../../store/videoSlice";
import { setVideo } from "../../store/videoSlice";
import {
  subscribe,
  setLoggedInUser,
  saveVideo,
  setUser,
} from "../../store/loggedInUser";
import {
  MdScreenShare,
  MdOutlineFolderSpecial,
  MdFileDownloadDone,
  MdThumbDownOffAlt,
  MdThumbUp,
  MdThumbUpOffAlt,
  MdThumbDown,
} from "react-icons/md";
import { loginCheck } from "../LoginCheck/Verify";
import {
  headers,
  subChannel,
  likeAVideo,
  dislikeAVideo,
  saveAVideo,
} from "../LoginCheck/URLs.js";
import { errorToast, success } from "../ErrorModals/ErrorToast";
import ReactPlayer from "react-player";

const Video = () => {
  const dispatch = useDispatch();
  const video = useSelector((store) => store?.video?.video);
  const currentUser = useSelector((store) => store?.loggedInUser?.user);
  const videoOwner = useSelector((store) => store?.video?.video?.userId);
  const [sub, setSub] = useState(false);

  //SUBSCRIPTION HANDLER ///////////////////
  const subscriptionHandler = () => {
    if (loginCheck()) {
      dispatch(subscribe(video?.userId?._id));
      const subscribeChannel = async () => {
        let response = await fetch(subChannel(video?.userId?._id), {
          method: "PUT",
          headers: headers,
        });
        response = await response.json();
        if (response.status == 200) {
          setSub(true);
          dispatch(setLoggedInUser(response.user));
        } else {
          console.log("ISSUE.........", response);
        }
      };
      subscribeChannel();
    } else {
      errorToast("Please Sign in first");
    }
  };

  /// LIKES    INCREASE/DECREASE  /////////////////
  const increaseLikes = async (e) => {
    e.preventDefault();
    if (loginCheck()) {
      dispatch(likeVideo(currentUser._id));
      const actualLike = await fetch(likeAVideo(video?._id), {
        method: "PUT",
        headers: headers,
      });
      const response = await actualLike.json();
      dispatch(setVideo(response.video));
      console.log(response.video);
    } else {
      errorToast("Please Sign in first");
    }
  };

  /// DISLIKES INCREASE/DECREASE /////////////

  const decreaseLikes = async (e) => {
    e.preventDefault();
    if (loginCheck()) {
      dispatch(dislikeVideo(currentUser._id));
      const actualLike = await fetch(dislikeAVideo(video?._id), {
        method: "PUT",
        headers: headers,
      });
      const response = await actualLike.json();
    } else {
      errorToast("Please Sign in first");
    }
  };

  const saveVideoHandler = async (e) => {
    if (loginCheck()) {
      e.preventDefault();
      const videoId = video?._id;
      dispatch(saveVideo(videoId));
      const sResponse = await fetch(saveAVideo(videoId), {
        method: "PUT",
        headers: headers,
      });
      const response = await sResponse.json();
      if (response.status == 200) {
        dispatch(setUser(response.user));
      }
    } else {
      errorToast("Please Sign in first");
    }
  };

  const copyToClipBoard = () => {
    const linkToCopy = `${video?.videoUrl}`; // Replace with the actual link you want to copy

    navigator.clipboard.writeText(linkToCopy).then(() => {
      success("Link copied to clipboard");
    });
  };
  return (
    <div className="mb-4">
      <div>
        {/* <video> */}
        {/* <source src={video?.videoUrl} /> */}
        <ReactPlayer
          url={video?.videoUrl}
          controls
          width="100%"
          height="100%"
        />
        {/* </video> */}
      </div>
      <PaddingWrapper>
        <h2 className="leading-7 py-2 text-xl text-black dark:text-white">
          {video?.title}
        </h2>
        <div className="flex justify-between flex-col md:flex-row items-start md:items-center">
          <div className="w-full md:w-auto flex gap-3 justify-between  items-center  mb-3 md:mb-0">
            <div className="flex gap-1 items-center">
              <img
                src={videoOwner?.image ? videoOwner?.image : academind}
                className="w-11 h-11 rounded-full"
                alt=""
              />
              <div>
                <h3 className="font-medium text-black dark:text-white">
                  {videoOwner?.name}
                </h3>
                <p className="text-sm font-normal text-black dark:text-white">
                  {videoOwner?.subscribers}
                </p>
              </div>
            </div>
            <div>
              <button
                onClick={subscriptionHandler}
                className="bg-black dark:bg-ytRed mr-0 lg:mr-1 px-4 py-2 shadow-lg rounded-full text-white text-sm"
              >
                {currentUser?.subscribedTo?.includes(video?.userId?._id)
                  ? "Subscribed"
                  : "Subscribe"}
              </button>
            </div>
          </div>
          <div className="w-full md:w-auto flex justify-center  items-center gap-2 rounded-full self-end md:self-auto">
            <div className="border-2 py-1 max-w-[250px] md:flex-1 flex  rounded-full bg-slate-200">
              <button
                className="text-sm flex gap-1 items-center px-3 py-0"
                onClick={increaseLikes}
              >
                {video?.likes?.find((x) => x == currentUser?._id) ? (
                  <MdThumbUp className="inline-block text-lg" />
                ) : (
                  <MdThumbUpOffAlt className="inline-block text-lg" />
                )}

                {video?.likes?.length}
              </button>
              <button
                className="text-sm flex items-center px-3 py-0 border-l-2 border-slate-400"
                onClick={decreaseLikes}
              >
                {video?.dislikes?.includes(currentUser?._id) ? (
                  <MdThumbDown className="inline-block text-lg" />
                ) : (
                  <MdThumbDownOffAlt className="inline-block text-lg" />
                )}
              </button>
            </div>
            <div className="flex flex-1 gap-2 hover">
              <button
                className="text-sm flex items-center px-3 py-1 bg-slate-200 rounded-full"
                onClick={saveVideoHandler}
              >
                {currentUser?.savedVideos?.includes(video?._id) ? (
                  <>
                    <MdFileDownloadDone className="inline-block text-xl mr-1" />
                    Saved
                  </>
                ) : (
                  <>
                    <MdOutlineFolderSpecial className="inline-block text-xl mr-1" />
                    Save
                  </>
                )}
              </button>

              <button
                className="text-sm flex gap-1 items-center px-3  bg-slate-200 rounded-full"
                onClick={copyToClipBoard}
              >
                <MdScreenShare className="inline-block text-xl" />
                Share
              </button>
            </div>
          </div>
        </div>
      </PaddingWrapper>
      <ToastContainer />
    </div>
  );
};

export default Video;
