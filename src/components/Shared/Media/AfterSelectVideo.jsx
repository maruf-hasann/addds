import { FaTrash } from "react-icons/fa";
import { MdFileUpload } from "react-icons/md";

import { RxCross2 } from "react-icons/rx";

const AfterSelectVideo = ({ setState, videoPreview, isOpen, state }) => {
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

  //   handle add thumbnail
  const handleAddImage = async (e) => {
    e.preventDefault();
    let files = e.target.files;
    if (files.length > 0) {
      const selectedImage = files[0];
      setState((prev) => ({
        ...prev,
        thumbnail: selectedImage,
      }));

      const reader = new FileReader();
      reader.onload = () => {
        setState((prev) => ({
          ...prev,
          thumbnailPreview: reader.result,
        }));
      };
      reader.readAsDataURL(selectedImage);
    }
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
        } transition-opacity duration-300 ease-in-out flex items-center justify-center  `}
      >
        <div className="fixed inset-0 backdrop-filter backdrop-blur-sm"></div>
        <div
          className="bg-white rounded-md z-10  max-w-[1000px] w-full relative mx-1 h-full "
          
        >
          <div className="p-4 border-b py-6">
            <button
              onClick={() => handleCancel()}
              className="absolute top-3 right-3 text-gray-500 text-2xl bg-white hover:text-red-500"
            >
              <RxCross2 />
            </button>
          </div>

          <div
            className="p-8"
            
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
              {/* thumbnail */}
              <div>
                <h5 className="block mb-3 text-sm font-semibold outline-none text-gray-900 dark:text-white">
                  Thumbnail *
                </h5>
                {state.thumbnail && state.thumbnailPreview ? (
                  <div className="w-full border border-gray-300 p-2 relative max-h-80 h-full">
                    <img
                      src={state.thumbnailPreview}
                      alt="Thumbnail-image"
                      className="h-full object-cover mx-auto"
                    />
                    <button
                      onClick={() => {
                        setState((prev) => ({
                          ...prev,
                          thumbnail: null,
                          thumbnailPreview: null,
                        }));
                      }}
                      className="absolute top-2 right-2 text-red-500 text-2xl hover:text-red-500 border border-red-500 rounded-full bg-white"
                    >
                      <RxCross2 />
                    </button>
                  </div>
                ) : (
                  <div
                    onClick={() => {
                      const fileInput =
                        document.getElementById("input-type-image");
                      fileInput.click();
                    }}
                    className={`border border-gray-300 p-4 py-10 mt-2 text-center cursor-pointer w-full mx-auto max-h-80 h-full`}
                  >
                    <input
                      type="file"
                      accept="image/jpeg"
                      onChange={(e) => {
                        handleAddImage(e);
                      }}
                      id="input-type-image"
                      name="image"
                      className="hidden"
                    />
                    <div
                      className={`grid grid-cols-1  items-center justify-center gap-5`}
                    >
                      <div className="text-gray-400 text-4xl mx-auto">
                        <MdFileUpload
                          className={`text-[80px] text-gray-700 `}
                        />
                      </div>
                      <h2 className="font-bold text-xl text-gray-700">
                        Upload Photo
                      </h2>
                    </div>
                  </div>
                )}
              </div>

              <div className="flex justify-end mt-10">
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
