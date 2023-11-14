import { Link } from "react-router-dom";
import { FaEdit, FaTrash } from "react-icons/fa";
import { useState } from "react";
import toast from "react-hot-toast";
import { useGetUniversitiesQuery } from "../../../store/service/university/universityApiService";
import DeleteUniversityModal from "./DeleteUniversity/DeleteUniversityModal";

const AllUniversity = () => {
  const [deleteUniversityData, setDeleteUniversityData] = useState(null);
  const [openDeleteUniversityModal, setOpenDeleteUniversityModal] =
    useState(false);

  const { data: allUniversitiesData } = useGetUniversitiesQuery();
  const universities = allUniversitiesData?.data;

  return (
    <>
      <div className="py-10">
        <div className="flex justify-between items-center border-b pb-3">
          <h1 className="font-bold">All University</h1>
          <Link
            to={"/add-university"}
            className="font-bold border px-4 py-2 text-gray-600 rounded-sm border-sky-200 hover:text-sky-700"
          >
            Add New
          </Link>
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
                <th className="border-b border-blue-gray-100 bg-blue-gray-50 p-4 w-[120px] text-center">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {/* row 1 */}
              {universities?.map((university, idx) => {
                const classes = "p-4 border-b border-blue-gray-50";
                return (
                  <tr key={university._id} className="hover">
                    <th className={classes}>{idx + 1}</th>
                    <td className={classes}>{university?.name}</td>
                    <td className={`${classes} w-[120px]`}>
                      <div className="flex justify-evenly items-center">
                        <FaTrash
                          onClick={() => {
                            setDeleteUniversityData(university),
                              setOpenDeleteUniversityModal(true);
                          }}
                          className="cursor-pointer hover:text-red-500"
                        />{" "}
                        <FaEdit
                          onClick={() =>
                            toast.success("University updated successfully")
                          }
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
      {openDeleteUniversityModal && deleteUniversityData && (
        <DeleteUniversityModal
          deleteUniversityData={deleteUniversityData}
          openDeleteUniversityModal={openDeleteUniversityModal}
          setDeleteUniversityData={setDeleteUniversityData}
          setOpenDeleteUniversityModal={setOpenDeleteUniversityModal}
        />
      )}
    </>
  );
};

export default AllUniversity;
