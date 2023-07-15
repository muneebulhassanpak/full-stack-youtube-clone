import React from "react";
import acdemind from "../../../public/academind.jpg";
import { useSelector } from "react-redux";
const SubscribedChannels = (props) => {
  const subscribedChannels = useSelector(
    (store) => store?.loggedInUser?.subscribedChannels
  );
  return (
    <>
      {subscribedChannels &&
        subscribedChannels.length > 0 &&
        subscribedChannels.map((channel) => (
          <div key={channel._id} className="py-2 first:pt-2 last:pb-2">
            <img
              src={channel?.image ? channel?.image : acdemind}
              alt=""
              className="w-7 h-7 rounded-full inline-block"
            />
            <h4 className="inline-block ml-2">{`${channel?.name.slice(
              0,
              12
            )}...`}</h4>
          </div>
        ))}
      {!subscribedChannels && (
        <p className="dark:text-white">No channels subscribed</p>
      )}
    </>
  );
};

export default SubscribedChannels;
