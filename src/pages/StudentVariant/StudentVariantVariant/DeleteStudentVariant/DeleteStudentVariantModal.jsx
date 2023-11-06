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
import { useDeleteStudentVariantMutation } from "../../../../store/service/studentVariant/studentVariantApiService";



const DeleteStudentVariantModal = ({
  setDeleteStudentVariantData,
  deleteStudentVariantData,
  setOpenDeleteStudentVariantModal,
  openDeleteStudentVariantModal,
}) => {
  const [deleteStudentVariant] = useDeleteStudentVariantMutation()

  const handleClose = () => {
    setDeleteStudentVariantData(null);
    setOpenDeleteStudentVariantModal(!openDeleteStudentVariantModal);
  };
  const handleOpen = () => {
    setDeleteStudentVariantData(null);
    setOpenDeleteStudentVariantModal(!openDeleteStudentVariantModal);
  };

  // handle delete Student variant function
  const handleDelete = async (name) => {
    const result = await deleteStudentVariant({name});
    if (result?.data?.success) {
      toast.success(result?.data?.message);
      setDeleteStudentVariantData(null);
      setOpenDeleteStudentVariantModal(!openDeleteStudentVariantModal);
    } else {
      console.log(result.error);
      toast.error(result?.error?.data?.message);
      setDeleteStudentVariantData(null);
      setOpenDeleteStudentVariantModal(!openDeleteStudentVariantModal);
    }
  };

  return (
    <>
      <Dialog
        open={openDeleteStudentVariantModal}
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
              {deleteStudentVariantData?.variantName}
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
            onClick={() => handleDelete(deleteStudentVariantData?.variantName)}
          >
            <span>Confirm</span>
          </Button>
        </DialogFooter>
      </Dialog>
    </>
  );
};

export default DeleteStudentVariantModal;
