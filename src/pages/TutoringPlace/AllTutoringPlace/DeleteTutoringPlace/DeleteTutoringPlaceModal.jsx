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
import { useDeleteTutoringPlaceMutation } from "../../../../store/service/tutoringPlace/tutoringPlace";



const DeleteTutoringPlaceModal = ({
  setDeleteTutoringPlaceData,
  deleteTutoringPlaceData,
  setOpenDeleteTutoringPlaceModal,
  openDeleteTutoringPlaceModal,
}) => {
  const [deleteTutoringPlace] = useDeleteTutoringPlaceMutation()

  const handleClose = () => {
    setDeleteTutoringPlaceData(null);
    setOpenDeleteTutoringPlaceModal(!openDeleteTutoringPlaceModal);
  };
  const handleOpen = () => {
    setDeleteTutoringPlaceData(null);
    setOpenDeleteTutoringPlaceModal(!openDeleteTutoringPlaceModal);
  };

  // handle delete tutoring Place function
  const handleDelete = async (name) => {
    console.log(name);
    const result = await deleteTutoringPlace({name});
    if (result?.data?.success) {
      toast.success(result?.data?.message);
      setDeleteTutoringPlaceData(null);
      setOpenDeleteTutoringPlaceModal(!openDeleteTutoringPlaceModal);
    } else {
      console.log(result.error);
      toast.error(result?.error?.data?.message);
      setDeleteTutoringPlaceData(null);
      setOpenDeleteTutoringPlaceModal(!openDeleteTutoringPlaceModal);
    }
  };

  return (
    <>
      <Dialog
        open={openDeleteTutoringPlaceModal}
        handler={handleOpen}
        animate={{
          mount: { scale: 1, y: 0 },
          unmount: { scale: 0.9, y: -100 },
        }}
      >
        <DialogHeader>Are you want to sure delete this Tutoring Place?</DialogHeader>
        <DialogBody divider>
          <div>
            <Typography>
              <span className="font-semibold">Name: </span>{" "}
              {deleteTutoringPlaceData?.placeName}
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
            onClick={() => handleDelete(deleteTutoringPlaceData?.placeName)}
          >
            <span>Confirm</span>
          </Button>
        </DialogFooter>
      </Dialog>
    </>
  );
};

export default DeleteTutoringPlaceModal;
