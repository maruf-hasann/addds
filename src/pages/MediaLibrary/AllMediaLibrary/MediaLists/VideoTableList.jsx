import { Card, CardFooter, Tooltip } from "@material-tailwind/react";
import { Link } from "react-router-dom";
import { useState } from "react";
import toast from "react-hot-toast";
import { FaCopy } from "react-icons/fa6";
import { BsCursorFill } from "react-icons/bs";
import { FaTrashAlt } from "react-icons/fa";
import {
  useDeleteMediaMutation,
  useGetAllMediaQuery,
} from "../../../../store/service/mediaLibrary/mediaLibraryApiService";

export const VideoTableList = () => {
  const { data: videoCardData, isLoading } = useGetAllMediaQuery("video");
  const [deleteMedia] = useDeleteMediaMutation();

  if (isLoading) {
    <p>Loading....</p>;
  }

  const handleCopy = (text) => {
    navigator.clipboard.writeText(text);
    toast.success("Copied to clipboard");
  };

  const handleDelete = async (id) => {
    const res = await deleteMedia(id);
    if (res?.data?.statusCode === 200) {
      toast.success(res.data.message);
    } else {
      toast.error("Error in deleting video!");
    }
  };

  return (
    <div>
      {videoCardData === undefined || videoCardData?.data?.length === 0 ? (
        <p className="text-center my-10 text-4xl">No videos found.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {videoCardData?.data?.map((item) => (
            <Card className="w-auto mt-10 lg:mx-10" key={item?._id}>
              <div className="h-auto relative px-5">
                <div className="relative group">
                  <video controls className="w-full h-[200px] rounded-xl">
                    <source src={item?.mediaUrl} type="video/mp4" />
                  </video>
                </div>
              </div>

              <CardFooter className="flex justify-center gap-7 pt-10">
                <Tooltip content="Copy">
                  <button
                    className="border p-2 rounded-md border-primary bg-primary text-white hover:bg-transparent hover:text-primary duration-500"
                    onClick={() => handleCopy(item?.mediaUrl)}
                  >
                    <FaCopy className="text-xl" />
                  </button>
                </Tooltip>
                <Tooltip content="URL">
                  <Link to={item?.mediaUrl} target="_blank">
                    <button className="border p-2 rounded-md border-primary bg-primary text-white hover:bg-transparent hover:text-primary duration-500">
                      <BsCursorFill className="text-xl" />
                    </button>
                  </Link>
                </Tooltip>
                <Tooltip content="Delete">
                  <button
                    className="border p-2 rounded-md border-red-500 bg-red-500 text-white hover:bg-transparent hover:text-red-400 duration-500"
                    onClick={() => handleDelete(item?._id)}
                  >
                    <FaTrashAlt className="text-xl" />
                  </button>
                </Tooltip>
              </CardFooter>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};
