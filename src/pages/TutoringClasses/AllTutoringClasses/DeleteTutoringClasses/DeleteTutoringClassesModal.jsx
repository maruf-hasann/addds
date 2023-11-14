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
import { useDeleteClassMutation } from "../../../../store/service/tutoringClasses/tutoringClassesApiService";

const DeleteTutoringClassModal = ({
  setDeleteTutoringClassData,
  deleteTutoringClassData,
  setOpenDeleteTutoringClassModal,
  openDeleteTutoringClassModal,
}) => {
  const [deleteTutoringClass] = useDeleteClassMutation();

  const handleClose = () => {
    setDeleteTutoringClassData(null);
    setOpenDeleteTutoringClassModal(!openDeleteTutoringClassModal);
  };
  const handleOpen = () => {
    setDeleteTutoringClassData(null);
    setOpenDeleteTutoringClassModal(!openDeleteTutoringClassModal);
  };

  // handle delete Student variant function
  const handleDelete = async (data) => {
    const result = await deleteTutoringClass({
      class: data.className,
      subject: data.subject,
    });
    if (result?.data?.success) {
      toast.success(result?.data?.message);
      setDeleteTutoringClassData(null);
      setOpenDeleteTutoringClassModal(!openDeleteTutoringClassModal);
    } else {
      console.log(result.error);
      toast.error(result?.error?.data?.message);
      setDeleteTutoringClassData(null);
      setOpenDeleteTutoringClassModal(!openDeleteTutoringClassModal);
    }
  };

  return (
    <>
      <Dialog
        open={openDeleteTutoringClassModal}
        handler={handleOpen}
        animate={{
          mount: { scale: 1, y: 0 },
          unmount: { scale: 0.9, y: -100 },
        }}
      >
        <DialogHeader>
          Are you want to sure delete this Tutoring Class?
        </DialogHeader>
        <DialogBody divider>
          <div>
            <Typography>
              <span className="font-semibold">Class: </span>{" "}
              {deleteTutoringClassData?.className}
            </Typography>
            <Typography>
              <span className="font-semibold">Subject: </span>{" "}
              {deleteTutoringClassData?.subject}
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
            onClick={() => handleDelete(deleteTutoringClassData)}
          >
            <span>Confirm</span>
          </Button>
        </DialogFooter>
      </Dialog>
    </>
  );
};

export default DeleteTutoringClassModal;
