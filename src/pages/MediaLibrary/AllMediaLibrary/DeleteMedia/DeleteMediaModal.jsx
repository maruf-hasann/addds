import React from "react";
import {
  Button,
  Dialog,
  DialogBody,
  DialogFooter,
} from "@material-tailwind/react";
import toast from "react-hot-toast";

export const DeleteMediaModal = ({ open, handleOpen, deleteMedia, id }) => {
  const handleDeleteMedia = async (id) => {
    try {
      await deleteMedia(id);
      toast.success("Media deleted successfully!");
      handleOpen();
    } catch (error) {
      console.error("Error deleting media:", error);
    }
  };

  return (
    <Dialog
      open={open}
      handler={handleOpen}
      animate={{
        mount: { scale: 1, y: 0 },
        unmount: { scale: 0.9, y: -100 },
      }}
    >
      <DialogBody className="text-xl font-bold text-black py-10 mt-6">
        Are you sure you want to delete this media?
      </DialogBody>
      <DialogFooter>
        <Button
          variant="text"
          color="red"
          onClick={handleOpen}
          className="mr-1"
        >
          <span>Cancel</span>
        </Button>
        <Button
          variant="gradient"
          color="green"
          onClick={() => handleDeleteMedia(id)}
        >
          <span>Confirm</span>
        </Button>
      </DialogFooter>
    </Dialog>
  );
};
