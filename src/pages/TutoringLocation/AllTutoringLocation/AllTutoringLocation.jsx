import { useState } from "react";
import { Button } from "@material-tailwind/react";
import { FaTrash } from "react-icons/fa";

import EditTutoringLocationModal from "./EditTutoringLocationModal/EditTutoringLocationModal";
import AddTutoringLocationModal from "./AddTutoringLocationModal/AddTutoringLocationModal";
import DeleteModal from "../../../components/Shared/DeleteModal/DeleteModal";
import DataTable from "../../../components/Shared/DataTable/DataTable";

import {
    useDeleteTutoringLocationByIdMutation,
    useGetAllTutoringLocationQuery,
} from "../../../store/service/tutoringLocation/tutoringLocationApiService";

const AllTutoringLocation = () => {
    const [openTutoringLocationModal, setOpenTutoringLocationModal] =
        useState(false);
    const [deleteTutoringLocationData, setDeleteTutoringLocationData] =
        useState(null);
    const [
        openDeleteTutoringLocationModal,
        setOpenDeleteTutoringLocationModal,
    ] = useState(false);

    /* Edit State */
    const [editTutoringLocationData, setEditTutoringLocationData] =
        useState(null);
    const [openEditTutoringLocationModal, setOpenEditTutoringLocationModal] =
        useState(false);

    const [deleteTutoringLocation] = useDeleteTutoringLocationByIdMutation();

    const { data: allTutoringLocationData, isLoading } =
        useGetAllTutoringLocationQuery();
    const allTutoringLocation = allTutoringLocationData?.data;

    return (
      <div className="py-10">
        <div className="flex justify-between items-center mb-5">
          <h1 className="font-bold text-xl md:text-2xl text-white">
            All Tutoring Location
          </h1>
          <div
            className="font-semibold text-sm border px-6 py-[6px] text-[#1C6BAD] rounded-sm border-sky-200 bg-white cursor-pointer"
            onClick={() => setOpenTutoringLocationModal(true)}
          >
            Add New
          </div>
        </div>
        <DataTable
          isLoading={isLoading}
          error={false}
          tableData={allTutoringLocation}
          handleSelectedRowItem={(data) => console.log(data)}
          columns={[
            { name: "City", dataIndex: "city", key: "_id" },
            {
              name: "Location Name",
              dataIndex: "locationName",
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
                    setDeleteTutoringLocationData(item),
                      setOpenDeleteTutoringLocationModal(true);
                  }}
                >
                  <FaTrash className="text-[12px]" />
                </Button>
              ),
            },
          ]}
        />

        {openTutoringLocationModal && (
          <AddTutoringLocationModal
            openAddTutoringLocationModal={openTutoringLocationModal}
            setOpenTutoringLocationModal={setOpenTutoringLocationModal}
          />
        )}

        {/* Open Edit Subject Variant Modal  */}
        {openEditTutoringLocationModal && (
          <EditTutoringLocationModal
            editData={editTutoringLocationData}
            openEditTutoringLocationModal={openEditTutoringLocationModal}
            setOpenEditTutoringLocation={setOpenEditTutoringLocationModal}
          />
        )}

        {openDeleteTutoringLocationModal && (
          <DeleteModal
            id={deleteTutoringLocationData?._id}
            name={deleteTutoringLocationData?.locationName}
            setDeleteData={setDeleteTutoringLocationData}
            openDeleteModal={openDeleteTutoringLocationModal}
            setOpenDeleteModal={setOpenDeleteTutoringLocationModal}
            deleteFunction={deleteTutoringLocation}
          />
        )}
      </div>
    );
};

export default AllTutoringLocation;
