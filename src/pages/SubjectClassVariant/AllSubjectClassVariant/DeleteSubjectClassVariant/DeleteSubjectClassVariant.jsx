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
import { useDeleteSubjectClassVariantMutation } from "../../../../store/service/subjectClassVariant/subjectClassVariantApiService";

const DeleteSubjectClassVariant = ({
    setDeleteSubjectClassVariantData,
    deleteSubjectClassVariantData,
    setOpenDeleteSubjectClassVariantModal,
    openDeleteSubjectClassVariantModal,
}) => {
    const [deleteSubjectClassVariant] = useDeleteSubjectClassVariantMutation();

    const handleClose = () => {
        setDeleteSubjectClassVariantData(null);
        setOpenDeleteSubjectClassVariantModal(
            !openDeleteSubjectClassVariantModal
        );
    };
    const handleOpen = () => {
        setDeleteSubjectClassVariantData(null);
        setOpenDeleteSubjectClassVariantModal(
            !openDeleteSubjectClassVariantModal
        );
    };

    // handle delete tutoring variant function
    const handleDelete = async (name) => {
        const result = await deleteSubjectClassVariant({ variant: name });
        if (result?.data?.success) {
            toast.success(result?.data?.message);
            setDeleteSubjectClassVariantData(null);
            setOpenDeleteSubjectClassVariantModal(
                !openDeleteSubjectClassVariantModal
            );
        } else {
        
            toast.error(result?.error?.data?.message);
            setDeleteSubjectClassVariantData(null);
            setOpenDeleteSubjectClassVariantModal(
                !openDeleteSubjectClassVariantModal
            );
        }
    };

    return (
        <>
            <Dialog
                open={openDeleteSubjectClassVariantModal}
                handler={handleOpen}
                animate={{
                    mount: { scale: 1, y: 0 },
                    unmount: { scale: 0.9, y: -100 },
                }}
            >
                <DialogHeader>
                    Are you want to sure delete this Tutoring Variant?
                </DialogHeader>
                <DialogBody divider>
                    <div>
                        <Typography>
                            <span className="font-semibold">Name: </span>{" "}
                            {deleteSubjectClassVariantData?.variant}
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
                            handleDelete(
                                deleteSubjectClassVariantData?.variant
                            )
                        }
                    >
                        <span>Confirm</span>
                    </Button>
                </DialogFooter>
            </Dialog>
        </>
    );
};

export default DeleteSubjectClassVariant;
