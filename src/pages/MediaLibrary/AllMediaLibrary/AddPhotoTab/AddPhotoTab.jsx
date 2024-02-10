import { Button, Input } from "@material-tailwind/react";
import React, { useState } from "react";
import { MdCloudUpload } from "react-icons/md";
import { useUploadMediaMutation } from "../../../../store/service/mediaLibrary/mediaLibraryApiService";
import toast from "react-hot-toast";

export const AddPhotoTab = ({ handleOpen }) => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [imageTitle, setImageTitle] = useState("");

  const [uploadMedia] = useUploadMediaMutation();

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file && file.type.startsWith("image/")) {
      setSelectedImage(file);
    } else {
      console.error("Please select a valid image file.");
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();

    const file = e.dataTransfer.files[0];
    if (file && file.type.startsWith("image/")) {
      setSelectedImage(file);
    } else {
      console.error("Please drop a valid image file.");
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleClearSelection = () => {
    setSelectedImage(null);
  };

  const handleUpload = (e) => {
    e.preventDefault();
    if (selectedImage) {
      handleImageUpload();
    } else {
      console.error("No image selected for upload.");
    }
  };

  const handleImageUpload = async () => {
    const formData = new FormData();
    formData.append("media", selectedImage);
    formData.append("title", imageTitle);
    formData.append("type", "image");

    try {
      await uploadMedia(formData);
      toast.success("Image uploaded successfully!");
      setSelectedImage(null);
      setImageTitle(null);
      handleOpen();
    } catch (error) {
      console.error("Error uploading image:", error);
    }
  };

  return (
    <form onSubmit={handleUpload}>
      <div className="my-5 lg:w-1/2">
        <Input
          variant="outlined"
          label="Image Title"
          required
          value={imageTitle}
          onBlur={(e) => setImageTitle(e.target.value)}
        />
      </div>
      {!selectedImage ? (
        <div
          className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center cursor-pointer my-10 hover:border-primary transition-all group"
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          onClick={() => {
            const fileInput = document.getElementById("primary-file-input");
            fileInput.click();
          }}
        >
          <input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            id="primary-file-input"
            className="hidden"
          />
          <label htmlFor="image-input" className="cursor-pointer">
            <div
              className={`grid grid-cols-1 items-center justify-center gap-5 `}
            >
              <div className="text-gray-400 text-7xl transition-all mx-auto group-hover:text-primary">
                <MdCloudUpload />
              </div>
              <p className="font-bold transition-all group-hover:text-primary">
                Drag and drop an image here <br /> or <br /> click to select an
                image
              </p>
            </div>
          </label>
        </div>
      ) : (
        <div className="flex flex-col items-center gap-2">
          <img
            src={URL.createObjectURL(selectedImage)}
            alt="Selected"
            className="max-w-full h-auto rounded-lg"
          />
          <button
            onClick={handleClearSelection}
            className="bg-red-500 text-white px-3 py-1 rounded-md"
          >
            Clear Selection
          </button>
        </div>
      )}

      {selectedImage && (
        <div className="flex justify-end mt-20">
          <Button type="submit">Upload Image</Button>
        </div>
      )}
    </form>
  );
};
