import { useState } from "react";
import { RxCross2 } from "react-icons/rx";
import { ImSpinner10 } from "react-icons/im";
import toast from "react-hot-toast";

import BeforeSelectMedia from "./BeforeSelectMedia";
import AfterSelectVideo from "./AfterSelectVideo";
import AfterSelectPhoto from "./AfterSelectPhoto";
import { useUploadCoachingSingleImageMutation, useUploadCoachingSingleVideoMutation } from "../../../../../store/service/tutorInfo/coaching/coachingApiService";


const AddMedia = ({ isOpen, setIsOpen, coaching, setCoaching }) => {
  const [isDraggingOver, setIsDraggingOver] = useState(false);
  const [mediaType, setMediaType] = useState(null);
  const [media, setMedia] = useState(null);
  const [mediaPreview, setMediaPreview] = useState(null);
  const [thumbnail, setThumbnail] = useState(null);
  const [thumbnailPreview, setThumbnailPreview] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const [isPublished, setIsPublished] = useState({
    facebook: false,
    instagram: false,
    tiktok: false,
    youtube: false,
  });

  const [addCoachingMediaImage] = useUploadCoachingSingleImageMutation();
  const [addCoachingMediaVideo] = useUploadCoachingSingleVideoMutation();

  //   handle add media
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
      const mediaUrl = URL.createObjectURL(selectedMedia);

      const mediaType = selectedMedia.type; // Get the MIME type

      if (mediaType.startsWith("image/")) {
        setMediaType("image");
        const reader = new FileReader();
        reader.onload = () => {
          setMediaPreview(reader.result);
        };
        reader.readAsDataURL(selectedMedia);
        setIsDraggingOver(false);
      } else if (mediaType.startsWith("video/")) {
        setMediaType("video");
        setMediaPreview(mediaUrl);
        setIsDraggingOver(false);
      }
      setMedia(selectedMedia);
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
    setIsLoading(true);
    const formData = new FormData();
    let uploadFunction;

    if (mediaType === "video") {
      formData.append("video", media);
      formData.append("image", thumbnail);
      uploadFunction = addCoachingMediaVideo;
    } else {
      formData.append("image", media);
      uploadFunction = addCoachingMediaImage;
    }

    formData.append("title", coaching?.title);
    formData.append("description", coaching?.aboutCoaching);
    formData.append("isFacebook", isPublished?.facebook ? "yes" : "no");
    formData.append("isInstagram", isPublished?.instagram ? "yes" : "no");
    formData.append("isTiktok", isPublished?.tiktok ? "yes" : "no");
    formData.append("isYoutube", isPublished?.youtube ? "yes" : "no");
    formData.append("coachingId", coaching?.coachingId);

    const result = await uploadFunction({
      number: coaching?.phoneNumber,
      data: formData,
    });

    if (result?.data?.success) {
      toast.success(result?.data?.message);
      setIsOpen(false);
      setCoaching(null);
      setMediaType(null);
      setMedia(null);
      setMediaPreview(null);
      setThumbnail(null);
      setThumbnailPreview(null);
      setIsLoading(false);
    } else {
      toast.error(result?.error?.data?.message || "something went wrong");
      setIsLoading(false);
    }
  };

  return (
    <>
      <div
        className={`fixed inset-0 top-20 z-50 ${
          isOpen ? "opacity-100 visible" : "opacity-0 invisible"
        } transition-opacity duration-300 ease-in-out flex items-center justify-center `}
      >
        <div className="fixed inset-0 backdrop-filter backdrop-blur-sm"></div>
        <div
          className="bg-white rounded-md z-10  max-w-[1000px] w-full relative mx-1 border"
          style={{ height: "calc(100vh - 120px)" }}
        >
          <div className="p-4 border-b">
            <div className="overflow-hidden">
              <p
                className={`font-semibold whitespace-nowrap ${
                  !coaching?.title && "h-5"
                }`}
              >
                {coaching?.title}{" "}
              </p>
            </div>{" "}
            <button
              onClick={() => setIsOpen(false)}
              className="absolute top-4 right-4 text-gray-500 text-2xl bg-white hover:text-red-500"
            >
              <RxCross2 />
            </button>
          </div>

          {mediaType === "image" ? (
            <AfterSelectPhoto
              imagePreview={mediaPreview}
              isPublished={isPublished}
              setImage={setMedia}
              setImagePreview={setMediaPreview}
              setIsPublished={setIsPublished}
              setMediaType={setMediaType}
            />
          ) : (
            ""
          )}

          {mediaType === "video" ? (
            <AfterSelectVideo
              isPublished={isPublished}
              setIsPublished={setIsPublished}
              setMediaType={setMediaType}
              setThumbnail={setThumbnail}
              setThumbnailPreview={setThumbnailPreview}
              setVideo={setMedia}
              setVideoPreview={setMediaPreview}
              thumbnail={thumbnail}
              thumbnailPreview={thumbnailPreview}
              videoPreview={mediaPreview}
            />
          ) : (
            ""
          )}

          {!mediaType && (
            <BeforeSelectMedia
              handleAddMedia={handleAddMedia}
              handleDragEnter={handleDragEnter}
              handleDragLeave={handleDragLeave}
              isDraggingOver={isDraggingOver}
            />
          )}

          {media && mediaPreview && (
            <div className="px-4 py-1 border-b absolute flex justify-end w-full bottom-0 backdrop-filter backdrop-blur-sm border-t">
              <button
                onClick={handleSubmit}
                className="bg-primary text-white h-8 w-28 flex justify-center items-center uppercase font-semibold"
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
      </div>
    </>
  );
};

export default AddMedia;
