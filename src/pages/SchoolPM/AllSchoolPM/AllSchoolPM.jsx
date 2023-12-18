import { useState } from "react";
import { FaTrash, FaEdit } from "react-icons/fa";

import AddSchoolPMModal from "./AddSchoolPMModal/AddSchoolPMModal";
import {
  useDeleteSchoolPMMutation,
  useGetSchoolPMQuery,
} from "../../../store/service/schoolPM/schoolPMApiService";

import DeleteModal from "../../../components/Shared/DeleteModal/DeleteModal";
import EditSchoolPMModal from "./EditSchoolPMModal/EditSchoolPMModal";

const AllSchoolPM = () => {
  const [openSchoolPMModal, setOpenSchoolPMModal] = useState(false);
  const [deleteSchoolPMData, setDeleteSchoolPMData] = useState(null);
  const [openDeleteSchoolPMModal, setOpenDeleteSchoolPMModal] = useState(false);
  /* Edit */
  const [editSchoolPMData, setEditSchoolPMData] = useState(null);
  const [openEditSchoolPMModal, setOpenEditSchoolPMModal] = useState(false);

  const [deleteSchoolPM] = useDeleteSchoolPMMutation();

  const { data: allSchoolPMData } = useGetSchoolPMQuery();
  const allSchoolPM = allSchoolPMData?.data;

  return (
    <div className="py-10">
      <div className="flex justify-between items-center mb-5">
        <h1 className="font-bold text-2xl text-white">All School PM</h1>
        <div
          className="font-semibold text-sm border px-6 py-[6px] text-[#1C6BAD] rounded-sm border-sky-200 bg-white cursor-pointer"
          onClick={() => setOpenSchoolPMModal(true)}
        >
          Add New
        </div>
      </div>
      <div className="overflow-x-auto rounded bg-white">
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
                Variant
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
            {allSchoolPM?.map((schoolPM, idx) => {
              const classes =
                "p-4 text-base text-gray-800 font-normal border-b";
              return (
                <tr className={`hover:bg-blue-50`} key={schoolPM?._id}>
                  <th className={`${classes} w-[120px]`}>{idx + 1}</th>
                  <td className={classes}>{schoolPM?.schoolName}</td>
                  <td className={classes}>{schoolPM?.educationVariant}</td>
                  <td className={classes}>{schoolPM?.division}</td>
                  <td className={`${classes} w-[120px] flex gap-3`}>
                    <span className="flex justify-evenly items-center">
                      <FaEdit
                        onClick={() => {
                          setEditSchoolPMData(schoolPM),
                            setOpenEditSchoolPMModal(true);
                        }}
                        className="cursor-pointer hover:text-red-500"
                      />{" "}
                    </span>
                    <span className="flex justify-evenly items-center">
                      <FaTrash
                        onClick={() => {
                          setDeleteSchoolPMData(schoolPM),
                            setOpenDeleteSchoolPMModal(true);
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
      {openSchoolPMModal && (
        <AddSchoolPMModal
          openAddSchoolPMModal={openSchoolPMModal}
          setOpenAddSchoolPMModal={setOpenSchoolPMModal}
        />
      )}

      {openEditSchoolPMModal && (
        <EditSchoolPMModal
          editData={editSchoolPMData}
          openEditSchoolPMModal={openEditSchoolPMModal}
          setOpenEditSchoolPMModal={setOpenEditSchoolPMModal}
        />
      )}

      {openDeleteSchoolPMModal && (
        <DeleteModal
          id={deleteSchoolPMData?._id}
          name={deleteSchoolPMData?.schoolName}
          setDeleteData={setDeleteSchoolPMData}
          openDeleteModal={openDeleteSchoolPMModal}
          setOpenDeleteModal={setOpenDeleteSchoolPMModal}
          deleteFunction={deleteSchoolPM}
        />
      )}
    </div>
  );
};

export default AllSchoolPM;
