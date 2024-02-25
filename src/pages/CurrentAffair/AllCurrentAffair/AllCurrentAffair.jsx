import { useState } from "react";
import { Button } from "@material-tailwind/react";
import { FaTrash } from "react-icons/fa";

import DeleteCurrentAffairModal from "./DeleteCurrentAffair/DeleteCurrentAffairModal";
import AddCurrentAffairModal from "./AddCurrentAffairModal/AddCurrentAffairModal";
import DataTable from "../../../components/Shared/DataTable/DataTable";

import { useGetCurrentAffairsQuery } from "../../../store/service/currentAffair/currentAffairApiService";

const AllCurrentAffair = () => {
    const [openAddCurrentAffairModal, setOpenAddCurrentAffairModal] =
        useState(false);
    const [deleteCurrentAffairData, setDeleteCurrentAffairData] =
        useState(null);
    const [openDeleteCurrentAffairModal, setOpenDeleteCurrentAffairModal] =
        useState(false);

    const { data: currentAffairsData, isLoading } = useGetCurrentAffairsQuery();
    const currentAffairs = currentAffairsData?.data;

    return (
        <>
            <div className="py-10">
                <div className="flex justify-between items-center mb-5">
                    <h1 className="font-bold text-xl md:text-2xl text-white">
                        All Current Affairs
                    </h1>
                    <div
                        className="font-semibold text-sm border px-6 py-[6px] text-[#1C6BAD] rounded-sm border-sky-200 bg-white cursor-pointer"
                        onClick={() => setOpenAddCurrentAffairModal(true)}
                    >
                        Add New
                    </div>
                </div>
                <DataTable
                    isLoading={isLoading}
                    error={false}
                    tableData={currentAffairs}
                    handleSelectedRowItem={(data) => console.log(data)}
                    columns={[
                        { name: "Name", dataIndex: "affair", key: "_id" },
                        {
                            name: "Actions",
                            render: ({ item }) => (
                                <Button
                                    color="red"
                                    size="md"
                                    className="px-3.5 py-2.5 bg-red-400 shadow-lg"
                                    onClick={() => {
                                        setDeleteCurrentAffairData(item),
                                            setOpenDeleteCurrentAffairModal(
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
            {openDeleteCurrentAffairModal && deleteCurrentAffairData && (
                <DeleteCurrentAffairModal
                    deleteCurrentAffairData={deleteCurrentAffairData}
                    openDeleteCurrentAffairModal={openDeleteCurrentAffairModal}
                    setDeleteCurrentAffairData={setDeleteCurrentAffairData}
                    setOpenDeleteCurrentAffairModal={
                        setOpenDeleteCurrentAffairModal
                    }
                />
            )}
            {openAddCurrentAffairModal && (
                <AddCurrentAffairModal
                    openAddCurrentAffairModal={openAddCurrentAffairModal}
                    setOpenAddCurrentAffairModal={setOpenAddCurrentAffairModal}
                />
            )}
        </>
    );
};

export default AllCurrentAffair;
