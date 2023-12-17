import { Link } from "react-router-dom";
import { FaEdit, FaTrash } from "react-icons/fa";
import { useState } from "react";
import DeleteTutoringPlaceModal from "./DeleteTutoringPlace/DeleteTutoringPlaceModal";
import EditTutoringPlaceModal from "./EditTutoringPlace/EditTutoringPlace";
import { useGetTutoringPlacesQuery } from "../../../store/service/tutoringPlace/tutoringPlaceApiService";
import AddTutoringPlaceModal from "./AddTutoringPlaceModal/AddTutoringPlaceModal";

const AllTutoringPlace = () => {
  const [openTutoringPlaceModal, setOpenTutoringPlaceModal] = useState(false);

  const [deleteTutoringPlaceData, setDeleteTutoringPlaceData] = useState(null);
  const [openDeleteTutoringPlaceModal, setOpenDeleteTutoringPlaceModal] =
    useState(false);

  const [editTutoringPlaceData, setEditTutoringPlaceData] = useState(null);
  const [openEditTutoringPlaceModal, setOpenEditTutoringPlaceModal] =
    useState(false);

  const { data: tutoringPlacesData } = useGetTutoringPlacesQuery();
  const tutoringPlaces = tutoringPlacesData?.data;

  return (
    <>
      <div className="py-10">
        <div className="flex justify-between items-center pb-3">
          <h1 className="font-bold text-2xl text-white">All Tutoring Place</h1>
          <div
            className="font-semibold text-sm border px-6 py-[6px] text-[#1C6BAD] rounded-sm border-sky-200 bg-white cursor-pointer"
            onClick={() => setOpenTutoringPlaceModal(true)}
          >
            Add New
          </div>
        </div>
        <div className="overflow-x-auto border-x rounded bg-white">
          <table className="w-full min-w-max table-auto text-left border">
            {/* head */}
            <thead>
              <tr>
                <th className="text-gray-900 border-blue-100 bg-blue-100 px-4 py-2 font-semibold w-[120px]">
                  Sl
                </th>
                <th className="text-gray-900 border-blue-100 bg-blue-100 px-4 py-2 font-semibold">
                  Name
                </th>
                <th className="text-gray-900 border-blue-100 bg-blue-100 px-4 py-2 font-semibold w-[120px] text-center">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {/* row 1 */}
              {tutoringPlaces?.map((place, idx) => {
                const classes =
                  "p-4 text-base text-gray-800 font-normal border-b";
                return (
                  <tr key={place._id} className={` hover:bg-blue-50`}>
                    <th className={`${classes} w-[120px]`}>{idx + 1}</th>
                    <td className={classes}>{place?.placeName}</td>
                    <td className={`${classes} w-[120px]`}>
                      <div className="flex justify-evenly items-center">
                        <FaTrash
                          onClick={() => {
                            setDeleteTutoringPlaceData(place),
                              setOpenDeleteTutoringPlaceModal(true);
                          }}
                          className="cursor-pointer hover:text-red-500"
                        />{" "}
                        <FaEdit
                          onClick={() => {
                            setEditTutoringPlaceData(place),
                              setOpenEditTutoringPlaceModal(true);
                          }}
                          className="cursor-pointer hover:text-sky-500"
                        />
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
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
