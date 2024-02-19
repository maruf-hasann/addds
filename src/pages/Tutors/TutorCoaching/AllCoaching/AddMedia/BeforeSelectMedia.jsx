import React from "react";
import { MdFileUpload } from "react-icons/md";

const BeforeSelectMedia = ({
  handleDragEnter,
  handleDragLeave,
  handleAddMedia,
  isDraggingOver,
}) => {
  return (
    <div
      style={{ height: "calc(100vh - 170px)" }}
      className={`p-4 flex flex-col gap-5 items-center justify-center`}
      onDragOver={handleDragEnter}
      onDragEnter={handleDragEnter}
      onDragLeave={handleDragLeave}
      onDrop={handleAddMedia}
    >
      <input
        type="file"
        accept="video/mp4, image/png"
        onChange={(e) => handleAddMedia(e)}
        id="input-type-media"
        name="media"
        className="hidden"
      />
      <div
        onClick={() => {
          const fileInput = document.getElementById("input-type-media");
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
        <p className="text-center ">Drag and drop media files to upload</p>
        <p className="text-center text-sm">
          Your media will be private until you publish them.
        </p>
      </div>
      <button
        onClick={() => {
          const fileInput = document.getElementById("input-type-media");
          fileInput.click();
        }}
        className="uppercase px-4 py-[6px] bg-primary text-white"
      >
        Select files
      </button>
    </div>
  );
};

export default BeforeSelectMedia;
