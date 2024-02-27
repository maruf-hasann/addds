import React from "react";
import { FaRegCircleXmark } from "react-icons/fa6";
import BlogShareButton from "./BlogShareButton";

const ShareModal = ({ setShareModal, shareModal ,slug }) => {
  // handle close modal
  const handleClose = () => {
    setShareModal(!shareModal);
  };
  return (
    <div
      className={`fixed  top-[50%] left-[60%] z-50  p-4  overflow-x-hidden overflow-y-auto inset-0 h-[calc(100%)]  max-h-full backdrop-blur-sm ${
        shareModal ? "block" : "hidden"
      }`}
    >
      <div
        className="w-full h-full z-0 absolute top-0 left-0"
        onClick={handleClose}
      ></div>
      <div className="relative z-50 w-full max-w-5xl  max-h-full mt-[20vh] mx-auto  lg:w-1/2 md:px-0">
        <div
          className={`relative  rounded-lg shadow text-primary border-primary border-[1px]  bg-white bottom-[100px] py-2`}
        >
          {/* modal close button */}
          <button
            onClick={handleClose}
            type="button"
            className="absolute top-3 right-2.5  rounded-lg text-sm p-1.5 ml-auto inline-flex items-center"
          >
            <FaRegCircleXmark className="text-3xl text-red-400 hover:text-red-500" />
          </button>
          <>
            <div className=" px-14 mx-auto py-4 mt-5 bg-white text-black">
              <BlogShareButton slug={slug} />
            </div>
          </>
        </div>
      </div>
    </div>
  );
};

export default ShareModal;
