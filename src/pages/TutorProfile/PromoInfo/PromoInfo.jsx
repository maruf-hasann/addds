import React from "react";

const PromoInfo = ({ promoInfo }) => {
  console.log(promoInfo);
  return (
    <div>
      <div>
        <p className="font-semibold text-lg mb-3">Media</p>
        <div className="flex gap-5 flex-wrap">
          {promoInfo?.mediaGallery?.map((media, idx) => (
            <img
              key={idx}
              src={media?.imgUrl}
              className="max-w-[200px] w-full h-auto"
            />
          ))}
        </div>
      </div>
      <div className="mt-10">
        <p className="font-semibold text-lg mb-3">Video</p>
        <div className="flex gap-5 flex-wrap">
          {promoInfo?.videoGallery?.map((video, idx) => (
            <video
              key={idx}
              controls
              width="100%"
              className="max-w-[300px] w-full h-auto"
            >
              <source src={video?.videoUrl} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PromoInfo;
