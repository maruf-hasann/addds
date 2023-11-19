import { Link } from "react-router-dom";
import { FaEdit, FaTrash } from "react-icons/fa";
import { useState } from "react";
import DeleteTutoringPlaceModal from "./DeleteTutoringPlace/DeleteTutoringPlaceModal";
import EditTutoringPlaceModal from "./EditTutoringPlace/EditTutoringPlace";
import { useGetTutoringPlacesQuery } from "../../../store/service/tutoringPlace/tutoringPlaceApiService";


const AllTutoringPlace = () => {
  const [deleteTutoringPlaceData, setDeleteTutoringPlaceData] =
    useState(null);
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
          <h1 className="font-bold text-gray-800">All Tutoring Place</h1>
          <Link
            to={"/add-tutoring-place"}
            className="font-bold border px-4 py-2 text-gray-600 rounded-sm border-sky-200 bg-white"
          >
            Add New
          </Link>
        </div>
        <div className="overflow-x-auto border-x rounded bg-white">
          <table className="w-full min-w-max table-auto text-left">
            {/* head */}
            <thead>
              <tr>
                <th className="text-gray-800 border-blue-100 bg-blue-50 p-4 font-semibold">
                  Sl
                </th>
                <th className="text-gray-800 border-blue-100 bg-blue-50 p-4 font-semibold">
                  Name
                </th>
                <th className="text-gray-800 border-blue-100 bg-blue-50 p-4 font-semibold w-[120px] text-center">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {/* row 1 */}
              {tutoringPlaces?.map((place, idx) => {
                const classes = "p-4 border-b border-blue-gray-50 text-base text-gray-800 font-normal";
                return (
                  <tr key={place._id} className={` ${idx % 2 !== 0 && 'bg-gray-50'}`}>
                    <th className={classes}>{idx + 1}</th>
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
    </>
  );
};

export default AllTutoringPlace;
