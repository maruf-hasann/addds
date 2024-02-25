import { useState } from "react";
import { Button } from "@material-tailwind/react";
import { FaTrash } from "react-icons/fa";

import { useGetUniversitiesQuery } from "../../../store/service/university/universityApiService";

import DeleteUniversityModal from "./DeleteUniversity/DeleteUniversityModal";
import AddUniversityModal from "./AddUniversityModal/AddUniversityModal";
import EditUniversityModal from "./EditUniversityModal/EditUniversityModal";
import DataTable from "../../../components/Shared/DataTable/DataTable";

const AllUniversity = () => {
    const [openUniversityModal, setOpenUniversityModal] = useState(false);
    const [deleteUniversityData, setDeleteUniversityData] = useState(null);
    const [openDeleteUniversityModal, setOpenDeleteUniversityModal] =
        useState(false);

    /* Edit */
    const [editUniversityData, setEditUniversityData] = useState(null);
    const [openEditUniversityModal, setOpenEditUniversityModal] =
        useState(false);

    const { data: allUniversitiesData, isLoading } = useGetUniversitiesQuery();
    const universities = allUniversitiesData?.data;

    return (
        <>
            <div className="py-10">
                <div className="flex justify-between items-center  pb-3">
                    <h1 className="font-bold text-xl md:text-2xl text-white">
                        All University
                    </h1>
                    <div
                        className="font-semibold text-sm border px-6 py-[6px] text-[#1C6BAD] rounded-sm border-sky-200 bg-white cursor-pointer"
                        onClick={() => setOpenUniversityModal(true)}
                    >
                        Add New
                    </div>
                </div>
                <DataTable
                    isLoading={isLoading}
                    error={false}
                    tableData={universities}
                    handleSelectedRowItem={(data) => console.log(data)}
                    columns={[
                        { name: "Name", dataIndex: "name", key: "_id" },
                        { name: "Division", dataIndex: "division", key: "_id" },
                        {
                            name: "Actions",
                            render: ({ item }) => (
                                <Button
                                    color="red"
                                    size="md"
                                    className="px-3.5 py-2.5 bg-red-400 shadow-lg"
                                    onClick={() => {
                                        setDeleteUniversityData(item),
                                            setOpenDeleteUniversityModal(true);
                                    }}
                                >
                                    <FaTrash className="text-[12px]" />
                                </Button>
                            ),
                        },
                    ]}
                />
            </div>
            {openDeleteUniversityModal && deleteUniversityData && (
                <DeleteUniversityModal
                    deleteUniversityData={deleteUniversityData}
                    openDeleteUniversityModal={openDeleteUniversityModal}
                    setDeleteUniversityData={setDeleteUniversityData}
                    setOpenDeleteUniversityModal={setOpenDeleteUniversityModal}
                />
            )}
            {openEditUniversityModal && (
                <EditUniversityModal
                    editData={editUniversityData}
                    openUniversityModal={openEditUniversityModal}
                    setOpenUniversityModal={setOpenEditUniversityModal}
                />
            )}
            {openUniversityModal && (
                <AddUniversityModal
                    openAddUniversityModal={openUniversityModal}
                    setOpenAddUniversityModal={setOpenUniversityModal}
                />
            )}
        </>
    );
};

export default AllUniversity;
