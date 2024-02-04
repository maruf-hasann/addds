import { useState } from "react";
import toast from "react-hot-toast";
import { ImSpinner10 } from "react-icons/im";
import BeforeSelectPhoto from "./BeforeSelectPhoto";
import AfterSelectPhoto from "./AfterSelectPhoto";
import { useUploadSingleImageMutation } from "../../../../../store/service/tutorInfo/promotion/promotionApiService";

const PhotoUpload = ({ number, setNumber, numberError }) => {
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
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
    image: false,
  });

  const [uploadSingleVideo, { isLoading }] = useUploadSingleImageMutation();

  //   handle add video
  const handleAddPhoto = (e) => {
    e.preventDefault();
    e.stopPropagation(); // Prevents further propagation of the current event.

    let files;
    if (e.type === "drop" || e.type === "dragover") {
      files = e.dataTransfer.files;
    } else {
      files = e.target.files;
    }

    if (files.length > 0) {
      const selectedImage = files[0];
      setImage(selectedImage);
      const reader = new FileReader();
      reader.onload = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(selectedImage);
      setIsDraggingOver(false);
      const titleWithoutExtension = selectedImage.name.split(".")[0];
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
    if (!image) return setErrors({ ...errors, image: true });

    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append("image", image);
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
        image: false,
      });
      setImage(null);
      setImagePreview(null);
      setTitle("");
      setDescription("");
    } else {
      toast.error(result.error?.data?.message || "Something went wrong");
    }
  };

  const handleClearForm = () => {
    setImage(null);
    setImagePreview(null);
    setTitle("");
    setDescription("");
  };

  return (
    <div className="bg-white rounded-md z-10   w-full relative mx-1">
      {image && imagePreview ? (
        <AfterSelectPhoto
          description={description}
          errors={errors}
          imagePreview={imagePreview}
          isPublished={isPublished}
          setDescription={setDescription}
          setIsPublished={setIsPublished}
          setTitle={setTitle}
          title={title}
          number={number}
          setNumber={setNumber}
          numberError={numberError}
        />
      ) : (
        <BeforeSelectPhoto
          handleAddPhoto={handleAddPhoto}
          handleDragEnter={handleDragEnter}
          handleDragLeave={handleDragLeave}
          isDraggingOver={isDraggingOver}
        />
      )}

      {image && imagePreview && (
        <div className="px-4 py-1 absolute flex justify-end items-center gap-5 w-full bottom-0 bg-white ">
          <span
            onClick={handleClearForm}
            className=" text-red-500 border border-red-500 h-8 w-28 flex justify-center items-center uppercase font-semibold cursor-pointer"
          >
            Clear
          </span>
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
  );
};

export default PhotoUpload;
