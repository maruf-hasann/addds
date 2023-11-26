import { useState } from "react";
import { FaTrash } from "react-icons/fa";

import AddSchoolPMModal from "./AddSchoolPMModal/AddSchoolPMModal";
import {
  useDeleteSchoolPMMutation,
  useGetSchoolPMQuery,
} from "../../../store/service/schoolPM/schoolPMApiService";

import DeleteModal from "../../../components/Shared/DeleteModal/DeleteModal";

const AllSchoolPM = () => {
  const [openSchoolPMModal, setOpenSchoolPMModal] = useState(false);
  const [deleteSchoolPMData, setDeleteSchoolPMData] = useState(null);
  const [openDeleteSchoolPMModal, setOpenDeleteSchoolPMModal] = useState(false);

  const [deleteSchoolPM] = useDeleteSchoolPMMutation();

  const { data: allSchoolPMData } = useGetSchoolPMQuery();
  const allSchoolPM = allSchoolPMData?.data;

  return (
    <div className="py-10">
      <div className="flex justify-between items-center border-b pb-3">
        <h1 className="font-bold">All School PM</h1>
        <div
          className="font-bold border px-4 py-2 text-gray-600 rounded-sm border-sky-200 bg-white cursor-pointer"
          onClick={() => setOpenSchoolPMModal(true)}
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
                Name
              </th>

              <th className="border-b border-blue-gray-100 bg-blue-gray-50 p-4">
                Variant
              </th>
              <th className="border-b border-blue-gray-100 bg-blue-gray-50 p-4 w-[120px]">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {/* row 1 */}
            {allSchoolPM?.map((schoolPM, idx) => {
              const classes = "p-4 border-b border-blue-gray-50";
              return (
                <tr className={classes} key={schoolPM?._id}>
                  <th className={classes}>{idx + 1}</th>
                  <td className={classes}>{schoolPM.schoolName}</td>
                  <td className={classes}>{schoolPM?.educationVariant}</td>
                  <td className={`${classes} w-[120px]`}>
                    <div className="flex justify-evenly items-center">
                      <FaTrash
                        onClick={() => {
                          setDeleteSchoolPMData(schoolPM),
                            setOpenDeleteSchoolPMModal(true);
                        }}
                        className="cursor-pointer hover:text-red-500"
                      />{" "}
                    </div>
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
