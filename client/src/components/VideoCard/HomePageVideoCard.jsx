import React from "react";
import { Link } from "react-router-dom";
import { format } from "timeago.js";

const HomePageVideoCard = (props) => {
  const { title, views, createdAt, videoUrl, _id } = props.video;
  let updatedTitle;
  if (title && title.length > 27) {
    updatedTitle = title.slice(0, 30);
  }
  let creatorName, creatorImage;

  if (props.page !== "random") {
    creatorName = props?.video?.userId?.name;
    creatorImage = props?.video?.userId?.image;
  } else {
    if (props?.video?.user) {
      creatorImage = props?.video?.user[0].image;
      creatorName = props?.video?.user[0]?.name;
    }
  }
  return (
    <div className={`w-full sm:w-1/2 md:w-1/3 p-2 mb-1 `}>
      <Link to={`/video/${_id}`}>
        <div className="max-h-48 rounded-lg overflow-hidden w-full object-cover">
          <video controls>
            <source src={videoUrl} />
          </video>
        </div>
        <div className="flex items-center">
          <div className="flex-2 flex p-2">
            <img
              src={
                creatorImage
                  ? creatorImage
                  : `https://yt3.ggpht.com/6uAVb1EezTEjLaftNfbblf8nIZhE-O7cGlO_7C2PoF8BVoizdxJGNUczXNY_kbUpghxnGDOZXQ=s48-c-k-c0x00ffffff-no-rj`
              }
              alt=""
              className="w-8 h-8 rounded-full"
            />
            {/* <img src={videoUrl} alt="" className="w-8 h-8 rounded-full" /> */}
            <div className="flex-1 pl-2">
              <h3 className=" font-medium text-base text-dark dark:text-white">
                {updatedTitle ? `${updatedTitle}...` : `${title}`}
              </h3>
              <h4 className=" font-regular text-sm  text-ytBlack dark:text-ytGray">
                {creatorName}
              </h4>
              <div className="flex items-center  text-ytBlack dark:text-ytGray">
                <h5 className="text-xs">{views} views</h5>
                <p className="pl-2 text-xs">{format(createdAt)}</p>
              </div>
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default HomePageVideoCard;
