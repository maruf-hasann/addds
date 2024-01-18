import {
  Card,
  CardHeader,
  CardFooter,
  Tooltip,
} from "@material-tailwind/react";
import { Link } from "react-router-dom";
import { useState } from "react";
import { DeleteMediaModal } from "../DeleteMedia/DeleteMediaModal";
import { Dialog, DialogBody } from "@material-tailwind/react";
import toast from "react-hot-toast";
import { videoCardData } from "../../../../data/mediaTableData";
import { FaCopy } from "react-icons/fa6";
import { BsCursorFill } from "react-icons/bs";
import { FaTrashAlt, FaPlay } from "react-icons/fa";

export const VideoTableList = () => {
  const [open, setOpen] = useState(false);
  const [openVideo, setOpenVideo] = useState(false);

  const handleOpen = () => setOpen(!open);
  const handleOpenVideo = () => setOpenVideo(!openVideo);

  const handleCopy = (text) => {
    navigator.clipboard.writeText(text);
    toast.success("Copied to clipboard");
  };

  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {videoCardData?.map((item, i) => (
          <Card className="w-auto mt-10 mx-10" key={i}>
            <CardHeader floated={false} className="h-auto relative">
              <div className="relative group">
                <img
                  src={item?.image}
                  alt="profile-picture"
                  className="h-full w-full object-cover transition-transform transform group-hover:scale-105 duration-700 "
                />
                <FaPlay
                  className="absolute top-[44%] right-[44%] text-5xl text-primary z-10 hover:scale-110 duration-500"
                  onClick={handleOpenVideo}
                />
                <div className="overlay absolute inset-0 bg-black opacity-0 group-hover:opacity-50 transition-opacity duration-300"></div>
              </div>
            </CardHeader>

            <CardFooter className="flex justify-center gap-7 pt-10">
              <Tooltip content="Copy">
                <button
                  className="border p-2 rounded-md border-primary bg-primary text-white hover:bg-transparent hover:text-primary duration-500"
                  onClick={() => handleCopy(item?.link)}
                >
                  <FaCopy className="text-xl" />
                </button>
              </Tooltip>
              <Tooltip content="URL">
                <Link to={item?.link} target="_blank">
                  <button className="border p-2 rounded-md border-primary bg-primary text-white hover:bg-transparent hover:text-primary duration-500">
                    <BsCursorFill className="text-xl" />
                  </button>
                </Link>
              </Tooltip>
              <Tooltip content="Delete">
                <button
                  className="border p-2 rounded-md border-red-500 bg-red-500 text-white hover:bg-transparent hover:text-red-400 duration-500"
                  onClick={handleOpen}
                >
                  <FaTrashAlt className="text-xl" />
                </button>
              </Tooltip>
            </CardFooter>
            <Dialog open={openVideo} handler={handleOpenVideo} size="md">
              <DialogBody className="">
                <div className="mx-auto flex justify-center">
                  <iframe
                    width="900"
                    height="400"
                    src={item?.link}
                    title="YouTube video player"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowFullScreen
                  ></iframe>
                </div>
              </DialogBody>
            </Dialog>
          </Card>
        ))}
      </div>

      {open && <DeleteMediaModal open={open} handleOpen={handleOpen} />}
    </div>
  );
};
