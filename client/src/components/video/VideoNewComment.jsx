import React, { useRef } from "react";
import { MdPerson } from "react-icons/md";
import { addComment } from "../../store/videoSlice";
import { setVideo } from "../../store/videoSlice";
import { useSelector, useDispatch } from "react-redux";
import { loginCheck } from "../LoginCheck/Verify";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { addAComment, headers } from "../LoginCheck/URLs";

const VideoNewComment = () => {
  const dispatch = useDispatch();

  ///TOAST SETUP
  const errorToast = (message) =>
    toast.error(message, {
      position: "top-center",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
    });

  ///VIDEO COMMENT DATA COLLECTION
  const currentUserId = useSelector((store) => store?.loggedInUser?.user?._id);
  const videoId = useSelector((store) => store?.video?.video?._id);

  /// VIDEO COMMENT DATA COLLECTION SECTION
  const newCommentRef = useRef();
  let comment;
  const formSubsmissionHandler = (e) => {
    e.preventDefault();
    if (loginCheck()) {
      comment = newCommentRef.current.value;
      dispatch(addComment({ commenterId: currentUserId, message: comment }));
      newCommentRef.current.value = "";
      commentSending(comment);
    } else {
      errorToast("Please Sign in first");
    }
  };

  const commentSending = async (comment) => {
    const response = await fetch(addAComment(videoId), {
      method: "POST",
      headers: headers,
      body: JSON.stringify({ message: comment }),
    });
    const reslovedResponse = await response.json();
    if (reslovedResponse.status == 200) {
      const video = reslovedResponse.video;
      dispatch(setVideo(video));
    } else {
      console.log("Error sending comment to database", reslovedResponse);
    }
  };

  return (
    <>
      <form
        action=""
        className="w-full flex items-center gap-2 my-5"
        onSubmit={formSubsmissionHandler}
      >
        <MdPerson className="text-3xl text-black dark:text-white" />
        <input
          type="text"
          name="newComment"
          id="newComment"
          required
          ref={newCommentRef}
          placeholder="Add a comment..."
          className="w-full focus:outline-none border-b bg-white dark:bg-ytBlack border-slate-950 dark:border-slate-100 focus:border-ytBlue focus:border-b-2 focus:dark:text-white"
        />
        {}
        <input
          type="submit"
          value="Submit"
          className="px-3 py-1 bg-ytBlue border-none rounded-full text-white hover:cursor-pointer "
        />
      </form>
      <ToastContainer />
    </>
  );
};

export default VideoNewComment;
