import React, { useEffect, useState } from "react";
import HomePageVideoCard from "../components/VideoCard/HomePageVideoCard";
import Lotie from "lottie-react";
import loadingAnimation from "../assets/circle-loader.json";
import {
  subscriptionVideosURL,
  headers,
  savedVideosURL,
  homePageURL,
  searchAVideo,
} from "../components/LoginCheck/URLs";
import { useSearchParams } from "react-router-dom";
import ErrorMessage from "../components/ErrorModals/ErrorMessage";

const Home = (props) => {
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [err, setError] = useState(false);
  const [searchParams] = useSearchParams();
  useEffect(() => {
    const fetchVideos = async () => {
      setLoading(true);
      let incomingVideos;
      const timeoutPromise = new Promise((_, reject) =>
        setTimeout(() => reject(new Error("Request timed out")), 10000)
      );

      if (props.type === "random") {
        incomingVideos = Promise.race([
          fetch(homePageURL(props.type), {
            headers: headers,
          }),
          timeoutPromise,
        ]);
      } else if (props.type == "subscriptions") {
        incomingVideos = Promise.race([
          fetch(subscriptionVideosURL, {
            headers: headers,
          }),
          timeoutPromise,
        ]);
      } else if (props.type == "saved") {
        incomingVideos = Promise.race([
          fetch(savedVideosURL, {
            headers: headers,
          }),
          timeoutPromise,
        ]);
      } else {
        let query = searchParams.get("q");
        incomingVideos = Promise.race([
          fetch(searchAVideo(query), {
            headers: headers,
          }),
          timeoutPromise,
        ]);
      }

      try {
        const response = await incomingVideos;

        const responseData = await response.json();
        if (responseData.message !== "Successfully fetched videos") {
          setError(true);
          throw new Error("Error in API response");
        }
        setVideos(responseData.videos);
      } catch (error) {
        console.log(error);
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    fetchVideos();
  }, [props.type, searchParams]);

  return (
    <section className=" overflow-hidden">
      {loading && (
        <div className="absolute inset-0 grid place-items-center">
          <Lotie className="w-28 h-28" animationData={loadingAnimation} />
        </div>
      )}

      {!loading && !err && props.type == "saved" && videos.length == 0 ? (
        <ErrorMessage message="You haven't saved any videos yet" />
      ) : null}

      {!loading && !err && props.type == "search" && videos.length == 0 ? (
        <ErrorMessage message="No items match your search query" />
      ) : null}

      {err && videos.length == 0 ? (
        <ErrorMessage message="We have encountered a problem, please check again later..." />
      ) : (
        <div
          className={`flex justify-between items-center flex-wrap ${props.className}`}
        >
          {videos.length > 0 &&
            videos.map((video) => (
              <HomePageVideoCard
                key={video._id}
                video={video}
                page={props.type}
                className="mx-2"
              />
            ))}
        </div>
      )}
      {!loading && !err && videos.length == 0 && (
        <ErrorMessage message="We don't have videos to show" />
      )}
    </section>
  );
};

export default Home;
