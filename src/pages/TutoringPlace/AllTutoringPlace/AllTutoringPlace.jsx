import { Link } from "react-router-dom";
import { FaEdit, FaTrash } from "react-icons/fa";
import { useState } from "react";
import DeleteTutoringPlaceModal from "./DeleteTutoringPlace/DeleteTutoringPlaceModal";
import EditTutoringPlaceModal from "./EditTutoringPlace/EditTutoringPlace";
import { useGetTutoringPlacesQuery } from "../../../store/service/tutoringPlace/tutoringPlaceApiService";
import AddTutoringPlaceModal from "./AddTutoringPlaceModal/AddTutoringPlaceModal";
import DataTable from "../../../components/Shared/DataTable/DataTable";

const AllTutoringPlace = () => {
  const [openTutoringPlaceModal, setOpenTutoringPlaceModal] = useState(false);

  const [deleteTutoringPlaceData, setDeleteTutoringPlaceData] = useState(null);
  const [openDeleteTutoringPlaceModal, setOpenDeleteTutoringPlaceModal] =
    useState(false);

  const [editTutoringPlaceData, setEditTutoringPlaceData] = useState(null);
  const [openEditTutoringPlaceModal, setOpenEditTutoringPlaceModal] =
    useState(false);

  const { data: tutoringPlacesData, isLoading } = useGetTutoringPlacesQuery();
  const tutoringPlaces = tutoringPlacesData?.data;

  return (
    <>
      <div className="py-10">
        <div className="flex justify-between items-center mb-5">
          <h1 className="font-bold text-xl md:text-2xl text-white">
            All Tutoring Place
          </h1>
          <div
            className="font-semibold text-sm border px-6 py-[6px] text-[#1C6BAD] rounded-sm border-sky-200 bg-white cursor-pointer"
            onClick={() => setOpenTutoringPlaceModal(true)}
          >
            Add New
          </div>
        </div>
        <DataTable
          isLoading={isLoading}
          error={false}
          tableData={tutoringPlaces}
          handleSelectedRowItem={(data) => console.log(data)}
          columns={[
            { name: "Name", dataIndex: "placeName", key: "_id" },
            {
              name: "Actions",
              render: ({ item }) => (
                <div className="flex gap-2">
                  <button
                    className=" text-red-500"
                    onClick={() => {
                      setOpenDeleteTutoringPlaceModal(true),
                        setDeleteTutoringPlaceData(item);
                    }}
                  >
                    <FaTrash />
                  </button>
                </div>
              ),
            },
          ]}
        />
      </div>
      {openDeleteTutoringPlaceModal && deleteTutoringPlaceData && (
        <DeleteTutoringPlaceModal
          deleteTutoringPlaceData={deleteTutoringPlaceData}
          openDeleteTutoringPlaceModal={openDeleteTutoringPlaceModal}
          setDeleteTutoringPlaceData={setDeleteTutoringPlaceData}
          setOpenDeleteTutoringPlaceModal={setOpenDeleteTutoringPlaceModal}
        />
      )}
      {openEditTutoringPlaceModal && editTutoringPlaceData && (
        <EditTutoringPlaceModal
          editTutoringPlaceData={editTutoringPlaceData}
          openEditTutoringPlaceModal={openEditTutoringPlaceModal}
          setEditTutoringPlaceData={setOpenEditTutoringPlaceModal}
          setOpenEditTutoringPlaceModal={setOpenEditTutoringPlaceModal}
        />
      )}
      {openTutoringPlaceModal && (
        <AddTutoringPlaceModal
          openAddTutoringPlaceModal={openTutoringPlaceModal}
          setOpenAddTutoringPlaceModal={setOpenTutoringPlaceModal}
        />
      )}
    </>
  );
};

export default AllTutoringPlace;
