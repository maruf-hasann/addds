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
import { useDeleteTutoringVariantMutation } from "../../../../store/service/tutoringVariant/tutoringVariantApiService";



const DeleteTutoringVariantModal = ({
  setDeleteTutoringVariantData,
  deleteTutoringVariantData,
  setOpenDeleteTutoringVariantModal,
  openDeleteTutoringVariantModal,
}) => {
  const [deleteTutoringVariant] = useDeleteTutoringVariantMutation()

  const handleClose = () => {
    setDeleteTutoringVariantData(null);
    setOpenDeleteTutoringVariantModal(!openDeleteTutoringVariantModal);
  };
  const handleOpen = () => {
    setDeleteTutoringVariantData(null);
    setOpenDeleteTutoringVariantModal(!openDeleteTutoringVariantModal);
  };

  // handle delete tutoring variant function
  const handleDelete = async (name) => {
    const result = await deleteTutoringVariant({name});
    if (result?.data?.success) {
      toast.success(result?.data?.message);
      setDeleteTutoringVariantData(null);
      setOpenDeleteTutoringVariantModal(!openDeleteTutoringVariantModal);
    } else {
      console.log(result.error);
      toast.error(result?.error?.data?.message);
      setDeleteTutoringVariantData(null);
      setOpenDeleteTutoringVariantModal(!openDeleteTutoringVariantModal);
    }
  };

  return (
    <>
      <Dialog
        open={openDeleteTutoringVariantModal}
        handler={handleOpen}
        animate={{
          mount: { scale: 1, y: 0 },
          unmount: { scale: 0.9, y: -100 },
        }}
      >
        <DialogHeader>Are you want to sure delete this Tutoring Variant?</DialogHeader>
        <DialogBody divider>
          <div>
            <Typography>
              <span className="font-semibold">Name: </span>{" "}
              {deleteTutoringVariantData?.variantName}
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
            onClick={() => handleDelete(deleteTutoringVariantData?.variantName)}
          >
            <span>Confirm</span>
          </Button>
        </DialogFooter>
      </Dialog>
    </>
  );
};

export default DeleteTutoringVariantModal;
