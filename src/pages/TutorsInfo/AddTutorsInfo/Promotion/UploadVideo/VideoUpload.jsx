import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { RxCross2 } from "react-icons/rx";

import { ImSpinner10 } from "react-icons/im";
import AfterSelectVideo from "./AfterSelectVideo";
import BeforeSelectVideo from "./BeforeSelectVideo";
import { useUploadSingleVideoMutation } from "../../../../../store/service/tutorInfo/promotion/promotionApiService";

const VideoUpload = ({ number, setNumber, numberError }) => {
  const [video, setVideo] = useState(null);
  const [videoPreview, setVideoPreview] = useState(null);
  const [thumbnail, setThumbnail] = useState(null);
  const [thumbnailPreview, setThumbnailPreview] = useState(null);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [isDraggingOver, setIsDraggingOver] = useState(false);
  const [isPublished, setIsPublished] = useState({
    facebook: false,
    instagram: false,
    tiktok: false,
    youtube: false,
  });
  const [errors, setErrors] = useState({
    title: false,
    description: false,
    thumbnail: false,
  });

  const [uploadSingleVideo, { isLoading }] = useUploadSingleVideoMutation();

  //   handle add video
  const handleAddVideo = (e) => {
    e.preventDefault();
    e.stopPropagation(); // Prevents further propagation of the current event.

    let files;
    if (e.type === "drop" || e.type === "dragover") {
      files = e.dataTransfer.files;
    } else {
      files = e.target.files;
    }

    if (files.length > 0) {
      const selectedVideo = files[0];
      setVideo(selectedVideo);
      const videoUrl = URL.createObjectURL(selectedVideo);
      setVideoPreview(videoUrl);
      setIsDraggingOver(false);
      const titleWithoutExtension = selectedVideo.name.split(".")[0];
      setTitle(titleWithoutExtension);
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

  //   handle submit
  const handleSubmit = async (e) => {
    e?.preventDefault();
    if (numberError) return toast.error("Please enter a valid number");
    if (!title) return setErrors({ ...errors, title: true });
    if (!description) return setErrors({ ...errors, description: true });
    if (!thumbnail) return setErrors({ ...errors, thumbnail: true });

    const formData = new FormData();
    formData.append("video", video);
    formData.append("title", title);
    formData.append("description", description);
    formData.append("image", thumbnail);
    formData.append("isFacebook", isPublished?.facebook ? "yes" : "no");
    formData.append("isInstagram", isPublished?.instagram ? "yes" : "no");
    formData.append("isTiktok", isPublished?.tiktok ? "yes" : "no");
    formData.append("isYoutube", isPublished?.youtube ? "yes" : "no");

    const result = await uploadSingleVideo({
      number: number?.substring(1),
      data: formData,
    });
    if (result?.data?.success) {
      toast.success(result?.data?.message);
      setIsPublished({
        facebook: false,
        instagram: false,
        tiktok: false,
        youtube: false,
      });
      setErrors({
        title: false,
        description: false,
        thumbnail: false,
      });
      setVideo(null);
      setVideoPreview(null);
      setThumbnail(null);
      setThumbnailPreview(null);
      setTitle("");
      setDescription("");
    } else {
      toast.error(result.error?.data?.message || "Something went wrong");
    }
  };

  const handleClearForm = () => {
    setVideo(null);
    setVideoPreview(null);
    setThumbnail(null);
    setThumbnailPreview(null);
    setTitle("");
    setDescription("");
  };

  return (
    <div className="bg-white rounded-md z-10  w-full relative mx-1">
      {video && videoPreview ? (
        <AfterSelectVideo
          setThumbnailPreview={setThumbnailPreview}
          thumbnailPreview={thumbnailPreview}
          thumbnail={thumbnail}
          setThumbnail={setThumbnail}
          videoPreview={videoPreview}
          isPublished={isPublished}
          setIsPublished={setIsPublished}
          title={title}
          setTitle={setTitle}
          description={description}
          setDescription={setDescription}
          errors={errors}
          number={number}
          setNumber={setNumber}
          numberError={numberError}
        />
      ) : (
        <BeforeSelectVideo
          handleAddVideo={handleAddVideo}
          handleDragEnter={handleDragEnter}
          handleDragLeave={handleDragLeave}
          isDraggingOver={isDraggingOver}
        />
      )}

      {video && videoPreview && (
        <div className="px-4 py-1 absolute flex justify-end items-center gap-5 w-full bottom-0 bg-white">
          <span
            onClick={handleClearForm}
            className=" text-red-500 border border-red-500 h-8 w-28 flex justify-center items-center uppercase font-semibold cursor-pointer"
          >
            Clear
          </span>
          <button
            onClick={handleSubmit}
            disabled={isLoading}
            className="bg-primary border border-primary text-white h-8 w-28 flex justify-center items-center uppercase font-semibold"
          >
            {isLoading ? (
              <ImSpinner10 className="text-xl animate-spin" />
            ) : (
              "Save"
            )}
          </button>
        </div>
      )}
    </div>
  );
};

export default VideoUpload;
