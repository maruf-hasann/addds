import { useState } from "react";
import { Button } from "@material-tailwind/react";
import { FaTrash } from "react-icons/fa";

import AddTutoringClassPMModal from "./AddTutoringClassPMModal/AddTutoringClassPMModal";
import DeleteModal from "../../../components/Shared/DeleteModal/DeleteModal";
import DataTable from "../../../components/Shared/DataTable/DataTable";

import {
    useDeleteTutoringClassPMMutation,
    useGetTutoringClassPMQuery,
} from "../../../store/service/tutoringClassPM/tutoringClassPMApiService";

const AllTutoringClassPM = () => {
    const [openTutoringClassPMModal, setOpenTutoringClassPMModal] =
        useState(false);

    const [deleteTutoringClassPMData, setDeleteTutoringClassPMData] =
        useState(null);
    const [openDeleteTutoringClassPMModal, setOpenDeleteTutoringClassPMModal] =
        useState(false);

    const [deleteTutoringClassPM] = useDeleteTutoringClassPMMutation();

    const { data: allTutoringClassPMData, isLoading } =
        useGetTutoringClassPMQuery();
    const allTutoringClassPM = allTutoringClassPMData?.data;

    return (
        <div className="py-10">
            <div className="flex justify-between items-center mb-5">
                <h1 className="font-bold text-xl md:text-2xl text-white">
                    All Tutoring Class
                </h1>
                <div
                    className="font-semibold text-sm border px-6 py-[6px] text-[#1C6BAD] rounded-sm border-sky-200 bg-white cursor-pointer"
                    onClick={() => setOpenTutoringClassPMModal(true)}
                >
                    Add New
                </div>
            </div>
            <DataTable
                isLoading={isLoading}
                error={false}
                tableData={allTutoringClassPM}
                handleSelectedRowItem={(data) => console.log(data)}
                columns={[
                    { name: "Name", dataIndex: "className", key: "_id" },
                    {
                        name: "Variant",
                        dataIndex: "educationVariant",
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
                                    setDeleteTutoringClassPMData(item),
                                        setOpenDeleteTutoringClassPMModal(true);
                                }}
                            >
                                <FaTrash className="text-[12px]" />
                            </Button>
                        ),
                    },
                ]}
            />

            {openTutoringClassPMModal && (
                <AddTutoringClassPMModal
                    openAddTutoringClassPMModal={openTutoringClassPMModal}
                    setOpenAddTutoringClassPMModal={setOpenTutoringClassPMModal}
                />
            )}

            {openDeleteTutoringClassPMModal && (
                <DeleteModal
                    id={deleteTutoringClassPMData?._id}
                    name={deleteTutoringClassPMData?.className}
                    setDeleteData={setDeleteTutoringClassPMData}
                    openDeleteModal={openDeleteTutoringClassPMModal}
                    setOpenDeleteModal={setOpenDeleteTutoringClassPMModal}
                    deleteFunction={deleteTutoringClassPM}
                />
            )}
        </div>
    );
};

export default AllTutoringClassPM;
