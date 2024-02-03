import React from "react";
import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
  Typography,
} from "@material-tailwind/react";
import { toast } from "react-hot-toast";
import { useDeleteMediaMutation } from "../../../../store/service/mediaLibrary/mediaLibraryApiService";

const DeleteMediaLibraryModal = ({
  setOpenDeleteMediaLibraryModal,
  openDeleteMediaLibraryModal,
  id,
}) => {
  const [deleteMedia] = useDeleteMediaMutation();

  const handleClose = () => {
    setOpenDeleteMediaLibraryModal(!openDeleteMediaLibraryModal);
  };
  const handleOpen = () => {
    setOpenDeleteMediaLibraryModal(!openDeleteMediaLibraryModal);
  };

  // handle delete Media library function
  const handleDelete = async (id) => {
    const result = await deleteMedia(id);
    console.log(result);
  };

  return (
    <>
      <Dialog
        open={openDeleteMediaLibraryModal}
        handler={handleOpen}
        animate={{
          mount: { scale: 1, y: 0 },
          unmount: { scale: 0.9, y: -100 },
        }}
      >
        <DialogHeader>
          Are you want to sure delete this Education Variant?
        </DialogHeader>

        <DialogFooter>
          <Button
            variant="text"
            color="red"
            onClick={handleClose}
            className="mr-1 border-none"
          >
            <span>Cancel</span>
          </Button>
          <Button
            variant="gradient"
            color="green"
            onClick={() => handleDelete(id)}
          >
            <span>Confirm</span>
          </Button>
        </DialogFooter>
      </Dialog>
    </>
  );
};

export default DeleteMediaLibraryModal;
