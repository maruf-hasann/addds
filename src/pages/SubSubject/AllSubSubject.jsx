import { useState } from "react";
import { Button } from "@material-tailwind/react";
import { FaTrash } from "react-icons/fa";

import AddSubSubjectModal from "./AddSubSubjectModal/AddSubSubjectModal";
import EditSubSubjectModal from "./EditSubSubjectModal/EditSubSubjectModal";
import DeleteModal from "../../components/Shared/DeleteModal/DeleteModal";
import DataTable from "../../components/Shared/DataTable/DataTable";

import {
    useDeleteSubSubjectMutation,
    useGetSubSubjectQuery,
} from "../../store/service/subSubject/subSubjectApiService";

const AllSubSubject = () => {
    const [openSubSubjectModal, setOpenSubSubjectModal] = useState(false);
    const [deleteSubSubjectData, setDeleteSubSubjectData] = useState(null);
    const [openDeleteSubSubjectModal, setOpenDeleteSubSubjectModal] =
        useState(false);

    /* Edit State */
    const [editSubSubjectData, setEditSubSubjectData] = useState(null);
    const [openEditSubSubjectModal, setOpenEditSubSubjectModal] =
        useState(false);

    const [deleteSubSubject] = useDeleteSubSubjectMutation();

    const { data: allSubSubjectData, isLoading } = useGetSubSubjectQuery();
    const allSubSubject = allSubSubjectData?.data;

    return (
        <div className="py-10">
            <div className="flex justify-between items-center mb-5">
                <h1 className="font-bold text-xl md:text-2xl text-white">
                    All Sub Subject
                </h1>
                <div
                    className="font-semibold text-sm border px-6 py-[6px] text-[#1C6BAD] rounded-sm border-sky-200 bg-white cursor-pointer"
                    onClick={() => setOpenSubSubjectModal(true)}
                >
                    Add New
                </div>
            </div>
            <DataTable
                isLoading={isLoading}
                error={false}
                tableData={allSubSubject}
                handleSelectedRowItem={(data) => console.log(data)}
                columns={[
                    {
                        name: "Main Subject",
                        dataIndex: "mainSubject",
                        key: "_id",
                    },
                    {
                        name: "Sub Subject",
                        dataIndex: "subSubject",
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
                                    setDeleteSubSubjectData(item),
                                        setOpenDeleteSubSubjectModal(true);
                                }}
                            >
                                <FaTrash className="text-[12px]" />
                            </Button>
                        ),
                    },
                ]}
            />

            {openSubSubjectModal && (
                <AddSubSubjectModal
                    openAddSubSubjectModal={openSubSubjectModal}
                    setOpenAddSubSubjectModal={setOpenSubSubjectModal}
                />
            )}

            {/* Open Edit Subject Variant Modal  */}
            {openEditSubSubjectModal && (
                <EditSubSubjectModal
                    editData={editSubSubjectData}
                    openEditSubSubjectModal={openEditSubSubjectModal}
                    setOpenEditSubSubject={setOpenEditSubSubjectModal}
                />
            )}

            {openDeleteSubSubjectModal && (
                <DeleteModal
                    id={deleteSubSubjectData?._id}
                    name={deleteSubSubjectData?.subSubject}
                    setDeleteData={setDeleteSubSubjectData}
                    openDeleteModal={openDeleteSubSubjectModal}
                    setOpenDeleteModal={setOpenDeleteSubSubjectModal}
                    deleteFunction={deleteSubSubject}
                />
            )}
        </div>
    );
};

export default AllSubSubject;
