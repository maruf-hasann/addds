import { useState } from "react";
import { FaEdit, FaTrash } from "react-icons/fa";
import EditTutoringLocationModal from "./EditTutoringLocationModal/EditTutoringLocationModal";
import AddTutoringLocationModal from "./AddTutoringLocationModal/AddTutoringLocationModal";
import {
  useDeleteTutoringLocationByIdMutation,
  useGetAllTutoringLocationQuery,
} from "../../../store/service/tutoringLocation/tutoringLocationApiService";
import DeleteModal from "../../../components/Shared/DeleteModal/DeleteModal";

const AllTutoringLocation = () => {
  const [openTutoringLocationModal, setOpenTutoringLocationModal] =
    useState(false);
  const [deleteTutoringLocationData, setDeleteTutoringLocationData] =
    useState(null);
  const [openDeleteTutoringLocationModal, setOpenDeleteTutoringLocationModal] =
    useState(false);

  /* Edit State */
  const [editTutoringLocationData, setEditTutoringLocationData] =
    useState(null);
  const [openEditTutoringLocationModal, setOpenEditTutoringLocationModal] =
    useState(false);

  const [deleteTutoringLocation] = useDeleteTutoringLocationByIdMutation();

  const { data: allTutoringLocationData } = useGetAllTutoringLocationQuery();
  const allTutoringLocation = allTutoringLocationData?.data;

  return (
    <div className="py-10">
      <div className="flex justify-between items-center border-b pb-3">
        <h1 className="font-bold">All Sub Subject</h1>
        <div
          className="font-bold border px-4 py-2 text-gray-600 rounded-sm border-sky-200 bg-white cursor-pointer"
          onClick={() => setOpenTutoringLocationModal(true)}
        >
          Add New
        </div>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full min-w-max table-auto text-left">
          {/* head */}
          <thead>
            <tr>
              <th className="border-b border-blue-gray-100 bg-blue-gray-50 p-4">
                Sl
              </th>
              <th className="border-b border-blue-gray-100 bg-blue-gray-50 p-4">
                City
              </th>
              <th className="border-b border-blue-gray-100 bg-blue-gray-50 p-4">
                Location Name
              </th>

              <th className="border-b border-blue-gray-100 bg-blue-gray-50 p-4 w-[120px]">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {/* row 1 */}
            {allTutoringLocation?.map((tutoringLocation, idx) => {
              const classes = "p-4 border-b border-blue-gray-50";
              return (
                <tr className={classes} key={tutoringLocation?._id}>
                  <th className={classes}>{idx + 1}</th>
                  <td className={classes}>{tutoringLocation?.city}</td>
                  <td className={classes}>{tutoringLocation?.locationName}</td>
                  <td className={`${classes} w-[120px] flex gap-3`}>
                    <span className="flex justify-evenly items-center">
                      <FaEdit
                        onClick={() => {
                          setEditTutoringLocationData(tutoringLocation),
                            setOpenEditTutoringLocationModal(true);
                        }}
                        className="cursor-pointer hover:text-red-500"
                      />{" "}
                    </span>
                    <span className="flex justify-evenly items-center">
                      <FaTrash
                        onClick={() => {
                          setDeleteTutoringLocationData(tutoringLocation),
                            setOpenDeleteTutoringLocationModal(true);
                        }}
                        className="cursor-pointer hover:text-red-500"
                      />{" "}
                    </span>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      {openTutoringLocationModal && (
        <AddTutoringLocationModal
          openAddTutoringLocationModal={openTutoringLocationModal}
          setOpenAddTutoringLocationModal={setOpenTutoringLocationModal}
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
