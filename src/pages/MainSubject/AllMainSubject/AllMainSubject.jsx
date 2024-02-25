import { useState } from "react";
import { FaTrash, FaEdit } from "react-icons/fa";
import AddMainSubjectModal from "./AddMainSubjectModal/AddMainSubjectModal";
import {
    useDeleteMainSubjectMutation,
    useGetMainSubjectQuery,
} from "../../../store/service/mainSubject/mainSubjectApiService";
import DeleteModal from "../../../components/Shared/DeleteModal/DeleteModal";
import EditMainSubjectModal from "./EditMainSubjectModal/EditMainSubjectModal";
import DataTable from "../../../components/Shared/DataTable/DataTable";
import { Button } from "@material-tailwind/react";

const AllMainSubject = () => {
    /* for delete state */
    const [openMainSubjectModal, setOpenMainSubjectModal] = useState(false);
    const [deleteMainSubjectData, setDeleteMainSubjectData] = useState(null);
    const [openDeleteMainSubjectModal, setOpenDeleteMainSubjectModal] =
        useState(false);

    /* Edit state */
    const [editMainSubjectData, setEditMainSubjectData] = useState(null);
    const [openEditMainSubjectModal, setOpenEditMainSubjectModal] =
        useState(false);

    /* redux api call */
    const [deleteMainSubject] = useDeleteMainSubjectMutation();
    const { data: allMainSubjectData, isLoading } = useGetMainSubjectQuery();
    const allMainSubject = allMainSubjectData?.data;

    return (
        <div className="py-10">
            <div className="flex justify-between items-center mb-5">
                <h1 className="font-bold text-xl md:text-2xl text-white">
                    All Main Subject
                </h1>
                <div
                    className="font-semibold text-sm border px-6 py-[6px] text-[#1C6BAD] rounded-sm border-sky-200 bg-white cursor-pointer"
                    onClick={() => setOpenMainSubjectModal(true)}
                >
                    Add New
                </div>
            </div>
            <DataTable
                isLoading={isLoading}
                error={false}
                tableData={allMainSubject}
                handleSelectedRowItem={(data) => console.log(data)}
                columns={[
                    { name: "Name", dataIndex: "name", key: "_id" },
                    {
                        name: "Subject Variant",
                        dataIndex: "subjectVariant",
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
                                    setDeleteMainSubjectData(item),
                                        setOpenDeleteMainSubjectModal(true);
                                }}
                            >
                                <FaTrash className="text-[12px]" />
                            </Button>
                        ),
                    },
                ]}
            />

            {/* Open Add Main Subject Modal  */}
            {openMainSubjectModal && (
                <AddMainSubjectModal
                    openAddMainSubjectModal={openMainSubjectModal}
                    setOpenAddMainSubjectModal={setOpenMainSubjectModal}
                />
            )}

            {/* Open Edit Main Subject Modal  */}
            {openEditMainSubjectModal && (
                <EditMainSubjectModal
                    editData={editMainSubjectData}
                    openEditMainSubjectModal={openEditMainSubjectModal}
                    setOpenEditMainSubjectModal={setOpenEditMainSubjectModal}
                />
            )}

            {/* Open Delete Main Subject Modal  */}
            {openDeleteMainSubjectModal && (
                <DeleteModal
                    id={deleteMainSubjectData?._id}
                    name={deleteMainSubjectData?.name}
                    setDeleteData={setDeleteMainSubjectData}
                    openDeleteModal={openDeleteMainSubjectModal}
                    setOpenDeleteModal={setOpenDeleteMainSubjectModal}
                    deleteFunction={deleteMainSubject}
                />
            )}
        </div>
    );
};

export default AllMainSubject;
