import React from "react";
import ReactHtmlParser from "react-html-parser";
import { FaRegCircleXmark } from "react-icons/fa6";
import { FaPhoneAlt } from "react-icons/fa";
import { MdOutlineAlternateEmail } from "react-icons/md";
const DetailsBlog = ({ setDetailsModal, detailsModal, blog }) => {

  // handle close modal
  const handleClose = () => {
    setDetailsModal(!detailsModal);
  };

  return (
    <div
      className={`fixed  top-0 left-0 z-50  p-4  overflow-x-hidden overflow-y-auto inset-0 h-[calc(100%)] max-h-full backdrop-blur-sm ${
        detailsModal ? "block" : "hidden"
      }`}
    >
      <div
        className="w-full h-full z-0 absolute top-0 left-0"
        onClick={handleClose}
      ></div>
      <div className="relative z-50 w-full max-w-5xl  max-h-full mt-[20vh] mx-auto  lg:w-1/2 md:px-0">
        <div
          className={`relative  rounded-lg shadow text-primary  bg-white bottom-[100px] py-2`}
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
              <h3 className="font-semibold mb-2">User Information</h3>
              {/* user Info */}
              <div className="mb-6 mt-3">
                <img
                  src={blog?.authorProfileImage}
                  className="w-[70px] h-[70px] rounded-full ring-4 ring-primary"
                />
                <h4 className="font-semibold mt-4 "> {blog?.user?.fullName}</h4>
                <h4 className="">Role : {blog?.user?.role}</h4>
                <h4 className="flex  items-center gap-2 ">
                  <FaPhoneAlt /> {"+" + blog?.user?.phoneNumber}
                </h4> <h4 className="flex  items-center gap-2 ">
                  <MdOutlineAlternateEmail />  { blog?.user?.email}
                </h4>
              </div>
              <img src={blog?.imageUrl} className="w-full h-auto rounded-md" />
              <h3 className="font-semibold text-xl mt-3 text-black">
                {blog?.title}
              </h3>

              <p className="text-xl mb-10 dark:text-gray-400 ">
                {ReactHtmlParser(blog?.description)}
              </p>
            </div>
          </>
        </div>
      </div>
    </div>
  );
};

export default DetailsBlog;
