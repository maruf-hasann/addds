
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

  return (
    <div
      className="p-8 overflow-y-auto"
      style={{ height: "calc(100vh - 120px)" }}
    >
      <div className="grid grid-cols-1  gap-5">
        <div className="border p-1 relative">
          <video controls width="100%" className="w-auto max-h-80 mx-auto">
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
        <div>
          <h5 className="block mb-3 text-sm font-semibold outline-none text-gray-900 dark:text-white">
            Thumbnail *
          </h5>
          {thumbnail && thumbnailPreview ? (
            <div className="w-full border border-gray-300 p-2 relative max-h-80 h-full">
              <img
                src={thumbnailPreview}
                alt="Thumbnail-image"
                className="h-full object-cover mx-auto"
              />
              <button
                onClick={() => {
                  {
                    setThumbnail(null), setThumbnailPreview(null);
                  }
                }}
                className="absolute top-2 right-2 text-red-500 text-2xl hover:text-red-500 border border-red-500 rounded-full bg-white"
              >
                <RxCross2 />
              </button>
            </div>
          ) : (
            <div
              onClick={() => {
                const fileInput = document.getElementById("input-type-image");
                fileInput.click();
              }}
              className={`border border-gray-300 p-4 py-10 mt-2 text-center cursor-pointer w-full mx-auto max-h-80 h-full`}
            >
              <input
                type="file"
                accept="image/png"
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
                  <MdFileUpload className={`text-[80px] text-gray-700 `} />
                </div>
                <h2 className="font-bold text-xl text-gray-700">
                  Upload Photo
                </h2>
              </div>
            </div>
          )}
        </div>
        <div className="my-5">
          <h2 className="font-semibold mb-3 text-xl">Publish to</h2>
          {publishPlatforms?.map((platform, idx) => (
            <label key={idx} className="flex items-center gap-2 font-semibold">
              <input
                type="checkbox"
                name={platform?.name}
                id={platform?.name}
                checked={isPublished[platform?.name]}
                onChange={() => handleCheckboxChange(platform?.name)}
                className="size-4"
              />
              {platform?.icon} <p className="capitalize">{platform?.name}</p>
            </label>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AfterSelectVideo;
