import { useEffect, useState } from "react";
import { FaRegCircleXmark } from "react-icons/fa6";
import { Button } from "@material-tailwind/react";
import { FaSpinner } from "react-icons/fa";
import { useChangeVideoUrlMutation } from "../../../../../store/service/tutorInfo/promotion/promotionApiService";
import toast from "react-hot-toast";

const VideoUrlReplaceModal = ({
  isOpen,
  setIsOpen,
  replaceVideoData,
  setReplaceVideoData,
  setData,
}) => {
  const [newUrl, setNewUrl] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const [changeVideoUrl] = useChangeVideoUrlMutation();

  useEffect(() => {
    const body = document.querySelector("body");
    if (isOpen) {
      body.style.overflow = "hidden";
    } else {
      body.style.overflow = "auto";
    }
    return () => {
      body.style.overflow = "auto";
    };
  }, [isOpen]);

  const closeModal = () => {
    setIsOpen(false);
    setReplaceVideoData(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    const result = await changeVideoUrl({ ...replaceVideoData, newUrl });
    if (result?.data?.success) {
      toast.success(result?.data?.message);
      const videoGallery = result?.data?.data?.videoGallery;
      console.log(
        videoGallery?.find((vid) => vid?._id === replaceVideoData?.id)?.videoUrl
      );

      setData([...videoGallery]);
      setIsLoading(false);
      setIsOpen(false);
      setReplaceVideoData(null);
    } else {
      toast?.error(result?.error?.data?.message || "Something went wrong");
      setIsLoading(false);
    }
  };

  return (
    <div
      className={`fixed top-0 left-0 z-50 p-4 overflow-x-hidden overflow-y-auto inset-0 h-[calc(100%)] max-h-full backdrop-blur-md ${
        isOpen ? "block" : "hidden"
      }`}
    >
      <div
        className="w-full h-full z-0 absolute top-0 left-0"
        onClick={closeModal}
      ></div>
      <div className="relative z-50 w-full max-w-4xl  max-h-full mt-[20vh] mx-auto px-2  md:px-0">
        <div
          className={`relative  rounded-lg shadow text-primary px-10 bg-white`}
        >
          {/* modal close button */}
          <button
            onClick={closeModal}
            type="button"
            className="absolute top-3 right-2.5  rounded-lg text-sm p-1.5 ml-auto inline-flex items-center"
          >
            <FaRegCircleXmark className="text-3xl text-red-400 hover:text-red-500" />
          </button>
          <>
            <div className="py-10">
              <div className="flex justify-between items-center mb-5">
                <h1 className="font-bold text-blue-gray-800">
                  Replace Video URL
                </h1>
              </div>

              <form
                onSubmit={handleSubmit}
                className=" mx-auto py-4 rounded-md mt-5 bg-white"
              >
                <div>
                  <label className="block mb-2 font-semibold text-sm text-gray-500">
                    Previous URL
                  </label>
                  <input
                    type="text"
                    readOnly
                    value={replaceVideoData?.preUrl}
                    className="w-full p-2 mb-4 border rounded-md outline-none focus:outline-primaryAlfa-50"
                  />
                </div>
                <div>
                  <label
                    htmlFor="newUrl"
                    className="block mb-2 font-semibold text-sm text-gray-500"
                  >
                    New URL
                  </label>
                  <input
                    type="url"
                    name="newUrl"
                    value={newUrl}
                    required
                    onChange={(e) => setNewUrl(e.target.value)}
                    className="w-full p-2 border rounded-md outline-none focus:outline-primaryAlfa-50"
                  />
                </div>

                <div className="flex justify-end mt-10">
                  {isLoading ? (
                    <span
                      disabled
                      className="bg-white text-blue-gray-700 border py-2 px-[39px] rounded-sm font-semibold cursor-wait "
                    >
                      <FaSpinner className="animate-spin" />
                    </span>
                  ) : (
                    <Button
                      type="submit"
                      className="bg-white text-blue-gray-700 border py-2 px-8 rounded-sm font-semibold cursor-pointer"
                    >
                      Replace
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

export default VideoUrlReplaceModal;
