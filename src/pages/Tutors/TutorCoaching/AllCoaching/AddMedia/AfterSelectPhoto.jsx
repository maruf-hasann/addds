import {
  FaFacebook,
  FaInstagram,
  FaTiktok,
  FaTrash,
  FaYoutube,
} from "react-icons/fa";

const AfterSelectPhoto = ({
  imagePreview,
  isPublished,
  setIsPublished,
  setImage,
  setImagePreview,
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
      <div className="grid grid-cols-1 ">
        <div className=" grid grid-cols-1 gap-3">
          <div className="border p-1 relative">
            <img
              src={imagePreview}
              className="w-auto max-h-[400px] h-full object-cover mx-auto"
            />
            <div
              onClick={() => {
                setImage(null), setImagePreview(null), setMediaType(null);
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
        </div>
        <div>
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

export default AfterSelectPhoto;
