import {
  FaFacebook,
  FaInstagram,
  FaTiktok,
  FaTrash,
  FaYoutube,
} from "react-icons/fa";
import { RxCross2 } from "react-icons/rx";

const AfterSelectPhoto = ({
  imagePreview,
  setIsPublished,
  isOpen,
  setState,
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

  const handleCheckboxChange = (platformName) => {
    setIsPublished((prevCheckboxes) => ({
      ...prevCheckboxes,
      [platformName]: !prevCheckboxes[platformName],
    }));
  };

  const handleCancel = () => {
    setState((prev) => ({
      ...prev,
      mediaModalOpen: false,
      media: null,
      mediaPreview: null,
      mediaType: null,
    }));
  };

  const handleSave = () => {
    setState((prev) => ({
      ...prev,
      mediaModalOpen: false,
    }));
  };

  return (
    <>
      <div
        className={`fixed inset-0 z-50 ${
          isOpen ? "opacity-100 visible" : "opacity-0 invisible"
        } transition-opacity duration-300 ease-in-out flex items-center justify-center  `}
      >
        <div className="fixed inset-0 backdrop-filter backdrop-blur-sm"></div>
        <div className="bg-white rounded-md z-10  w-full max-w-5xl   relative mx-1 h-full  ">
          <div className="p-4 border-b py-6">
            <button
              onClick={() => handleCancel()}
              className="absolute top-3 right-3 text-gray-500 text-2xl bg-white hover:text-red-500"
            >
              <RxCross2 />
            </button>
          </div>

          <div className="p-8" >
            <div className="grid grid-cols-1 ">
              <div className=" grid grid-cols-1 gap-3">
                <div className="border p-1 relative">
                  <img
                    src={imagePreview}
                    className="w-auto max-h-[400px] h-full object-cover mx-auto"
                  />
                  <div
                    onClick={() => {
                      setState((prev) => ({
                        ...prev,

                        media: null,
                        mediaPreview: null,
                        mediaType: null,
                      }));
                    }}
                    className="border border-red-400 text-red-400 hover:text-red-500 hover:border-red-500 absolute top-3 right-3 rounded-full bg-white cursor-pointer"
                  >
                    <FaTrash className="size-5 m-2" />
                  </div>
                </div>
              </div>
              {/* <div>
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
                      {platform?.icon}{" "}
                      <p className="capitalize">{platform?.name}</p>
                    </label>
                  ))}
                </div>
              </div> */}
              <div className="flex justify-end mt-5">
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

export default AfterSelectPhoto;
