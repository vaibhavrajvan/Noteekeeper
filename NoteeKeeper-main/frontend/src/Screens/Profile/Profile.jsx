import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { updateUser } from "../../actions/userActions";
import Error from "../../components/Error";
import Loading from "../../components/Loading/Loading";

const Profile = () => {
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo: userLoginInfo } = userLogin;

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [image, setImage] = useState();

  const [message, setMessage] = useState(null);
  const [imageMessage, setImageMessage] = useState(null);

  const dispatch = useDispatch();
  const history = useHistory();

  const userUpdate = useSelector((state) => state.userUpdate);
  const { loading, error } = userUpdate;

  // console.log(loading, error, success);
  // console.log(name, email, image);

  useEffect(() => {
    if (!userLoginInfo) history.push("/");

    setName(userLoginInfo.name);
    setEmail(userLoginInfo.email);
    setImage(userLoginInfo.image);
  }, [history, userLoginInfo]);

  // image uploading
  const postDetails = (img) => {
    if (!img) {
      return setImageMessage("Please Select an Image");
    }

    setImageMessage(null);

    if (img.type === "image/jpeg" || img.type === "image/png") {
      const data = new FormData();
      data.append("file", img);
      data.append("upload_preset", "NoteKeeper");
      data.append("cloud_name", "dexter04");
      fetch("https://api.cloudinary.com/v1_1/dexter04/image/upload", {
        method: "post",
        body: data,
      })
        .then((res) => res.json())
        .then((data) => {
          // console.log("Image Data", data);
          setImage(data.url.toString());
        })
        .catch((err) => console.log(err));
    } else {
      return setImageMessage("Please Select any other Image");
    }
  };

  const updateHandler = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setMessage("Passwords do not match");
    } else {
      // console.log("Update ", name, email, password, image);
      dispatch(updateUser({ name, email, password, image }));
    }
  };

  return (
    <div className="relative bg-gray-100">
      {message && <Error message={message} />}
      {error && <Error message={error} />}
      {loading && <Loading />}
      {imageMessage && <Error message={imageMessage} />}
      <div className="w-full px-2 py-8 lg:px-8 text-black">
        {/* <h2 className="text-2xl font-semibold text-center text-gray-700 dark:text-white">
            Note Keeper
          </h2> */}

        <div className="flex items-center justify-between ">
          <span className="w-1/5 border-b dark:border-gray-600 lg:w-1/4"></span>

          <h1 href=" " className="text-lg text-center uppercase ">
            Update Your Profile
          </h1>

          <span className="w-1/5 border-b dark:border-gray-600 lg:w-1/4"></span>
        </div>

        <form onSubmit={updateHandler}>
          <div className="sm:flex  ">
            <div className="sm:w-1/2 ">
              {/* Name */}
              <div className="mt-4 w-full">
                <label
                  className="block mb-2 text-sm font-medium "
                  htmlFor="SignUpName"
                >
                  Name
                </label>
                <input
                  id="name"
                  className="block w-full px-4 py-2 text-white bg-white border rounded-md dark:bg-gray-800  dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>

              {/* Email */}
              <div className="mt-4 w-full">
                <label
                  className="block mb-2 text-sm font-medium "
                  htmlFor="SignUpEmailAddress"
                >
                  Email Address
                </label>
                <input
                  id="SignUpEmailAddress"
                  className="block w-full px-4 py-2 text-white bg-white border rounded-md dark:bg-gray-800  dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>

              {/* Password */}
              <div className="mt-4 w-full">
                <label
                  className="block mb-2 text-sm font-medium "
                  htmlFor="SignUpPassword"
                >
                  Password
                </label>
                <input
                  id="SignUpPassword"
                  className="block w-full px-4 py-2 text-white bg-white border rounded-md dark:bg-gray-800  dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>

              {/* Confirm Password */}
              <div className="mt-4 w-full">
                <label
                  className="block mb-2 text-sm font-medium "
                  htmlFor="SignUpConfirmPassword"
                >
                  Confirm Password
                </label>
                <input
                  id="SignUpConfirmPassword"
                  className="block w-full px-4 py-2 text-white bg-white border rounded-md dark:bg-gray-800  dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
              </div>

              {/* Image */}
              <div className="mt-4 w-full">
                <label
                  className="block mb-2 text-sm font-medium "
                  htmlFor="SignUpImage"
                >
                  Profile Image
                </label>
                <input
                  id="SignUpImage"
                  className="block w-full px-4 py-2 text-white bg-white border rounded-md dark:bg-gray-800  dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
                  type="file"
                  defaultValue={image}
                  onChange={(e) => postDetails(e.target.files[0])}
                />
              </div>
            </div>

            <div className="sm:w-1/2 sm:pt-10 sm:pl-5 pt-5 h-fit sm:mt-0 flex flex-col justify-center items-center">
              <div className="w-48 h-48 md:w-52 md:h-52 lg:w-72 lg:h-72 bg-fixed ">
                <img className="bg-gray-700" src={image} alt="ProfileImage" />
              </div>
            </div>
          </div>
          <div className="my-5 w-36">
            <button className="w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-gray-700 rounded hover:bg-gray-600 focus:outline-none focus:bg-gray-600">
              Update Profile
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Profile;
