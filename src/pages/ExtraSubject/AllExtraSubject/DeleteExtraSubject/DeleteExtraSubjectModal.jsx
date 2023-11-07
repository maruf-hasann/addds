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
import { useDeleteExtraSubjectMutation } from "../../../../store/service/extraSubject/extraSubjectApiService";



const DeleteExtraSubjectModal = ({
  setDeleteExtraSubjectData,
  deleteExtraSubjectData,
  setOpenDeleteExtraSubjectModal,
  openDeleteExtraSubjectModal,
}) => {
  const [deleteExtraSubject] = useDeleteExtraSubjectMutation()

  const handleClose = () => {
    setDeleteExtraSubjectData(null);
    setOpenDeleteExtraSubjectModal(!openDeleteExtraSubjectModal);
  };
  const handleOpen = () => {
    setDeleteExtraSubjectData(null);
    setOpenDeleteExtraSubjectModal(!openDeleteExtraSubjectModal);
  };

  // handle delete tutoring variant function
  const handleDelete = async (id) => {
    const result = await deleteExtraSubject({id});
    if (result?.data?.success) {
      toast.success(result?.data?.message);
      setDeleteExtraSubjectData(null);
      setOpenDeleteExtraSubjectModal(!openDeleteExtraSubjectModal);
    } else {
      console.log(result.error);
      toast.error(result?.error?.data?.message);
      setDeleteExtraSubjectData(null);
      setOpenDeleteExtraSubjectModal(!openDeleteExtraSubjectModal);
    }
  };

  return (
    <>
      <Dialog
        open={openDeleteExtraSubjectModal}
        handler={handleOpen}
        animate={{
          mount: { scale: 1, y: 0 },
          unmount: { scale: 0.9, y: -100 },
        }}
      >
        <DialogHeader>Are you want to sure delete this Extra Subject?</DialogHeader>
        <DialogBody divider>
          <div>
            <Typography>
              <span className="font-semibold">Name: </span>{" "}
              {deleteExtraSubjectData?.subject}
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
            onClick={() => handleDelete(deleteExtraSubjectData?._id)}
          >
            <span>Confirm</span>
          </Button>
        </DialogFooter>
      </Dialog>
    </>
  );
};

export default DeleteExtraSubjectModal;
