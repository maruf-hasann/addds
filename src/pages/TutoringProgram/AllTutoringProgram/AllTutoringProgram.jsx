import { useState } from "react";
import { Button } from "@material-tailwind/react";
import {  FaTrash } from "react-icons/fa";

import DeleteTutoringProgramModal from "./DeleteTutoringProgram/DeleteTutoringProgramModal";
import EditTutoringProgramModal from "./EditTutoringProgram/EditTutoringProgram";
import AddTutoringProgramModal from "./AddTutoringProgramModal/AddTutoringProgramModal";
import DataTable from "../../../components/Shared/DataTable/DataTable";

import { useGetTutoringProgramsQuery } from "../../../store/service/tutoringProgram/tutoringProgramApiService";

const AllTutoringProgram = () => {
    const [openTutoringProgramModal, setOpenTutoringProgramModal] =
        useState(false);

    const [deleteTutoringProgramData, setDeleteTutoringProgramData] =
        useState(null);
    const [openDeleteTutoringProgramModal, setOpenDeleteTutoringProgramModal] =
        useState(false);

    const [editTutoringProgramData, setEditTutoringProgramData] =
        useState(null);
    const [openEditTutoringProgramModal, setOpenEditTutoringProgramModal] =
        useState(false);

    const { data: tutoringProgramsData, isLoading } =
        useGetTutoringProgramsQuery();
    const tutoringPrograms = tutoringProgramsData?.data;

    return (
        <>
            <div className="py-10">
                <div className="flex justify-between items-center mb-5">
                    <h1 className="font-bold text-xl md:text-2xl text-white">
                        All Tutoring Program
                    </h1>
                    <div
                        className="font-semibold text-sm border px-6 py-[6px] text-[#1C6BAD] rounded-sm border-sky-200 bg-white cursor-pointer"
                        onClick={() => setOpenTutoringProgramModal(true)}
                    >
                        Add New
                    </div>
                </div>
                <DataTable
                    isLoading={isLoading}
                    error={false}
                    tableData={tutoringPrograms}
                    handleSelectedRowItem={(data) => console.log(data)}
                    columns={[
                        { name: "Name", dataIndex: "programName", key: "_id" },
                        {
                            name: "Actions",
                            render: ({ item }) => (
                                <Button
                                    color="red"
                                    size="md"
                                    className="px-3.5 py-2.5 bg-red-400 shadow-lg"
                                    onClick={() => {
                                        setDeleteTutoringProgramData(item),
                                            setOpenDeleteTutoringProgramModal(
                                                true
                                            );
                                    }}
                                >
                                    <FaTrash className="text-[12px]" />
                                </Button>
                            ),
                        },
                    ]}
                />
            </div>
            {openDeleteTutoringProgramModal && deleteTutoringProgramData && (
                <DeleteTutoringProgramModal
                    deleteTutoringProgramData={deleteTutoringProgramData}
                    openDeleteTutoringProgramModal={
                        openDeleteTutoringProgramModal
                    }
                    setDeleteTutoringProgramData={setDeleteTutoringProgramData}
                    setOpenDeleteTutoringProgramModal={
                        setOpenDeleteTutoringProgramModal
                    }
                />
            )}
            {openEditTutoringProgramModal && editTutoringProgramData && (
                <EditTutoringProgramModal
                    editTutoringProgramData={editTutoringProgramData}
                    openEditTutoringProgramModal={openEditTutoringProgramModal}
                    setEditTutoringProgramData={setOpenEditTutoringProgramModal}
                    setOpenEditTutoringProgramModal={
                        setOpenEditTutoringProgramModal
                    }
                />
            )}
            {openTutoringProgramModal && (
                <AddTutoringProgramModal
                    openAddTutoringProgramModal={openTutoringProgramModal}
                    setOpenAddTutoringProgramModal={setOpenTutoringProgramModal}
                />
            )}
        </>
    );
};

export default AllTutoringProgram;
