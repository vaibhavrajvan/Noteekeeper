import React, { useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import Error from "../../components/Error";
import Loading from "../../components/Loading/Loading";
import { useDispatch, useSelector } from "react-redux";
import { register } from "../../actions/userActions";

const SignupPage = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [image, setImage] = useState();

  const [message, setMessage] = useState(null);
  const [imageMessage, setImageMessage] = useState(null);

  const dispatch = useDispatch();
  const history = useHistory();

  const userRegister = useSelector((state) => state.userRegister);
  const { loading, error, userInfo } = userRegister;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo: userLoginInfo } = userLogin;

  useEffect(() => {
    if (userLoginInfo) history.push("/mynotes");
  }, [history, userInfo, userLoginInfo]);

  const submitHandler = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setMessage("Passwords do not match");
    } else {
      dispatch(register(name, email, password, image));
    }
  };

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

  return (
    <>
      {message && <Error message={message} />}
      {error && <Error message={error} />}
      {loading && <Loading />}
      {imageMessage && <Error message={imageMessage} />}
      <div className="flex mx-auto overflow-hidden mb-10 bg-slate-800 rounded-lg shadow-lg max-w-4xl">
        <div className="w-full px-6 py-6 md:px-8 ">
          <p className="text-xl font-bold text-center text-gray-600 dark:text-gray-200">
            Sign up here
          </p>

          <a
            href=" "
            className="flex items-center justify-center mt-4 text-gray-600 transition-colors duration-200 transform border rounded-lg dark:border-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-600"
          >
            <div className="px-4 py-2">
              <svg className="w-6 h-6" viewBox="0 0 40 40">
                <path
                  d="M36.3425 16.7358H35V16.6667H20V23.3333H29.4192C28.045 27.2142 24.3525 30 20 30C14.4775 30 10 25.5225 10 20C10 14.4775 14.4775 9.99999 20 9.99999C22.5492 9.99999 24.8683 10.9617 26.6342 12.5325L31.3483 7.81833C28.3717 5.04416 24.39 3.33333 20 3.33333C10.7958 3.33333 3.33335 10.7958 3.33335 20C3.33335 29.2042 10.7958 36.6667 20 36.6667C29.2042 36.6667 36.6667 29.2042 36.6667 20C36.6667 18.8825 36.5517 17.7917 36.3425 16.7358Z"
                  fill="#FFC107"
                />
                <path
                  d="M5.25497 12.2425L10.7308 16.2583C12.2125 12.59 15.8008 9.99999 20 9.99999C22.5491 9.99999 24.8683 10.9617 26.6341 12.5325L31.3483 7.81833C28.3716 5.04416 24.39 3.33333 20 3.33333C13.5983 3.33333 8.04663 6.94749 5.25497 12.2425Z"
                  fill="#FF3D00"
                />
                <path
                  d="M20 36.6667C24.305 36.6667 28.2167 35.0192 31.1742 32.34L26.0159 27.975C24.3425 29.2425 22.2625 30 20 30C15.665 30 11.9842 27.2359 10.5975 23.3784L5.16254 27.5659C7.92087 32.9634 13.5225 36.6667 20 36.6667Z"
                  fill="#4CAF50"
                />
                <path
                  d="M36.3425 16.7358H35V16.6667H20V23.3333H29.4192C28.7592 25.1975 27.56 26.805 26.0133 27.9758C26.0142 27.975 26.015 27.975 26.0158 27.9742L31.1742 32.3392C30.8092 32.6708 36.6667 28.3333 36.6667 20C36.6667 18.8825 36.5517 17.7917 36.3425 16.7358Z"
                  fill="#1976D2"
                />
              </svg>
            </div>

            <span className="w-5/6 px-4 py-3 font-bold text-center">
              Sign up with Google
            </span>
          </a>

          <div className="flex items-center justify-between mt-4">
            <span className="w-1/5 border-b dark:border-gray-600 lg:w-1/4"></span>

            <a
              href=" "
              className="text-xs text-center text-gray-500 uppercase dark:text-gray-400 hover:underline"
            >
              or Register with email
            </a>

            <span className="w-1/5 border-b dark:border-gray-400 lg:w-1/4"></span>
          </div>

          <form onSubmit={submitHandler}>
            <div className="flex justify-around space-x-4">
              {/* Name */}
              <div className="mt-4 w-full">
                <label
                  className="block mb-2 text-sm font-medium text-gray-600 dark:text-gray-200"
                  htmlFor="SignUpName"
                >
                  Name
                </label>
                <input
                  id="name"
                  className="block w-full px-4 py-2 text-gray-700 bg-white border rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>

              {/* Email */}
              <div className="mt-4 w-full">
                <label
                  className="block mb-2 text-sm font-medium text-gray-600 dark:text-gray-200"
                  htmlFor="SignUpEmailAddress"
                >
                  Email Address
                </label>
                <input
                  id="SignUpEmailAddress"
                  className="block w-full px-4 py-2 text-gray-700 bg-white border rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
            </div>

            <div className="flex justify-around space-x-4">
              {/* Password */}
              <div className="mt-4 w-full">
                <label
                  className="block mb-2 text-sm font-medium text-gray-600 dark:text-gray-200"
                  htmlFor="SignUpPassword"
                >
                  Password
                </label>
                <input
                  id="SignUpPassword"
                  className="block w-full px-4 py-2 text-gray-700 bg-white border rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>

              {/* Confirm Password */}
              <div className="mt-4 w-full">
                <label
                  className="block mb-2 text-sm font-medium text-gray-600 dark:text-gray-200"
                  htmlFor="SignUpConfirmPassword"
                >
                  Confirm Password
                </label>
                <input
                  id="SignUpConfirmPassword"
                  className="block w-full px-4 py-2 text-gray-700 bg-white border rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
              </div>
            </div>

            {/* Image */}
            <div className="mt-4 w-full">
              <label
                className="block mb-2 text-sm font-medium text-gray-600 dark:text-gray-200"
                htmlFor="SignUpImage"
              >
                Profile Image
              </label>
              <input
                id="SignUpImage"
                className="block w-full px-4 py-2 text-gray-700 bg-white border rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
                type="file"
                defaultValue={image}
                onChange={(e) => postDetails(e.target.files[0])}
              />
            </div>

            <div className="mt-8">
              <button className="w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-gray-700 rounded hover:bg-gray-600 focus:outline-none focus:bg-gray-600">
                Sign Up
              </button>
            </div>
          </form>

          <div className="flex items-center justify-between mt-4">
            <span className="w-1/5 border-b dark:border-gray-600 md:w-1/4"></span>

            <Link
              to="/login"
              className="text-xs text-gray-500 uppercase dark:text-gray-400 hover:underline"
            >
              or login
            </Link>

            <span className="w-1/5 border-b dark:border-gray-600 md:w-1/4"></span>
          </div>
        </div>
      </div>
    </>
  );
};

export default SignupPage;
