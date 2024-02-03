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
import { useDeleteEducationVariantMutation } from "../../../../store/service/educationVariant/educationVariantApiService";

const DeleteEducationVariantModal = ({
  setDeleteEducationVariantData,
  deleteEducationVariantData,
  setOpenDeleteEducationVariantModal,
  openDeleteEducationVariantModal,
}) => {
  const [deleteEducationVariant] = useDeleteEducationVariantMutation();

  const handleClose = () => {
    setDeleteEducationVariantData(null);
    setOpenDeleteEducationVariantModal(!openDeleteEducationVariantModal);
  };
  const handleOpen = () => {
    setDeleteEducationVariantData(null);
    setOpenDeleteEducationVariantModal(!openDeleteEducationVariantModal);
  };

  // handle delete Education variant function
  const handleDelete = async (name) => {
    const result = await deleteEducationVariant({ name });
    if (result?.data?.success) {
      toast.success(result?.data?.message);
      setDeleteEducationVariantData(null);
      setOpenDeleteEducationVariantModal(!openDeleteEducationVariantModal);
    } else {
      console.log(result.error);
      toast.error(result?.error?.data?.message);
      setDeleteEducationVariantData(null);
      setOpenDeleteEducationVariantModal(!openDeleteEducationVariantModal);
    }
  };

  return (
    <>
      <Dialog
        open={openDeleteEducationVariantModal}
        handler={handleOpen}
        animate={{
          mount: { scale: 1, y: 0 },
          unmount: { scale: 0.9, y: -100 },
        }}
      >
        <DialogHeader>
          Are you want to sure delete this Education Variant?
        </DialogHeader>
        <DialogBody divider>
          <div>
            <Typography>
              <span className="font-semibold">Name: </span>{" "}
              {deleteEducationVariantData?.variantName}
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
            onClick={() =>
              handleDelete(deleteEducationVariantData?.variantName)
            }
          >
            <span>Confirm</span>
          </Button>
        </DialogFooter>
      </Dialog>
    </>
  );
};

export default DeleteEducationVariantModal;
