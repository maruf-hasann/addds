import { MdFileUpload } from "react-icons/md";
import { RxCross2 } from "react-icons/rx";

const BeforeSelectMedia = ({
  handleAddMedia,
  handleDragEnter,
  handleDragLeave,
  isDraggingOver,
  isOpen,
  setIsOpen,
}) => {
  return (
    <>
      <div
        className={`fixed  inset-0 z-50 ${
          isOpen ? "opacity-100 visible" : "opacity-0 invisible"
        } transition-opacity duration-300 ease-in-out flex items-center justify-center `}
      >
        <div className="fixed inset-0 backdrop-filter backdrop-blur-sm"></div>
        <div
          className="bg-white rounded-md z-10  w-full max-w-5xl  max-h-full mt-[8vh] relative mx-1 "
          
        >
          <div className="p-4 border-b py-6">
            <button
              onClick={() => setIsOpen(false)}
              className="absolute top-3 right-3 text-gray-500 text-2xl bg-white hover:text-red-500"
            >
              <RxCross2 />
            </button>
          </div>

          <div
            style={{ height: "calc(100vh - 170px)" }}
            className={`p-4 flex flex-col gap-5 items-center justify-center`}
            onDragOver={handleDragEnter}
            onDragEnter={handleDragEnter}
            onDragLeave={handleDragLeave}
            onDrop={handleAddMedia}
          >
            <input
              type="file"
              accept="video/mp4, image/png"
              onChange={(e) => handleAddMedia(e)}
              id="input-type-media"
              name="media"
              className="hidden"
            />
            <div
              onClick={() => {
                const fileInput = document.getElementById("input-type-media");
                fileInput.click();
              }}
              className={`h-36 w-36 flex items-center justify-center bg-gray-100 rounded-full cursor-pointer transition `}
            >
              <MdFileUpload
                className={`text-[80px] text-gray-700 ${
                  isDraggingOver ? "animate-pulse" : ""
                }`}
              />
            </div>
            <div>
              <p className="text-center ">
                Drag and drop media files to upload
              </p>
              <p className="text-center text-sm">
                Your media will be private until you publish them.
              </p>
            </div>
            <button
              onClick={() => {
                const fileInput = document.getElementById("input-type-media");
                fileInput.click();
              }}
              className="uppercase px-4 py-[6px] bg-primary text-white"
            >
              Select files
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default BeforeSelectMedia;
