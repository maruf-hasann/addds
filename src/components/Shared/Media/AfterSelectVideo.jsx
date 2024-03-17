import toast from "react-hot-toast";
import {
  FaFacebook,
  FaInstagram,
  FaTiktok,
  FaTrash,
  FaYoutube,
} from "react-icons/fa";
import { MdFileUpload } from "react-icons/md";
import { RxCross2 } from "react-icons/rx";

const AfterSelectVideo = ({
  setThumbnailPreview,
  thumbnailPreview,
  thumbnail,
  setThumbnail,
  videoPreview,
  isPublished,
  setIsPublished,
  isOpen,
  setIsOpen,
  setVideo,
  setVideoPreview,
  setMediaType,
}) => {
  const publishPlatforms = [
    {
      name: "youtube",
      icon: <FaYoutube />,
    },
    {
      name: "facebook",
      icon: <FaFacebook />,
    },
    {
      name: "instagram",
      icon: <FaInstagram />,
    },
    {
      name: "tiktok",
      icon: <FaTiktok />,
    },
  ];
  //   handle add thumbnail
  const handleAddImage = async (e) => {
    e.preventDefault();
    let files = e.target.files;
    if (files.length > 0) {
      const selectedImage = files[0];
      setThumbnail(selectedImage);

      const reader = new FileReader();
      reader.onload = () => {
        setThumbnailPreview(reader.result);
      };
      reader.readAsDataURL(selectedImage);
    }
  };

  const handleCheckboxChange = (platformName) => {
    setIsPublished((prevCheckboxes) => ({
      ...prevCheckboxes,
      [platformName]: !prevCheckboxes[platformName],
    }));
  };

  const handleCancel = () => {
    setVideo(null), setVideoPreview(null), setIsOpen(false), setMediaType(null);
    setThumbnail(null), setThumbnailPreview(null);
    setIsPublished({
      facebook: false,
      instagram: false,
      tiktok: false,
      youtube: false,
    });
  };

  const handleSave = () => {
    if (!thumbnail) return toast.error("Please add thumbnail");
    setIsOpen(false);
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
                    setVideo(null), setVideoPreview(null), setMediaType(null);
                    setThumbnail(null), setThumbnailPreview(null);
                    setIsPublished({
                      facebook: false,
                      instagram: false,
                      tiktok: false,
                      youtube: false,
                    });
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
