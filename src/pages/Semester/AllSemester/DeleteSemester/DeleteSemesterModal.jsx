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
import { useDeleteSemesterMutation } from "../../../../store/service/semester/semesterApiService";




const DeleteSemesterModal = ({
  setDeleteSemesterData,
  deleteSemesterData,
  setOpenDeleteSemesterModal,
  openDeleteSemesterModal,
}) => {
  const [deleteSemester] = useDeleteSemesterMutation()

  const handleClose = () => {
    setDeleteSemesterData(null);
    setOpenDeleteSemesterModal(!openDeleteSemesterModal);
  };
  const handleOpen = () => {
    setDeleteSemesterData(null);
    setOpenDeleteSemesterModal(!openDeleteSemesterModal);
  };

  // handle delete Semester variant function
  const handleDelete = async (id) => {
    const result = await deleteSemester(id);
    if (result?.data?.success) {
      toast.success(result?.data?.message);
      setDeleteSemesterData(null);
      setOpenDeleteSemesterModal(!openDeleteSemesterModal);
    } else {
      toast.error(result?.error?.data?.message);
      setDeleteSemesterData(null);
      setOpenDeleteSemesterModal(!openDeleteSemesterModal);
    }
  };

  return (
    <>
      <Dialog
        open={openDeleteSemesterModal}
        handler={handleOpen}
        animate={{
          mount: { scale: 1, y: 0 },
          unmount: { scale: 0.9, y: -100 },
        }}
      >
        <DialogHeader>Are you want to sure delete this Semester?</DialogHeader>
        <DialogBody divider>
          <div>
            <Typography>
              <span className="font-semibold">Name: </span>{" "}
              {deleteSemesterData?.value}
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
            onClick={() => handleDelete(deleteSemesterData?._id)}
          >
            <span>Confirm</span>
          </Button>
        </DialogFooter>
      </Dialog>
    </>
  );
};

export default DeleteSemesterModal;
