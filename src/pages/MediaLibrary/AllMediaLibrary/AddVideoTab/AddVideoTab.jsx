import React, { useState } from "react";
import { MdCloudUpload } from "react-icons/md";
import { Button, Input } from "@material-tailwind/react";
import { useUploadMediaMutation } from "../../../../store/service/mediaLibrary/mediaLibraryApiService";
import toast from "react-hot-toast";

export const AddVideoTab = () => {
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [videoTitle, setVideoTitle] = useState("");

  const [uploadMedia] = useUploadMediaMutation();

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file && file.type.startsWith("video/")) {
      setSelectedVideo(file);
    } else {
      console.error("Please select a valid video file.");
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();

    const file = e.dataTransfer.files[0];
    if (file && file.type.startsWith("video/")) {
      setSelectedVideo(file);
    } else {
      console.error("Please drop a valid video file.");
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleClearSelection = () => {
    setSelectedVideo(null);
  };

  const handleVideoUpload = async (e) => {
    e.preventDefault();

    if (selectedVideo) {
      const formData = new FormData();
      formData.append("media", selectedVideo);
      formData.append("title", videoTitle);
      formData.append("type", "video");

      try {
        await uploadMedia(formData);
        toast.success("Video uploaded successfully!");
        setSelectedVideo(null);
      } catch (error) {
        console.error("Error uploading video:", error);
      }
    } else {
      toast.error("No video selected for upload.");
    }
  };

  return (
    <form onSubmit={handleVideoUpload}>
      <div className="my-5 lg:w-1/2">
        <Input
          variant="outlined"
          label="Video Title"
          required
          onChange={(e) => setVideoTitle(e.target.value)}
        />
      </div>
      {!selectedVideo ? (
        <div
          className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center cursor-pointer my-10"
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          onClick={() => {
            const fileInput = document.getElementById("video-file-input");
            fileInput.click();
          }}
        >
          <input
            type="file"
            accept="video/*"
            onChange={handleFileChange}
            id="video-file-input"
            className="hidden"
          />
          <label htmlFor="video-file-input" className="cursor-pointer">
            <div
              className={`grid grid-cols-1 items-center justify-center gap-5`}
            >
              <div className="text-gray-400 text-7xl mx-auto">
                <MdCloudUpload />
              </div>
              <p className="font-bold">
                Drag and drop a video here <br /> or <br /> click to select a
                video
              </p>
            </div>
          </label>
        </div>
      ) : (
        <div className="flex flex-col items-center gap-2">
          <video
            src={URL.createObjectURL(selectedVideo)}
            controls
            className="max-w-full h-auto rounded-lg"
          />
          <button
            type="button"
            onClick={handleClearSelection}
            className="bg-red-500 text-white px-3 py-1 rounded-md"
          >
            Clear Selection
          </button>
        </div>
      )}

      <div className="flex justify-end mt-20">
        <Button type="submit">Upload Video</Button>
      </div>
    </form>
  );
};
