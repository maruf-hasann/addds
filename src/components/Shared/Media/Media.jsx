import { FaTrash } from "react-icons/fa";

const Media = ({
  mediaType,
  mediaPreview,
  setMediaType,
  setMediaPreview,
  setMedia,
  setIsPublished,
  setThumbnail,
  setThumbnailPreview,
}) => {
  return (
    <div>
      <label className="block mb-3 text-sm font-semibold outline-none text-gray-900 dark:text-white">
        Media
      </label>
      <div>
        {mediaType === "image" ? (
          <div className=" grid grid-cols-1 gap-3">
            <div className="border p-1 relative">
              <img
                src={mediaPreview}
                className="w-auto max-h-[400px] h-full object-cover mx-auto"
              />
              <div
                onClick={() => {
                  setMediaPreview(null), setMediaType(null), setMedia(null);
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
        ) : (
          <div className="border p-1 relative">
            <video controls width="100%" className="w-auto max-h-80 mx-auto">
              <source src={mediaPreview} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
            <div
              onClick={() => {
                setMedia(null), setMediaPreview(null), setMediaType(null);
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
        )}
      </div>
    </div>
  );
};

export default Media;
