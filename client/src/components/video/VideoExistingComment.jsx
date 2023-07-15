import React from "react";
import academind from "../../../public/academind.jpg";
import { format } from "timeago.js";

const VideoExistingComment = (props) => {
  return (
    <div className="flex gap-3 my-4 items-center  text-black dark:text-white">
      <div>
        <img
          src={
            props?.comment?.userId?.image
              ? props?.comment?.userId?.image
              : academind
          }
          alt=""
          className="w-8 h-8 rounded-full object-cover"
        />
      </div>
      <div>
        <div className="flex gap-3">
          <h4 className="font-medium text-xs sm:text-sm">
            @{props?.comment?.userId?.name}
          </h4>
          <h5 className="font-normal text-xs sm:text-sm  dark:text-ytGray">
            {format(props?.comment?.createdAt)}
          </h5>
        </div>
        <p className="mt-1 text-base">{props?.comment?.comment}</p>
      </div>
    </div>
  );
};

export default VideoExistingComment;
