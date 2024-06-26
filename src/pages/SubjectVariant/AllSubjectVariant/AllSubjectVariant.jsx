import { useState } from "react";
import { FaTrash } from "react-icons/fa";
import { Button } from "@material-tailwind/react";

import AddSubjectVariantModal from "./AddSubjectVariantModal/AddSubjectVariantModal";
import DeleteModal from "../../../components/Shared/DeleteModal/DeleteModal";
import EditSubjectVariantModal from "./EditSubjectVariantModal/EditSubjectVariantModal";
import DataTable from "../../../components/Shared/DataTable/DataTable";

import {
    useDeleteSubjectVariantMutation,
    useGetSubjectVariantQuery,
} from "../../../store/service/subjectVariant/subjectVariantApiService";

const AllSubjectVariant = () => {
    /* for delete state */
    const [openSubjectVariantModal, setOpenSubjectVariantModal] =
        useState(false);
    const [deleteSubjectVariantData, setDeleteSubjectVariantData] =
        useState(null);
    const [openDeleteSubjectVariantModal, setOpenDeleteSubjectVariantModal] =
        useState(false);

    /* Edit State */
    const [editSubjectVariantData, setEditSubjectVariantData] = useState(null);
    const [openEditSubjectVariantModal, setOpenEditSubjectVariantModal] =
        useState(false);

    /* Subject Variant Redux */
    const [deleteSubjectVariant] = useDeleteSubjectVariantMutation();
    const { data: allSubjectVariantData, isLoading } =
        useGetSubjectVariantQuery();
    const allSubjectVariant = allSubjectVariantData?.data;

    return (
        <div className="py-10">
            <div className="flex justify-between items-center mb-5">
                <h1 className="font-bold text-xl md:text-2xl text-white">
                    All Subject Variant
                </h1>
                <div
                    className="font-semibold text-sm border px-6 py-[6px] text-[#1C6BAD] rounded-sm border-sky-200 bg-white cursor-pointer"
                    onClick={() => setOpenSubjectVariantModal(true)}
                >
                    Add New
                </div>
            </div>
            <DataTable
                isLoading={isLoading}
                error={false}
                tableData={allSubjectVariant}
                handleSelectedRowItem={(data) => console.log(data)}
                columns={[
                    { name: "Variant", dataIndex: "variant", key: "_id" },
                    {
                        name: "Subject Class Name",
                        dataIndex: "subjectClassVariant",
                        key: "_id",
                    },
                    {
                        name: "Actions",
                        render: ({ item }) => (
                            <Button
                                color="red"
                                size="md"
                                className="px-3.5 py-2.5 bg-red-400 shadow-lg"
                                onClick={() => {
                                    setDeleteSubjectVariantData(item),
                                        setOpenDeleteSubjectVariantModal(true);
                                }}
                            >
                                <FaTrash className="text-[12px]" />
                            </Button>
                        ),
                    },
                ]}
            />

            {/* Open Subject Variant Modal  */}
            {openSubjectVariantModal && (
                <AddSubjectVariantModal
                    openAddSubjectVariantModal={openSubjectVariantModal}
                    setOpenAddSubjectVariantModal={setOpenSubjectVariantModal}
                />
            )}
            {/* Open Edit Subject Variant Modal  */}
            {openEditSubjectVariantModal && (
                <EditSubjectVariantModal
                    editData={editSubjectVariantData}
                    openEditSubjectVariantModal={openEditSubjectVariantModal}
                    setOpenEditSubjectVariantBoard={
                        setOpenEditSubjectVariantModal
                    }
                />
            )}
            {/* Open Delete Subject Variant Modal  */}
            {openDeleteSubjectVariantModal && (
                <DeleteModal
                    id={deleteSubjectVariantData?._id}
                    name={deleteSubjectVariantData?.variant}
                    setDeleteData={setDeleteSubjectVariantData}
                    openDeleteModal={openDeleteSubjectVariantModal}
                    setOpenDeleteModal={setOpenDeleteSubjectVariantModal}
                    deleteFunction={deleteSubjectVariant}
                />
            )}
        </div>
    );
};

export default AllSubjectVariant;
