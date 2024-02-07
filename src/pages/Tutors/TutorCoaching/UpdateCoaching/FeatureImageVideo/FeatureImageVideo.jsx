import { useState } from "react";
import { FaTrash } from "react-icons/fa";
import { MdFileUpload } from "react-icons/md";
import ReactPlayer from "react-player";

const FeatureImageVideo = ({ initialState, setInitialState, customErrors }) => {
  const [isDraggingOver, setIsDraggingOver] = useState(false);

  //   handle add video
  const handleAddMedia = (e) => {
    e.preventDefault();
    e.stopPropagation(); // Prevents further propagation of the current event.

    let files;
    if (e.type === "drop" || e.type === "dragover") {
      files = e.dataTransfer.files;
    } else {
      files = e.target.files;
    }

    if (files.length > 0) {
      const selectedMedia = files[0];

      const fileExtension = selectedMedia.name.split(".").pop().toLowerCase();

      const reader = new FileReader();
      reader.onload = () => {
        setInitialState({
          ...initialState,
          featuredMedia: selectedMedia,
          featuredMediaExtension: fileExtension,
          featuredMediaPreview: reader.result,
        });
      };
      reader.readAsDataURL(selectedMedia);
      setIsDraggingOver(false);
    }
  };

  const handleDragEnter = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDraggingOver(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDraggingOver(false);
  };

  return (
    <div>
      <label className="block mb-3 text-sm font-semibold outline-none text-gray-900 dark:text-white">
        Featured Image/Video *
      </label>
      <div className="p-4 border relative">
        {(initialState?.featuredMedia || initialState?.featuredMediaUrl) &&
        initialState?.featuredMediaPreview ? (
          <div className="w-full h-72">
            {initialState?.featuredMediaExtension === "jpg" ? (
              <img
                src={initialState?.featuredMediaPreview}
                className="object-cover rounded-md h-full mx-auto "
              />
            ) : (
              <div className="flex justify-center h-full w-full">
                <ReactPlayer
                  controls
                  url={[initialState?.featuredMediaPreview]}
                  height={"100%"}
                  width={"auto"}
                />
              </div>
            )}
          </div>
        ) : (
          <div
            className={`flex flex-col gap-5 items-center justify-center`}
            onDragOver={handleDragEnter}
            onDragEnter={handleDragEnter}
            onDragLeave={handleDragLeave}
            onDrop={handleAddMedia}
          >
            <input
              type="file"
              accept="image/jpeg, video/mp4"
              onChange={(e) => handleAddMedia(e)}
              id="input-type"
              name="media"
              className="hidden"
            />

            <div
              onClick={() => {
                const fileInput = document.getElementById("input-type");
                fileInput.click();
              }}
              className={`h-36 w-36 flex items-center justify-center bg-gray-100 rounded-full cursor-pointer transition `}
            >
              <MdFileUpload
                className={`text-[80px] text-gray-700 ${
                  isDraggingOver ? "animate-pulse" : ""
                }`}
              />
            </div>
            <div>
              <p className="text-center ">
                Drag and drop media files to upload
              </p>
            </div>
            <span
              onClick={() => {
                const fileInput = document.getElementById("input-type");
                fileInput.click();
              }}
              className="uppercase px-4 py-[6px] bg-primary text-white cursor-pointer"
            >
              Select files
            </span>
          </div>
        )}
        {(initialState?.featuredMedia || initialState?.featuredMediaUrl) &&
        initialState?.featuredMediaPreview ? (
          <span
            onClick={() => {
              setInitialState({
                ...initialState,
                featuredMedia: null,
                featuredMediaExtension: null,
                featuredMediaPreview: null,
                featuredMediaUrl: null,
              });
            }}
            className="absolute top-2 right-2 text-red-400 text-xl bg-white hover:text-white border border-red-400 hover:border-red-500 hover:bg-red-500 p-2 rounded-full cursor-pointer"
          >
            <FaTrash />
          </span>
        ) : (
          ""
        )}
      </div>
      {(!initialState?.featuredMedia || !initialState?.featuredMediaUrl) &&
        customErrors?.featuredMedia && (
          <p className="text-red-500 text-sm absolute">
            {customErrors.featuredMedia}
          </p>
        )}
    </div>
  );
};

export default FeatureImageVideo;
