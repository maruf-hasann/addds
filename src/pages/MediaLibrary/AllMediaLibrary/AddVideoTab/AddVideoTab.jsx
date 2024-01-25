import { Button } from "@material-tailwind/react";
import { MdCloudUpload } from "react-icons/md";

export const AddVideoTab = () => {
  const handleAddPrimaryVideo = async (e) => {
    e.preventDefault();

    let files;

    if (e?.type === "drop" || e?.type === "dragover") {
      files = e.dataTransfer.files;
    } else {
      files = e.target.files;
    }
  };
  return (
    <div>
      <form>
        <div
          className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center cursor-pointer w-full my-10"
          onDragOver={handleAddPrimaryVideo}
          onDrop={handleAddPrimaryVideo}
          onClick={() => {
            const fileInput = document.getElementById("primary-file-input");
            fileInput.click();
          }}
        >
          <input
            type="file"
            accept="video/*"
            id="primary-file-input"
            className="hidden"
          />
          <div className={`grid grid-cols-1 items-center justify-center gap-5`}>
            <div className="text-gray-400 text-7xl mx-auto">
              <MdCloudUpload />
            </div>
            <p className="font-bold">
              Drag and drop a video here <br /> or <br /> click to select a
              video
            </p>
          </div>
        </div>

        <div className="flex justify-end mt-20">
          <Button>Upload Video</Button>
        </div>
      </form>
    </div>
  );
};
