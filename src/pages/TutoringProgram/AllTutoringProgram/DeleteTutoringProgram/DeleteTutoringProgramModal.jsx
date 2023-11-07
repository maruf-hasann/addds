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
import { useDeleteTutoringProgramMutation } from "../../../../store/service/tutoringProgram/tutoringProgramApiService";




const DeleteTutoringProgramModal = ({
  setDeleteTutoringProgramData,
  deleteTutoringProgramData,
  setOpenDeleteTutoringProgramModal,
  openDeleteTutoringProgramModal,
}) => {
  const [deleteTutoringProgram] = useDeleteTutoringProgramMutation()

  const handleClose = () => {
    setDeleteTutoringProgramData(null);
    setOpenDeleteTutoringProgramModal(!openDeleteTutoringProgramModal);
  };
  const handleOpen = () => {
    setDeleteTutoringProgramData(null);
    setOpenDeleteTutoringProgramModal(!openDeleteTutoringProgramModal);
  };

  // handle delete tutoring Program function
  const handleDelete = async (name) => {
    console.log(name);
    const result = await deleteTutoringProgram({name});
    if (result?.data?.success) {
      toast.success(result?.data?.message);
      setDeleteTutoringProgramData(null);
      setOpenDeleteTutoringProgramModal(!openDeleteTutoringProgramModal);
    } else {
      console.log(result.error);
      toast.error(result?.error?.data?.message);
      setDeleteTutoringProgramData(null);
      setOpenDeleteTutoringProgramModal(!openDeleteTutoringProgramModal);
    }
  };

  return (
    <>
      <Dialog
        open={openDeleteTutoringProgramModal}
        handler={handleOpen}
        animate={{
          mount: { scale: 1, y: 0 },
          unmount: { scale: 0.9, y: -100 },
        }}
      >
        <DialogHeader>Are you want to sure delete this Tutoring Program?</DialogHeader>
        <DialogBody divider>
          <div>
            <Typography>
              <span className="font-semibold">Name: </span>{" "}
              {deleteTutoringProgramData?.programName}
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
            onClick={() => handleDelete(deleteTutoringProgramData?.programName)}
          >
            <span>Confirm</span>
          </Button>
        </DialogFooter>
      </Dialog>
    </>
  );
};

export default DeleteTutoringProgramModal;
