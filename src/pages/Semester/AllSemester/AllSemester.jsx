import { FaTrash } from "react-icons/fa";
import { useState } from "react";

import { useGetSemestersQuery } from "../../../store/service/semester/semesterApiService";
import DeleteSemesterModal from "./DeleteSemester/DeleteSemesterModal";
import AddSemesterModal from "./AddSemesterModal/AddSemesterModal";
import DataTable from "../../../components/Shared/DataTable/DataTable";
import { Button } from "@material-tailwind/react";

const AllSemester = () => {
    const [openSemesterModal, setOpenSemesterModal] = useState(false);

    const [deleteSemesterData, setDeleteSemesterData] = useState(null);
    const [openDeleteSemesterModal, setOpenDeleteSemesterModal] =
        useState(false);

    const { data: semestersData, isLoading } = useGetSemestersQuery();
    const semesters = semestersData?.data;

    return (
        <>
            <div className="py-10">
                <div className="flex justify-between items-center mb-5">
                    <h1 className="font-bold text-xl md:text-2xl text-white">
                        All Semesters
                    </h1>
                    <div
                        className="font-semibold text-sm border px-6 py-[6px] text-[#1C6BAD] rounded-sm border-sky-200 bg-white cursor-pointer"
                        onClick={() => setOpenSemesterModal(true)}
                    >
                        Add New
                    </div>
                </div>
                <DataTable
                    isLoading={isLoading}
                    error={false}
                    tableData={semesters}
                    handleSelectedRowItem={(data) => console.log(data)}
                    columns={[
                        { name: "Name", dataIndex: "value", key: "_id" },
                        {
                            name: "Actions",
                            render: ({ item }) => (
                                <Button
                                    color="red"
                                    size="md"
                                    className="px-3.5 py-2.5 bg-red-400 shadow-lg"
                                    onClick={() => {
                                        setDeleteSemesterData(item),
                                            setOpenDeleteSemesterModal(true);
                                    }}
                                >
                                    <FaTrash className="text-[12px]" />
                                </Button>
                            ),
                        },
                    ]}
                />
            </div>
            {openDeleteSemesterModal && deleteSemesterData && (
                <DeleteSemesterModal
                    deleteSemesterData={deleteSemesterData}
                    openDeleteSemesterModal={openDeleteSemesterModal}
                    setDeleteSemesterData={setDeleteSemesterData}
                    setOpenDeleteSemesterModal={setOpenDeleteSemesterModal}
                />
            )}
            {openSemesterModal && (
                <AddSemesterModal
                    openAddSemesterModal={openSemesterModal}
                    setOpenAddSemesterModal={setOpenSemesterModal}
                />
            )}
        </>
    );
};

export default AllSemester;
