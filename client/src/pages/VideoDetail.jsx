import React, { useEffect, useState } from "react";
import VideoComponent from "../components/video/VideoComponent";
import Suggestions from "../components/Navbar/Suggestions";
import { useParams } from "react-router-dom";
import PaddingWrapper from "../Wrappers/PaddingWrapper";
import { useDispatch } from "react-redux";
import {
  startLoading,
  endLoading,
  successfulLoading,
} from "../store/videoSlice.js";
import { getAVideo, headers } from "../components/LoginCheck/URLs";
import { useNavigate } from "react-router-dom";

const VideoDetail = () => {
  const params = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const videoId = params.id;
  let x = 0;
  useEffect(() => {
    const fetchVideo = async () => {
      dispatch(startLoading());
      const response = await fetch(getAVideo(videoId), {
        headers: headers,
      });
      let videoResponse = await response.json();
      if (videoResponse.status != 200) {
        navigate("/");
        return;
      }
      dispatch(endLoading());
      dispatch(successfulLoading(videoResponse.video));
    };
    if (x == 0 && videoId) {
      x = 1;
      fetchVideo();
    }
  }, [videoId]);

  return (
    <section className="flex flex-col  lg:flex-row gap-4 justify-between">
      <div className="flex-auto  w-full lg:w-2/3">
        <VideoComponent />
      </div>
      <div className=" w-full lg:w-1/3">
        <PaddingWrapper>
          <Suggestions />
        </PaddingWrapper>
      </div>
    </section>
    // <h1>HYHY</h1>
  );
};

export default VideoDetail;
