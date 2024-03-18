import { FaTrash } from "react-icons/fa";

import { RxCross2 } from "react-icons/rx";

const AfterSelectVideo = ({ setState, videoPreview, isOpen }) => {
  const handleCancel = () => {
    setState((prev) => ({
      ...prev,
      media: null,
      mediaPreview: null,
      mediaModalOpen: false,
      mediaType: null,
      thumbnail: null,
      thumbnailPreview: null,
    }));
  };

  const handleSave = () => {
    setState((prev) => ({
      ...prev,
      mediaModalOpen: false,
    }));
  };

  return (
    <>
      <div
        className={`fixed inset-0 z-50 ${
          isOpen ? "opacity-100 visible" : "opacity-0 invisible"
        } transition-opacity duration-300 ease-in-out flex items-center justify-center `}
      >
        <div className="fixed inset-0 backdrop-filter backdrop-blur-sm"></div>
        <div className="bg-white rounded-md z-10  w-full max-w-5xl  max-h-full mt-[8vh] relative mx-1 border">
          <div className="p-4 border-b py-6">
            <button
              onClick={() => handleCancel()}
              className="absolute top-3 right-3 text-gray-500 text-2xl bg-white hover:text-red-500"
            >
              <RxCross2 />
            </button>
          </div>

          <div
            className="p-8 overflow-y-auto"
            style={{ height: "calc(100vh - 120px)" }}
          >
            <div className="grid grid-cols-1  gap-5">
              <div className="border p-1 relative">
                <video
                  controls
                  width="100%"
                  className="w-auto max-h-80 mx-auto"
                >
                  <source src={videoPreview} type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
                <div
                  onClick={() => {
                    setState((prev) => ({
                      ...prev,
                      media: null,
                      mediaPreview: null,
                      mediaType: null,
                    }));
                  }}
                  className="border border-red-400 text-red-400 hover:text-red-500 hover:border-red-500 absolute top-3 right-3 rounded-full bg-white cursor-pointer"
                >
                  <FaTrash className="size-5 m-2" />
                </div>
              </div>

              <div className="flex justify-end">
                <button
                  onClick={() => handleSave()}
                  className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring focus:border-blue-300"
                >
                  Save
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AfterSelectVideo;
