import React from "react";

const Footer = () => {
  return (
    <footer className="bg-white fixed w-full bottom-0 dark:bg-gray-800">
      <div className="container px-6 py-4 mx-auto">
        <div className="flex flex-col items-center sm:flex-row sm:justify-between">
          <p className="text-sm text-gray-400">
            © Copyright 2022. All Rights Reserved.
          </p>
          <p className="text-white">
            Made with ♥ by{" "}
            <a
              href="https://github.com/utqrsh04"
              target="_blank"
              rel="noreferrer"
              className="underline text-red-400"
            >
              Utkarsh
            </a>
          </p>
          <div className="flex mt-1 -mx-2 sm:mt-0">
            <a
              href=" "
              className="mx-2 text-sm text-gray-400 hover:text-gray-500 dark:hover:text-gray-300"
              aria-label="Reddit"
            >
              Privacy
            </a>
            <a
              href=" "
              className="mx-2 text-sm text-gray-400 hover:text-gray-500 dark:hover:text-gray-300"
              aria-label="Reddit"
            >
              Cookies
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
