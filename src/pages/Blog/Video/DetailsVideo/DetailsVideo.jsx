import React from 'react';
import { FaRegCircleXmark } from 'react-icons/fa6';
import ReactPlayer from "react-player";

const DetailsVideo = ({ detailsModal, setDetailsModal, detailsData }) => {

  // handle close modal
  const handleClose = () => {
    setDetailsModal(!detailsModal);
  };

  return (
    <div
      className={`fixed  top-0 left-0 z-50  p-4  overflow-x-hidden overflow-y-auto inset-0 h-[calc(100%)]  max-h-full backdrop-blur-sm ${
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
            <div className="px-7 py-10 text-black mt-6 ">
              <div>
                <ReactPlayer
                  width="100%"
                  url={`https://www.youtube.com/watch?v=${detailsData?.videoURL}`}
                />
              </div>
              <h4 className="font-semibold mt-6 mb-2 text-xl">{detailsData?.title}</h4>
              <p className="text-gray-700">{detailsData?.description}</p>
            </div>
          </>
        </div>
      </div>
    </div>
  );
};

export default DetailsVideo;