import React, { useEffect, useState } from "react";
import SuggestionCard from "./SuggestionCard";
import { useSelector } from "react-redux";
import { getVideoSuggestions, headers } from "../LoginCheck/URLs";
const Suggestions = () => {
  const { video } = useSelector((store) => store?.video);
  const [videos, setVideos] = useState([]);
  useEffect(() => {
    const getVideos = async () => {
      let response = await fetch(
        getVideoSuggestions(video?._id, video?.title),
        {
          headers: headers,
        }
      );
      response = await response.json();
      if (response.success) {
        setVideos(response.videos);
      }
    };
    video?._id && video?.title && getVideos();
  }, [video?._id]);

  return (
    <div className="flex flex-col sm:flex-row lg:flex-col flex-wrap ">
      {videos.length == 0 ? <p>No relevent videos found</p> : null}
      {videos.length > 0 &&
        videos.map((video) => (
          <SuggestionCard
            key={video._id}
            id={video._id}
            title={video.title}
            channelName={video?.user?.name}
            views={video?.views}
            postedTime={video?.createdAt}
            videoUrl={video?.videoUrl}
          />
        ))}
    </div>
  );
};

export default Suggestions;
