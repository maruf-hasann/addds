import { MdFileUpload } from "react-icons/md";

const BeforeSelectPhoto = ({
  handleAddPhoto,
  handleDragEnter,
  handleDragLeave,
  isDraggingOver,
}) => {
  return (
    <div

      className={`p-4 py-16 xl:py-32 flex flex-col gap-5 items-center justify-center`}
      onDragOver={handleDragEnter}
      onDragEnter={handleDragEnter}
      onDragLeave={handleDragLeave}
      onDrop={handleAddPhoto}
    >
      <input
        type="file"
        accept="image/png"
        onChange={(e) => handleAddPhoto(e)}
        id="input-type-image"
        name="image"
        className="hidden"
      />
      <div
        onClick={() => {
          const fileInput = document.getElementById("input-type-image");
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
        <p className="text-center ">Drag and drop image files to upload</p>
        <p className="text-center text-sm">
          Your photos will be private until you publish them.
        </p>
      </div>
      <button
        onClick={() => {
          const fileInput = document.getElementById("input-type-image");
          fileInput.click();
        }}
        className="uppercase px-4 py-[6px] bg-primary text-white"
      >
        Select files
      </button>
    </div>
  );
};

export default BeforeSelectPhoto;
