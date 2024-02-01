import React from "react";
import { useForm } from "react-hook-form";
import { FaRegCircleXmark } from "react-icons/fa6";
import { Button, Tooltip } from "@material-tailwind/react";
import { AiOutlineInfoCircle } from "react-icons/ai";
import toast from "react-hot-toast";
import { useAddVideoMutation } from "../../../../store/service/blogVideo/blogVideoApiService";
import { FaSpinner } from "react-icons/fa";

const AddVideo = ({ modalOpen, setModalOpen }) => {
  // redux api
  const [addVideo, { isLoading }] = useAddVideoMutation();
  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm();

  /* Handle validated is youtube url or not */
  const handleValidationUrl = async (url) => {
    const youtubeRegex =
      /^(https?:\/\/)?(www\.)?(youtube\.com\/(watch\?v=|embed\/|v\/|shorts\/)|youtu\.be\/)([a-zA-Z0-9_-]{11})(\S+)?$/;
    if (youtubeRegex.test(url)) {
      return 1;
    } else {
      return 0;
    }
  };
  /* Get youtube video id */
  const extractYouTubeVideoId = (url) => {
    const youtubeRegex = /[?&]v=([^&]+)/;
    const match = url.match(youtubeRegex);

    if (match) {
      const videoId = match[1];
      return videoId;
    } else {
      return 0; // No match found
    }
  };
  // from data
  const onSubmit = async (data) => {
    const isValidUrl = await handleValidationUrl(data?.url);
    /* Checking url validation */
    if (!isValidUrl) {
      toast.error("Please provide valid YouTube video URL");
      return;
    }
    const videoId = extractYouTubeVideoId(data?.url);
    if (videoId) {
      const videoData = {
        title: data.title,
        videoURL: videoId,
        description: data.shortDescription,
      };
      const result = await addVideo(videoData);
      if (result?.data?.success) {
        toast.success(result?.data?.message);
        setModalOpen(false);
        reset();
      } else {
        toast.error(result?.error?.data?.message);
      }
    } else {
      toast.error("Something's Wrong! ");
    }
  };
  // handle close modal
  const handleClose = () => {
    setModalOpen(!modalOpen);
  };
  return (
    <div
      className={`fixed top-0 left-0 z-50 p-4 overflow-x-hidden overflow-y-auto inset-0 h-[calc(100%)] max-h-full backdrop-blur-sm ${
        modalOpen ? "block" : "hidden"
      }`}
    >
      <div
        className="w-full h-full z-0 absolute top-0 left-0"
        onClick={handleClose}
      ></div>
      <div className="relative z-50 w-full max-w-5xl  max-h-full mt-[20vh] mx-auto px-2 md:w-1/2 lg:w-1/3 md:px-0">
        <div
          className={`relative  rounded-lg shadow text-primary px-10 bg-white`}
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
            <div className="py-10">
              <div className="flex justify-between items-center mb-5">
                <h1 className="font-bold text-blue-gray-800">Add Video</h1>
              </div>

              <form
                onSubmit={handleSubmit(onSubmit)}
                className="max-w-md mx-auto p-4 border rounded-md mt-5 bg-white text-black"
              >
                {/* name area */}
                <div>
                  <label
                    htmlFor="className"
                    className="block mb-2 font-semibold text-sm text-gray-500"
                  >
                    Video Title
                  </label>
                  <input
                    type="text"
                    id="className"
                    name="className"
                    required
                    {...register("title")}
                    placeholder="Enter video title"
                    className="w-full p-2 mb-4 border rounded-md outline-none focus:outline-primaryAlfa-50"
                  />
                  {errors.name?.type === "required" && (
                    <p role="alert" className="text-red-500 text-[14px]">
                      Video title is required
                    </p>
                  )}
                </div>
                {/* url */}

                <div>
                  <label
                    htmlFor="className"
                    className=" mb-2 font-semibold text-sm text-gray-500 flex gap-2"
                  >
                    Video Link
                    <Tooltip
                      content="https://www.youtube.com/watch?v=SC3d3"
                      placement="top"
                    >
                      <h1>
                        {" "}
                        <AiOutlineInfoCircle size={15} />
                      </h1>
                    </Tooltip>
                  </label>
                  <input
                    type="text"
                    id="className"
                    name="className"
                    required
                    {...register("url")}
                    placeholder="Enter video Link"
                    className="w-full p-2 mb-4 border rounded-md outline-none focus:outline-primaryAlfa-50"
                  />
                  {errors.name?.type === "required" && (
                    <p role="alert" className="text-red-500 text-[14px]">
                      Video Link is required
                    </p>
                  )}
                </div>
                {/* Short description  */}
                <div className=" mb-2">
                  <label
                    htmlFor="desc"
                    className="block mb-2 font-semibold text-sm text-gray-500"
                  >
                    Short Description for Video
                  </label>

                  <textarea
                    rows="3"
                    className="w-full p-2  text-black mb-2 border rounded-md outline-none focus:outline-primaryAlfa-50"
                    type="text"
                    {...register("shortDescription", {
                      required: "Short Description is required",
                    })}
                    placeholder="Please enter short description"
                  />
                  {errors?.shortDescription && (
                    <small className="text-red-500 text-xs font-medium my-2">
                      {errors?.shortDesc?.message}
                    </small>
                  )}
                </div>
                <div className="flex justify-end">
                  {isLoading ? (
                    <Button
                      disabled
                      className="bg-white text-blue-gray-700 border py-2 px-[39px] rounded-sm font-semibold cursor-wait "
                    >
                      <FaSpinner className="animate-spin" />
                    </Button>
                  ) : (
                    <Button
                      type="submit"
                      className="bg-white text-blue-gray-700 border py-2 px-8 rounded-sm font-semibold cursor-pointer"
                    >
                      Add
                    </Button>
                  )}
                </div>
              </form>
            </div>
                  </>
                 
        </div>
      </div>
    </div>
  );
};

export default AddVideo;
