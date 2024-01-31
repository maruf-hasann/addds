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

const BlogDeleteModal = ({
  id,
  setDeleteData,
  setOpenDeleteModal,
  openDeleteModal,
  deleteFunction,
  title,
}) => {
  const handleClose = () => {
    setOpenDeleteModal(!openDeleteModal);
  };
  const handleOpen = () => {
    setOpenDeleteModal(!openDeleteModal);
  };

  // handle delete School function
  const handleDelete = async (id) => {
    const result = await deleteFunction(id);
    if (result?.data?.success) {
      toast.success(result?.data?.message);
      setDeleteData(null);
      setOpenDeleteModal(!openDeleteModal);
    } else {
      console.log(result.error);
      toast.error(result?.error?.data?.message);
      setDeleteData(null);
      setOpenDeleteModal(!openDeleteModal);
    }
  };

  return (
    <>
      <Dialog
        open={openDeleteModal}
        handler={handleOpen}
        animate={{
          mount: { scale: 1, y: 0 },
          unmount: { scale: 0.9, y: -100 },
        }}
      >
        <DialogHeader>Are you want to sure delete?</DialogHeader>
        <DialogBody divider>
          <div>
            <Typography>
              <span className="font-semibold">Title : </span> {title?.slice(0,60) + '...'}
            </Typography>
          </div>
        </DialogBody>
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

export default BlogDeleteModal;
