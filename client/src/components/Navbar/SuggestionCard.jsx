import React from "react";
import sparrow from "../../../public/sparrow.jpg";
import { Link } from "react-router-dom";
import { format } from "timeago.js";
const SuggestionCard = (props) => {
  return (
    <Link
      to={`/video/${props.id}`}
      className="flex-auto flex flex-col  w-full my-3 px-0 sm:px-1 lg:px-0 sm:w-1/2 lg:flex-row first:mb-3 sm:first:mb-2 lg:w-full gap-2 sm:my-2 odd:mt-0 "
    >
      <div className="flex-1 rounded-md overflow-hidden h-auto sm:max-h-96 xl:max-h-24 ">
        <video controls>
          <source src={props?.videoUrl} />
        </video>
      </div>
      <div className="flex-1 ">
        <h4 className="font-medium text-black dark:text-white">
          {props.title}
        </h4>
        <h5 className="text-sm font-normal text-ytGray">{props.channelName}</h5>
        <div className="flex gap-2 items-center text-ytGray">
          <p className="text-xs">{props.views} views</p>
          <p className="text-xs">{format(props.postedTime)}</p>
        </div>
      </div>
    </Link>
  );
};

export default SuggestionCard;
