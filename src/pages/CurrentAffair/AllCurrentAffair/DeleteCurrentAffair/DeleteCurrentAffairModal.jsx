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
import { useDeleteCurrentAffairMutation } from "../../../../store/service/currentAffair/currentAffairApiService";




const DeleteCurrentAffairModal = ({
  setDeleteCurrentAffairData,
  deleteCurrentAffairData,
  setOpenDeleteCurrentAffairModal,
  openDeleteCurrentAffairModal,
}) => {
  const [deleteCurrentAffair] = useDeleteCurrentAffairMutation()

  const handleClose = () => {
    setDeleteCurrentAffairData(null);
    setOpenDeleteCurrentAffairModal(!openDeleteCurrentAffairModal);
  };
  const handleOpen = () => {
    setDeleteCurrentAffairData(null);
    setOpenDeleteCurrentAffairModal(!openDeleteCurrentAffairModal);
  };

  // handle delete Student variant function
  const handleDelete = async (id) => {
    const result = await deleteCurrentAffair(id);
    if (result?.data?.success) {
      toast.success(result?.data?.message);
      setDeleteCurrentAffairData(null);
      setOpenDeleteCurrentAffairModal(!openDeleteCurrentAffairModal);
    } else {
      console.log(result.error);
      toast.error(result?.error?.data?.message);
      setDeleteCurrentAffairData(null);
      setOpenDeleteCurrentAffairModal(!openDeleteCurrentAffairModal);
    }
  };

  return (
    <>
      <Dialog
        open={openDeleteCurrentAffairModal}
        handler={handleOpen}
        animate={{
          mount: { scale: 1, y: 0 },
          unmount: { scale: 0.9, y: -100 },
        }}
      >
        <DialogHeader>Are you want to sure delete this Student Variant?</DialogHeader>
        <DialogBody divider>
          <div>
            <Typography>
              <span className="font-semibold">Name: </span>{" "}
              {deleteCurrentAffairData?.affair}
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
            onClick={() => handleDelete(deleteCurrentAffairData?._id)}
          >
            <span>Confirm</span>
          </Button>
        </DialogFooter>
      </Dialog>
    </>
  );
};

export default DeleteCurrentAffairModal;
