import React, { useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import "./LandingPage.css";

const LandingPage = () => {
  const history = useHistory();

  useEffect(() => {
    const userInfo = localStorage.getItem("userInfo");
    if (userInfo) {
      history.push("/mynotes");
    }
  }, [history]);

  return (
    <div className="relative bg-gray-100 overflow-hidden">
      <main className="mt-10 mx-auto max-w-7xl px-4 sm:mt-12 sm:px-6 md:mt-16 lg:mt-20 lg:px-8 xl:mt-28">
        <div className="text-center ">
          <h1 className="text-4xl tracking-tight font-extrabold text-gray-900 sm:text-5xl md:text-6xl">
            <span className="block xl:inline">Welcome to</span>{" "}
            <span className="block text-indigo-600 xl:inline">Note Keeper</span>
          </h1>
          <p className="mt-3 text-base text-center  text-gray-500 sm:mt-5 sm:text-lg sm:max-w-xl sm:mx-auto md:mt-5 md:text-xl lg:mx-auto">
            One safe place for all your notes.
          </p>
          <div className="m-5 sm:mt-8 sm:flex sm:justify-center  ">
            <Link to="/login" className="rounded-md shadow">
              <div className="w-full flex items-center justify-center px-8 py-2 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-indigo-700 md:py-3 md:text-lg md:px-10">
                Login
              </div>
            </Link>

            <Link to="/signup" className="mt-3 sm:mt-0 sm:ml-3">
              <div className="w-full mt-4 sm:mt-0 flex items-center justify-center px-8 py-2 border border-transparent text-base font-medium rounded-md text-indigo-700 bg-indigo-200 hover:bg-indigo-200 md:py-3 md:text-lg md:px-10">
                Register
              </div>
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
};

export default LandingPage;
