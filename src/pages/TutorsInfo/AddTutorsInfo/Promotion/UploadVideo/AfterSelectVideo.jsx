import { FaFacebook, FaInstagram, FaTiktok, FaYoutube } from "react-icons/fa";
import { MdCloudUpload } from "react-icons/md";
import { RxCross2 } from "react-icons/rx";
import PhoneInput from "react-phone-number-input";
import { isValidPhoneNumber } from "react-phone-number-input";

const AfterSelectVideo = ({
  setThumbnailPreview,
  thumbnailPreview,
  thumbnail,
  setThumbnail,
  videoPreview,
  isPublished,
  setIsPublished,
  title,
  setTitle,
  description,
  setDescription,
  errors,
  number,
  setNumber,
  numberError,
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
    <div className="p-8 overflow-y-auto pb-20">
      <h2 className="font-semibold text-xl mb-3">Details</h2>
      <div className="grid grid-cols-1 md:grid-cols-11 gap-5">
        <div className="md:col-span-7 grid grid-cols-1 gap-5">
          {/* number */}
          <div>
            <label className="block mb-3 text-sm font-semibold outline-none text-gray-900 dark:text-white">
              Number
            </label>
            <PhoneInput
              className="shadow-sm bg-white border border-gray-300 outline-none text-gray-900 text-sm rounded-md focus:ring-blue-500 focus:border-blue-500 w-full ps-2 flex  items-center gap-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
              international
              countryCallingCodeEditable={true}
              defaultCountry="BD"
              value={number}
              onChange={setNumber}
            />

            {number && isValidPhoneNumber(number) ? (
              ""
            ) : (
              <p
                className={`text-red-500 absolute ${!numberError && "hidden"}`}
              >
                Please enter a valid number
              </p>
            )}
          </div>
          <div>
            <label className="block mb-3 text-sm font-semibold outline-none text-gray-900 dark:text-white">
              Title *
            </label>
            <textarea
              type="text"
              className={`border-2 ${
                !title && errors?.title ? "border-red-500" : "border-gray-300"
              } border-gray-300 rounded-md p-4 w-full  resize-none focus:outline-primary`}
              rows="2"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
          <div>
            <label className="block mb-3 text-sm font-semibold outline-none text-gray-900 dark:text-white">
              Description *
            </label>
            <textarea
              type="text"
              className={`border-2 ${
                !description && errors?.description
                  ? "border-red-500"
                  : "border-gray-300"
              }  rounded-md p-4 w-full  resize-none focus:outline-primary`}
              rows="4"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Description"
            />
          </div>
          <div>
            <h5 className="block mb-3 text-sm font-semibold outline-none text-gray-900 dark:text-white">
              Thumbnail *
            </h5>
            {thumbnail && thumbnailPreview ? (
              <div className="w-full h-60 border-2 border-gray-300 rounded-md p-2 relative">
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
                  className="absolute top-2 right-2 text-red-300 text-2xl hover:text-red-500 z-10 border border-red-500 rounded-full bg-white"
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
                className={`border-2 border-dashed ${
                  !thumbnail && errors?.thumbnail
                    ? "border-red-500"
                    : "border-gray-300"
                } rounded-lg p-4 py-10 mt-2 text-center cursor-pointer w-full mx-auto`}
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
                    <MdCloudUpload />
                  </div>
                  <h2 className="font-bold text-xl text-gray-700">
                    Upload Photo
                  </h2>
                </div>
              </div>
            )}
          </div>
        </div>
        <div className="md:col-span-4">
          <video controls width="100%" className="w-auto max-h-80 mx-auto">
            <source src={videoPreview} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
          <div className="my-5">
            <h2 className="font-semibold mb-3 text-xl">Publish to</h2>
            {publishPlatforms?.map((platform, idx) => (
              <label
                key={idx}
                className="flex items-center gap-2 font-semibold"
              >
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
    </div>
  );
};

export default AfterSelectVideo;
