import React, { useState, useEffect } from "react";
import { format } from "timeago.js";
import { useSelector } from "react-redux";

const VideoDescription = () => {
  const [toggle, setToggle] = useState(false);
  const video = useSelector((store) => store?.video?.video);
  const videoDescription = video?.description;

  useEffect(() => {
    if (videoDescription && videoDescription.length > 140) {
      setToggle(true);
    } else {
      setToggle(false);
    }
  }, [videoDescription]);

  const toggleDescription = () => {
    setToggle(!toggle);
  };

  return (
    <div className="bg-ytMilky dark:bg-ytLightGray hover:bg-ytGray hover:cursor-pointer text-black dark:text-white mx-2 md:mx-0 rounded-lg p-4">
      <div className="flex gap-5 my-2">
        <h4 className="font-medium text-base">{video?.views} views</h4>
        <h5 className="font-medium text-base">{format(video?.createdAt)}</h5>
      </div>
      {toggle ? (
        <>
          <p className="leading-5 my-2 text-sm inline-block mr-1">
            {video?.description.substring(0, 140)}...
          </p>
          <button
            onClick={toggleDescription}
            className="text-ytBlue text-sm inline-block"
          >
            show more
          </button>
        </>
      ) : (
        <p className="leading-5 my-2 text-sm">{video?.description}</p>
      )}
    </div>
  );
};

export default VideoDescription;
