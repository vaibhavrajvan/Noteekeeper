import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import { logout } from "../../actions/userActions";
import "./Header.css";

const Header = ({ setSearchQuery }) => {
  const history = useHistory();

  const dispatch = useDispatch();
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  // console.log(userInfo);

  const logoutHandler = () => {
    dispatch(logout());
    history.push("/");
  };

  return (
    <>
      {/* <!-- component --> */}
      <nav className="dark:bg-gray-800 shadow">
        <div className="container mx-auto px-6  py-3 md:flex md:justify-between md:items-center">
          <div className="flex justify-between items-center">
            <div>
              <Link
                className="text-gray-100 text-xl font-bold md:text-2xl hover:text-indigo-300"
                to="/"
              >
                Note Keeper
              </Link>
            </div>
            {userInfo ? (
              <div className="flex md:hidden flex-col md:flex-row md:mx-6">
                <Link
                  className="my-1 text-base text-gray-100 font-medium hover:text-indigo-300 md:mx-4 md:my-0"
                  to="/mynotes"
                >
                  My Notes
                </Link>
              </div>
            ) : (
              <Link
                className="  md:hidden my-1 text-sm text-gray-100 font-medium hover:text-indigo-500 md:mx-4 md:my-0"
                to="/login"
              >
                Login
              </Link>
            )}

            {/* Search input on desktop */}
            <div className="hidden mx-10 md:block">
              <div className="relative">
                <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                  <svg
                    className="w-5 h-5 text-gray-200"
                    viewBox="0 0 24 24"
                    fill="none"
                  >
                    <path
                      d="M21 21L15 15M17 10C17 13.866 13.866 17 10 17C6.13401 17 3 13.866 3 10C3 6.13401 6.13401 3 10 3C13.866 3 17 6.13401 17 10Z"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    ></path>
                  </svg>
                </span>

                <input
                  type="text"
                  className="w-full py-2 pl-10 pr-4 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
                  placeholder="Search"
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </div>
          </div>

          {userInfo ? (
            <div className="  md:flex items-center">
              <div className="md:flex hidden flex-col md:flex-row md:mx-6">
                <Link
                  className="my-1 text-base text-gray-100 font-medium hover:text-indigo-300 md:mx-4 md:my-0"
                  to="/mynotes"
                >
                  My Notes
                </Link>
              </div>

              <div className="mt-3 md:hidden">
                <div className="relative">
                  <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                    <svg
                      className="w-5 h-5 text-gray-400"
                      viewBox="0 0 24 24"
                      fill="none"
                    >
                      <path
                        d="M21 21L15 15M17 10C17 13.866 13.866 17 10 17C6.13401 17 3 13.866 3 10C3 6.13401 6.13401 3 10 3C13.866 3 17 6.13401 17 10Z"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      ></path>
                    </svg>
                  </span>

                  <input
                    type="text"
                    className="w-full py-2 pl-10 pr-4 text-gray-100 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
                    placeholder="Search here"
                  />
                </div>
              </div>

              {/* DropDown */}
              <div className="z-50 relative flex flex-col justify-center mx-auto mt-3 md:mt-0 ">
                <div className="flex items-center justify-center ">
                  <div className=" relative inline-block text-left dropdown">
                    <span className="rounded-md shadow-sm">
                      <button
                        className="inline-flex justify-center w-full px-4 py-2 text-sm font-medium leading-5 text-gray-700 transition duration-150 ease-in-out bg-white border border-gray-300 rounded-md hover:text-gray-500 focus:outline-none focus:border-blue-300 focus:shadow-outline-blue active:bg-gray-50 active:text-gray-800"
                        type="button"
                        aria-haspopup="true"
                        aria-expanded="true"
                        aria-controls="headlessui-menu-items-117"
                      >
                        <span className="font-bold">
                          {userInfo?.name.split(" ")[0]}
                        </span>
                        <svg
                          className="w-5 h-5 ml-2 -mr-1"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                        >
                          <path
                            fillRule="evenodd"
                            d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                            clipRule="evenodd"
                          ></path>
                        </svg>
                      </button>
                    </span>

                    <div className="opacity-0 invisible dropdown-menu transition-all duration-300 transform origin-top-right -translate-y-2 scale-95">
                      <div
                        className="absolute -right-3/4 md:right-0 w-56 mt-2 origin-top-right bg-white border border-gray-200 divide-y divide-gray-100 rounded-md shadow-lg outline-none"
                        aria-labelledby="headlessui-menu-button-1"
                        id="headlessui-menu-items-117"
                        role="menu"
                      >
                        <div className="px-4 py-3 ">
                          <p className="text-sm font-semibold leading-5">
                            Signed in as
                          </p>
                          <p className="text-sm font-medium leading-5 text-gray-900 truncate">
                            {userInfo?.email}
                          </p>
                        </div>
                        <div className="py-1 ">
                          <Link
                            to="/profile"
                            tabIndex="0"
                            className="text-gray-700 hover:bg-gray-200 flex justify-between w-full px-4 py-2 text-sm leading-5 text-left"
                            role="menuitem"
                          >
                            Account settings
                          </Link>
                          <a
                            href="https://github.com/Utqrsh04/NotesKeeper"
                            target="_blank"
                            rel="noreferrer"
                            tabIndex="1"
                            className="text-gray-700 hover:bg-gray-200 flex justify-between w-full px-4 py-2 text-sm leading-5 text-left"
                            role="menuitem"
                          >
                            Support
                          </a>
                        </div>
                        <div className="py-1 hover:bg-gray-200 rounded-b-md">
                          <a
                            href=" "
                            tabIndex="3"
                            onClick={logoutHandler}
                            className="text-gray-700 flex justify-between w-full px-4 py-2 text-sm leading-5 text-left"
                            role="menuitem"
                          >
                            Sign out
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <Link
              className=" hidden md:block my-1 text-sm text-gray-100 font-medium hover:text-indigo-500 md:mx-4 md:my-0"
              to="/login"
            >
              Login
            </Link>
          )}
        </div>
      </nav>
    </>
  );
};

export default Header;
