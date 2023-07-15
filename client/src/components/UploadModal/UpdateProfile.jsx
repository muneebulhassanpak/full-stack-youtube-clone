import React, { useState, useEffect } from "react";
import { setLoggedInUser } from "../../store/loggedInUser";
import { IoMdCloseCircle } from "react-icons/io";
import { app } from "../firebase";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import { headers, updateAUser } from "../LoginCheck/URLs";
import { ToastContainer, toast } from "react-toastify";
import { useSelector, useDispatch } from "react-redux";

const UpdateProfile = (props) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  // const [password, setPassword] = useState("");
  const [file, setFile] = useState(null);
  const [imagePercentage, setImagePercentage] = useState(0);
  const user = useSelector((store) => store?.loggedInUser?.user);
  const dispatch = useDispatch();

  useEffect(() => {
    if (user) {
      setName(user.name);
      setEmail(user.email);
      // setPassword(user.password);
    }
  }, [user]);

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
  const success = (message) => {
    toast.success(message, {
      position: "top-center",
      autoClose: 1000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
    });
  };

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
        setImagePercentage(progress);
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
            name: name,
            email: email,
            // password: password,
            image: downloadURL,
          };
          console.log("USER TRYING ", user?._id);
          fetch(updateAUser(user?._id), {
            headers: headers,
            method: "PUT",
            body: JSON.stringify(object),
          })
            .then((response) => response.json())
            .then((response) => {
              console.log("USER UPDATED WITH", response);
              if (response.message == "success") {
                success("User details successfully updated!");
                dispatch(setLoggedInUser(response.user));
                setTimeout(() => {
                  props.onClick();
                }, 1500);
              }
            });
        });
      }
    );
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (name && email && user) {
      uploadVideo();
    } else {
      errorToast("Something went wrong, please try later");
    }
  };
  return (
    <>
      <div className="absolute top-0 left-0 w-full h-screen bg-gray-800/75 grid place-items-center">
        <div className="w-uploadVideo  z-50 ml-1 mr-2 sm:mx-0 sm:w-2/3  max-w-2xl bg-ytMilky dark:bg-ytBlack rounded-md p-4">
          <div className="text-right w-full bg-red-500 relative ">
            <IoMdCloseCircle
              className="text-3xl hover:scale-95 hover:cursor-pointer dark:text-white rounded-full absolute right-0 top-0"
              onClick={props.onClick}
            />
          </div>
          <h1 className="text-center text-2xl md:text-4xl font-medium leading-7 mt-6 mb-2 dark:text-white">
            Edit what we know about you
          </h1>
          <form action="" className="w-full" onSubmit={handleFormSubmit}>
            <input
              type="text"
              name="name"
              id="name"
              minLength={5}
              value={name}
              placeholder="Your name goes here ( Min: 5 characters )"
              required
              className="py-2 my-2 rounded-sm bg-ytMilky dark:bg-ytLightGray border border-slate-400 w-full text-ytBlack dark:text-white px-2"
              onChange={(e) => setName(e.target.value)}
            />
            <input
              type="email"
              name="email"
              id="email"
              value={email}
              placeholder="Your email goes here"
              required
              className="py-2 my-2 rounded-sm bg-ytMilky dark:bg-ytLightGray border border-slate-400 w-full text-ytBlack dark:text-white px-2"
              onChange={(e) => setEmail(e.target.value)}
            />
            {/* <input
              type="password"
              name="password"
              id="password"
              required
              minLength={5}
              value={password}
              placeholder="Your password goes here ( Min: 5 characters )"
              className="py-2 my-2 rounded-sm bg-ytMilky dark:bg-ytLightGray border border-slate-400 w-full text-ytBlack dark:text-white px-2"
              onChange={(e) => setPassword(e.target.value)}
            /> */}
            <div className="flex justify-between gap-4 items-center py-2 my-2 rounded-sm bg-ytMilky dark:bg-ytLightGray border w-full text-ytBlack dark:text-white px-2">
              <div>
                <h3>Profile picture</h3>
              </div>
              <div>
                {imagePercentage ? (
                  <span className="dark:text-white">
                    Uploading {Math.round(imagePercentage)}%
                  </span>
                ) : (
                  <input
                    type="file"
                    name="video"
                    id="video"
                    accept="image/*"
                    required
                    onChange={(e) => setFile(e.target.files[0])}
                    className="file:py-2 file:px-4
            file:rounded-full file:border-0
            file:text-sm file:font-semibold
            file:bg-ytGray file:text-white
            hover:file:bg-ytBlue file:hover:cursor-pointer inline-block mr-0"
                  />
                )}
              </div>
            </div>

            <input
              type="submit"
              value="Update"
              disabled={imagePercentage > 0 && imagePercentage < 100}
              className="block w-full py-2 mt-4 bg-ytBlue text-white hover:cursor-pointer"
            />
          </form>
        </div>
      </div>
      <ToastContainer />
    </>
  );
};

export default UpdateProfile;
