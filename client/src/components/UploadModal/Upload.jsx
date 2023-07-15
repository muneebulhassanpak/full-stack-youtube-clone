import React, { useState } from "react";
import { IoMdCloseCircle } from "react-icons/io";
import { app } from "../firebase";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import { uploadAVideo, headers } from "../LoginCheck/URLs";
import { ToastContainer, toast } from "react-toastify";

const Upload = (props) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [file, setFile] = useState(null);
  const [videoPercentage, setVideoPercentage] = useState(0);

  // => TOAST SETUP
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

  const uploadVideo = () => {
    const storage = getStorage(app);
    const fileName = new Date().getTime() + file.name;
    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setVideoPercentage(progress);
        switch (snapshot.state) {
          case "paused":
            errorToast("Upload is paused, please check your connection");
            break;
          case "running":
            console.log("Upload is running");
            break;
          default:
            break;
        }
      },
      (error) => {
        alert(error);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          const object = {
            title: title,
            description: description,
            videoUrl: downloadURL,
          };
          fetch(uploadAVideo, {
            headers: headers,
            method: "POST",
            body: JSON.stringify(object),
          })
            .then((response) => response.json())
            .then((response) => {
              console.log("VIDEO CREATED WITH", response);
            });
        });
      }
    );
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (title && description) {
      uploadVideo();
    }
  };
  return (
    <>
      <div className="absolute top-0 left-0 w-full h-screen bg-gray-800/75 grid place-items-center">
        <div className="w-uploadVideo z-50 mx-0 sm:w-2/3  max-w-2xl bg-ytMilky dark:bg-ytBlack rounded-md p-2 sm:p-4">
          <div className="text-right w-full bg-red-500 relative ">
            <IoMdCloseCircle
              className="text-3xl hover:scale-95 hover:cursor-pointer dark:text-white rounded-full absolute right-0 top-0"
              onClick={props.onClick}
            />
          </div>
          <h1 className="text-center text-2xl md:text-4xl font-medium leading-7 mt-6 mb-2 dark:text-white">
            Upload a new video
          </h1>
          <form action="" className="w-full" onSubmit={handleFormSubmit}>
            <input
              type="text"
              name="videoTitle"
              id="videoTitle"
              required
              className="py-2 my-2 rounded-sm bg-ytMilky dark:bg-ytLightGray border border-slate-400 w-full text-ytBlack dark:text-white px-2"
              placeholder="Enter appropriate video title ( Max:100 characters)"
              maxLength={100}
              minLength={5}
              onChange={(e) => setTitle(e.target.value)}
            />
            <textarea
              name="videoDescription"
              id="videoDescription"
              maxLength={300}
              minLength={5}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full h-40 bg-ytMilky dark:bg-ytLightGray rounde-sm dark:text-white p-2 border border-slate-400"
              placeholder="Please explain what your video is about (Max:300 characters)"
            ></textarea>

            {videoPercentage ? (
              <span className="dark:text-white">
                Uploading {Math.round(videoPercentage)}%
              </span>
            ) : (
              <input
                type="file"
                name="video"
                id="video"
                accept="video/*"
                required
                onChange={(e) => setFile(e.target.files[0])}
                className="file:py-2 file:px-4
            file:rounded-full file:border-0
            file:text-sm file:font-semibold
            file:bg-ytGray file:text-white
            hover:file:bg-ytBlue file:hover:cursor-pointer inline-block mr-0"
              />
            )}

            <input
              type="submit"
              value="Done"
              disabled={videoPercentage > 0 && videoPercentage < 100}
              className="block w-full py-2 mt-4 bg-ytBlue text-white hover:cursor-pointer"
            />
          </form>
        </div>
      </div>
      <ToastContainer />
    </>
  );
};

export default Upload;
