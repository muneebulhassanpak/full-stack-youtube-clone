import React from "react";
import Video from "./Video";
import VideoDescription from "./VideoDescription";
import VideoNewComment from "./VideoNewComment";
import VideoExistingComment from "./VideoExistingComment";
import PaddingWrapper from "../../Wrappers/PaddingWrapper";
import { useSelector } from "react-redux";

const VideoComponent = () => {
  const videoComments = useSelector((store) => store?.video?.video?.comments);
  return (
    <>
      <Video />
      <VideoDescription />
      <PaddingWrapper>
        <VideoNewComment />
        {videoComments &&
          videoComments.length > 0 &&
          videoComments.map((comment) => (
            <VideoExistingComment key={comment._id} comment={comment} />
          ))}
      </PaddingWrapper>
    </>
  );
};

export default VideoComponent;
