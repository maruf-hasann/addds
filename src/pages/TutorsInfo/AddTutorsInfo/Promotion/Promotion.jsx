import { useEffect, useState } from "react";
import { isValidPhoneNumber } from "react-phone-number-input";
import VideoUpload from "./UploadVideo/VideoUpload";
import PhotoUpload from "./UploadPhoto/PhotoUpload";


const Promotion = () => {
  const [number, setNumber] = useState(null);
  const [numberError, setNumberError] = useState(false);
  const [activeTab, setActiveTab] = useState("video");

  // get previous tab number
  useEffect(() => {
    const number = localStorage.getItem("tutor-number");
    setNumber(number);
  }, []);

  //check number is valid or not
  useEffect(() => {
    number && isValidPhoneNumber(number)
      ? setNumberError(false)
      : setNumberError(true);

    if (number?.length < 14) {
      setNumberError(true);
    }
  }, [number]);

  return (
    <div className="p-2 lg:p-10">
      <h2 className="font-semibold text-2xl mb-5">Promo Info</h2>
      <div className="flex gap-5 md:gap-10 border-b-2 justify-between">
        <div className="flex gap-5 md:gap-10">
          <div
            className="pb-3 relative cursor-pointer"
            onClick={() => setActiveTab("video")}
          >
            <p className="font-semibold text-gray-700 ">Video</p>
            {activeTab === "video" && (
              <div className="h-1 w-11 bg-primary absolute top-[88%] rounded-t-full"></div>
            )}
          </div>
          <div
            className="pb-3 relative cursor-pointer"
            onClick={() => setActiveTab("photo")}
          >
            <p className="font-semibold text-gray-700 ">Photo</p>
            {activeTab === "photo" && (
              <div className="h-1 w-14 bg-primary absolute top-[88%] rounded-t-full"></div>
            )}
          </div>
        </div>
      </div>
      {activeTab === "video" ? (
        <VideoUpload number={number} setNumber={setNumber} numberError={numberError} />
      ) : (
        ""
      )}
      {activeTab === "photo" ? (
        <PhotoUpload number={number} setNumber={setNumber} numberError={numberError} />
      ) : (
        ""
      )}
    </div>
  );
};

export default Promotion;
