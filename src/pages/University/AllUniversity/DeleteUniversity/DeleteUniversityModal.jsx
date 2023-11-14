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
import { useDeleteUniversityMutation } from "../../../../store/service/university/universityApiService";


const DeleteUniversityModal = ({
  setDeleteUniversityData,
  deleteUniversityData,
  setOpenDeleteUniversityModal,
  openDeleteUniversityModal,
}) => {
  const [deleteUniversity] = useDeleteUniversityMutation();

  const handleClose = () => {
    setDeleteUniversityData(null);
    setOpenDeleteUniversityModal(!openDeleteUniversityModal);
  };
  const handleOpen = () => {
    setDeleteUniversityData(null);
    setOpenDeleteUniversityModal(!openDeleteUniversityModal);
  };

  // handle delete Student variant function
  const handleDelete = async (id) => {
    const result = await deleteUniversity(id);
    if (result?.data?.success) {
      toast.success(result?.data?.message);
      setDeleteUniversityData(null);
      setOpenDeleteUniversityModal(!openDeleteUniversityModal);
    } else {
      console.log(result.error);
      toast.error(result?.error?.data?.message);
      setDeleteUniversityData(null);
      setOpenDeleteUniversityModal(!openDeleteUniversityModal);
    }
  };

  return (
    <>
      <Dialog
        open={openDeleteUniversityModal}
        handler={handleOpen}
        animate={{
          mount: { scale: 1, y: 0 },
          unmount: { scale: 0.9, y: -100 },
        }}
      >
        <DialogHeader>Are you want to sure delete this University?</DialogHeader>
        <DialogBody divider>
          <div>
            <Typography>
              <span className="font-semibold">Name: </span>{" "}
              {deleteUniversityData?.name}
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
            onClick={() => handleDelete(deleteUniversityData?._id)}
          >
            <span>Confirm</span>
          </Button>
        </DialogFooter>
      </Dialog>
    </>
  );
};

export default DeleteUniversityModal;
