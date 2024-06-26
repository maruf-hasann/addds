import { useState } from "react";
import { FaTrash } from "react-icons/fa";
import { Button } from "@material-tailwind/react";

import AddSchoolPMModal from "./AddSchoolPMModal/AddSchoolPMModal";
import DeleteModal from "../../../components/Shared/DeleteModal/DeleteModal";
import EditSchoolPMModal from "./EditSchoolPMModal/EditSchoolPMModal";
import DataTable from "../../../components/Shared/DataTable/DataTable";

import {
    useDeleteSchoolPMMutation,
    useGetSchoolPMQuery,
} from "../../../store/service/schoolPM/schoolPMApiService";

const AllSchoolPM = () => {
    const [openSchoolPMModal, setOpenSchoolPMModal] = useState(false);
    const [deleteSchoolPMData, setDeleteSchoolPMData] = useState(null);
    const [openDeleteSchoolPMModal, setOpenDeleteSchoolPMModal] =
        useState(false);
    /* Edit */
    const [editSchoolPMData, setEditSchoolPMData] = useState(null);
    const [openEditSchoolPMModal, setOpenEditSchoolPMModal] = useState(false);

    const [deleteSchoolPM] = useDeleteSchoolPMMutation();

    const { data: allSchoolPMData, isLoading } = useGetSchoolPMQuery();
    const allSchoolPM = allSchoolPMData?.data;

    return (
        <div className="py-10">
            <div className="flex justify-between items-center mb-5">
                <h1 className="font-bold text-xl md:text-2xl text-white">
                    All School PM
                </h1>
                <div
                    className="font-semibold text-sm border px-6 py-[6px] text-[#1C6BAD] rounded-sm border-sky-200 bg-white cursor-pointer"
                    onClick={() => setOpenSchoolPMModal(true)}
                >
                    Add New
                </div>
            </div>
            <DataTable
                isLoading={isLoading}
                error={false}
                tableData={allSchoolPM}
                handleSelectedRowItem={(data) => console.log(data)}
                columns={[
                    { name: "Name", dataIndex: "schoolName", key: "_id" },
                    {
                        name: "Variant",
                        dataIndex: "educationVariant",
                        key: "_id",
                    },
                    { name: "Division", dataIndex: "division", key: "_id" },
                    {
                        name: "Actions",
                        render: ({ item }) => (
                            <Button
                                color="red"
                                size="md"
                                className="px-3.5 py-2.5 bg-red-400 shadow-lg"
                                onClick={() => {
                                    setDeleteSchoolPMData(item),
                                        setOpenDeleteSchoolPMModal(true);
                                }}
                            >
                                <FaTrash className="text-[12px]" />
                            </Button>
                        ),
                    },
                ]}
            />

            {openSchoolPMModal && (
                <AddSchoolPMModal
                    openAddSchoolPMModal={openSchoolPMModal}
                    setOpenAddSchoolPMModal={setOpenSchoolPMModal}
                />
            )}

            {openEditSchoolPMModal && (
                <EditSchoolPMModal
                    editData={editSchoolPMData}
                    openEditSchoolPMModal={openEditSchoolPMModal}
                    setOpenEditSchoolPMModal={setOpenEditSchoolPMModal}
                />
            )}

            {openDeleteSchoolPMModal && (
                <DeleteModal
                    id={deleteSchoolPMData?._id}
                    name={deleteSchoolPMData?.schoolName}
                    setDeleteData={setDeleteSchoolPMData}
                    openDeleteModal={openDeleteSchoolPMModal}
                    setOpenDeleteModal={setOpenDeleteSchoolPMModal}
                    deleteFunction={deleteSchoolPM}
                />
            )}
        </div>
    );
};

export default AllSchoolPM;
