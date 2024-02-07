import { useState } from "react";
import { FaTrash } from "react-icons/fa";
import { MdFileUpload } from "react-icons/md";

const UploadPhoto = ({ customErrors, initialState, setInitialState }) => {
  const [isDraggingOver, setIsDraggingOver] = useState(false);

  //   handle add video
  const handleAddPhoto = (e) => {
    e.preventDefault();
    e.stopPropagation(); // Prevents further propagation of the current event.

    let files;
    if (e.type === "drop" || e.type === "dragover") {
      files = e.dataTransfer.files;
    } else {
      files = e.target.files;
    }

    if (files.length > 0) {
      const selectedImage = files[0];
      const reader = new FileReader();
      reader.onload = () => {
        setInitialState({
          ...initialState,
          classRoutineInImage: selectedImage,
          routineImagePreview: reader.result,
        });
      };
      reader.readAsDataURL(selectedImage);
      setIsDraggingOver(false);
    }
  };

  const handleDragEnter = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDraggingOver(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDraggingOver(false);
  };


  return (
    <div>
      <div className="p-4 border relative">
        {(initialState?.classRoutineInImage || initialState?.routineImageUrl) &&
        initialState?.routineImagePreview ? (
          <div className="w-full h-72">
            <img
              src={initialState?.routineImagePreview}
              className="object-cover rounded-md h-full mx-auto "
            />
          </div>
        ) : (
          <div
            className={`flex flex-col gap-5 items-center justify-center`}
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
              <p className="text-center ">
                Drag and drop image files to upload
              </p>
            </div>
            <span
              onClick={() => {
                const fileInput = document.getElementById("input-type-image");
                fileInput.click();
              }}
              className="uppercase px-4 py-[6px] bg-primary text-white cursor-pointer"
            >
              Select files
            </span>
          </div>
        )}
        {(initialState?.classRoutineInImage || initialState?.routineImageUrl) &&
        initialState?.routineImagePreview ? (
          <span
            onClick={() => {
              setInitialState({
                ...initialState,
                classRoutineInImage: null,
                routineImagePreview: null,
                routineImageUrl: null,
              });
            }}
            className="absolute top-2 right-2 text-red-400 text-xl bg-white hover:text-white border border-red-400 hover:border-red-500 hover:bg-red-500 p-2 rounded-full cursor-pointer"
          >
            <FaTrash />
          </span>
        ) : (
          ""
        )}
      </div>
      {(!initialState?.classRoutineInImage || !initialState?.routineImageUrl) &&
        customErrors?.classRoutineInImage && (
          <p className="text-red-500 text-sm absolute">
            {customErrors.classRoutineInImage}
          </p>
        )}
    </div>
  );
};

export default UploadPhoto;
