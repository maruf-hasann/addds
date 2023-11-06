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
import { useDeleteSubjectMutation } from "../../../../store/service/boardWiseSubject/boardWiseSubjectApiService";



const DeleteBoardWiseSubjectModal = ({
  setDeleteBoardWiseSubjectData,
  deleteBoardWiseSubjectData,
  setOpenDeleteBoardWiseSubjectModal,
  openDeleteBoardWiseSubjectModal,
}) => {
  const [deleteBoardWiseSubject] = useDeleteSubjectMutation()

  const handleClose = () => {
    setDeleteBoardWiseSubjectData(null);
    setOpenDeleteBoardWiseSubjectModal(!openDeleteBoardWiseSubjectModal);
  };
  const handleOpen = () => {
    setDeleteBoardWiseSubjectData(null);
    setOpenDeleteBoardWiseSubjectModal(!openDeleteBoardWiseSubjectModal);
  };

  // handle delete tutoring variant function
  const handleDelete = async (id) => {
    const result = await deleteBoardWiseSubject({id});
    if (result?.data?.success) {
      toast.success(result?.data?.message);
      setDeleteBoardWiseSubjectData(null);
      setOpenDeleteBoardWiseSubjectModal(!openDeleteBoardWiseSubjectModal);
    } else {
      console.log(result.error);
      toast.error(result?.error?.data?.message);
      setDeleteBoardWiseSubjectData(null);
      setOpenDeleteBoardWiseSubjectModal(!openDeleteBoardWiseSubjectModal);
    }
  };

  return (
    <>
      <Dialog
        open={openDeleteBoardWiseSubjectModal}
        handler={handleOpen}
        animate={{
          mount: { scale: 1, y: 0 },
          unmount: { scale: 0.9, y: -100 },
        }}
      >
        <DialogHeader>Are you want to sure delete this Board Wise Subject?</DialogHeader>
        <DialogBody divider>
          <div>
            <Typography>
              <span className="font-semibold">Name: </span>{" "}
              {deleteBoardWiseSubjectData?.subject}
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
            onClick={() => handleDelete(deleteBoardWiseSubjectData?._id)}
          >
            <span>Confirm</span>
          </Button>
        </DialogFooter>
      </Dialog>
    </>
  );
};

export default DeleteBoardWiseSubjectModal;
