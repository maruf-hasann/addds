import { FaEdit, FaTrash } from "react-icons/fa";
import { useState } from "react";
import { useGetUniversitiesQuery } from "../../../store/service/university/universityApiService";
import DeleteUniversityModal from "./DeleteUniversity/DeleteUniversityModal";
import AddUniversityModal from "./AddUniversityModal/AddUniversityModal";
import EditUniversityModal from "./EditUniversityModal/EditUniversityModal";

const AllUniversity = () => {
  const [openUniversityModal, setOpenUniversityModal] = useState(false);
  const [deleteUniversityData, setDeleteUniversityData] = useState(null);
  const [openDeleteUniversityModal, setOpenDeleteUniversityModal] =
    useState(false);

  /* Edit */
  const [editUniversityData, setEditUniversityData] = useState(null);
  const [openEditUniversityModal, setOpenEditUniversityModal] = useState(false);

  const { data: allUniversitiesData } = useGetUniversitiesQuery();
  const universities = allUniversitiesData?.data;

  return (
    <>
      <div className="py-10">
        <div className="flex justify-between items-center  pb-3">
          <h1 className="font-bold text-2xl text-white">All University</h1>
          <div
            className="font-semibold text-sm border px-6 py-[6px] text-[#1C6BAD] rounded-sm border-sky-200 bg-white cursor-pointer"
            onClick={() => setOpenUniversityModal(true)}
          >
            Add New
          </div>
        </div>
        <div className="overflow-x-auto border-x rounded  bg-white">
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
                <th className="text-gray-900 border-blue-100 bg-blue-100 px-4 py-2 font-semibold">
                  Division
                </th>
                <th className="text-gray-900 border-blue-100 bg-blue-100 px-4 py-2 font-semibold w-[120px] text-center">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {/* row 1 */}
              {universities?.map((university, idx) => {
                const classes =
                  "p-4 text-base text-gray-800 font-normal border-b";
                return (
                  <tr key={university._id} className={` hover:bg-blue-50`}>
                    <th className={`${classes} w-[120px]`}>{idx + 1}</th>
                    <td className={classes}>{university?.name}</td>
                    <td className={classes}>{university?.division}</td>
                    <td className={`${classes} w-[120px] flex gap-5`}>
                      <span className="flex justify-evenly items-center">
                        <FaEdit
                          onClick={() => {
                            setEditUniversityData(university),
                              setOpenEditUniversityModal(true);
                          }}
                          className="cursor-pointer hover:text-red-500"
                        />{" "}
                      </span>
                      <span className="flex justify-evenly items-center">
                        <FaTrash
                          onClick={() => {
                            setDeleteUniversityData(university),
                              setOpenDeleteUniversityModal(true);
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
