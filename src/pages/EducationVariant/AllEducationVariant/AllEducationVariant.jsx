import { FaTrash } from "react-icons/fa";
import { useState } from "react";
import DeleteEducationVariantModal from "./DeleteEducationVariant/DeleteEducationVariantModal";
import { useGetEducationVariantsQuery } from "../../../store/service/educationVariant/educationVariantApiService";
import AddEducationVariantModal from "./AddEducationVariantModal/AddEducationVariantModal";
import DataTable from "../../../components/Shared/DataTable/DataTable";
import { Button } from "@material-tailwind/react";

const AllEducationVariant = () => {
    const [openAddEducationVariantModal, setOpenAddEducationVariantModal] =
        useState(false);

    const [deleteEducationVariantData, setDeleteEducationVariantData] =
        useState(null);
    const [
        openDeleteEducationVariantModal,
        setOpenDeleteEducationVariantModal,
    ] = useState(false);

    const { data: educationVariantsData, isLoading } =
        useGetEducationVariantsQuery();
    const educationVariants = educationVariantsData?.data;

    return (
        <div className="py-10">
            <div className="flex justify-between items-center mb-5">
                <h1 className="font-bold text-xl md:text-2xl text-white">
                    All Education Variant
                </h1>
                <div
                    className="font-semibold text-sm border px-6 py-[6px] text-[#1C6BAD] rounded-sm border-sky-200 bg-white cursor-pointer"
                    onClick={() => setOpenAddEducationVariantModal(true)}
                >
                    Add New
                </div>
            </div>
            <DataTable
                isLoading={isLoading}
                error={false}
                tableData={educationVariants}
                handleSelectedRowItem={(data) => console.log(data)}
                columns={[
                    { name: "Name", dataIndex: "variantName", key: "_id" },
                    {
                        name: "Actions",
                        render: ({ item }) => (
                            <div className="flex gap-2">
                                <Button
                                    color="red"
                                    size="md"
                                    className="px-4 bg-red-400 shadow-lg"
                                    onClick={() => {
                                        setOpenDeleteEducationVariantModal(
                                            true
                                        ),
                                            setDeleteEducationVariantData(item);
                                    }}
                                >
                                   <FaTrash size={14} />
                                </Button>
                            </div>
                        ),
                    },
                ]}
            />

            {openDeleteEducationVariantModal && deleteEducationVariantData && (
                <DeleteEducationVariantModal
                    deleteEducationVariantData={deleteEducationVariantData}
                    openDeleteEducationVariantModal={
                        openDeleteEducationVariantModal
                    }
                    setDeleteEducationVariantData={
                        setDeleteEducationVariantData
                    }
                    setOpenDeleteEducationVariantModal={
                        setOpenDeleteEducationVariantModal
                    }
                />
            )}

            {openAddEducationVariantModal && (
                <AddEducationVariantModal
                    openAddEducationVariantModal={openAddEducationVariantModal}
                    setOpenAddEducationVariantModal={
                        setOpenAddEducationVariantModal
                    }
                />
            )}
        </div>
    );
};

export default AllEducationVariant;
