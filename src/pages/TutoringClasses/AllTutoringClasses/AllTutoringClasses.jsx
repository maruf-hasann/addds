import { Link } from "react-router-dom";
import { useState } from "react";
import { useGetClassesQuery } from "../../../store/service/tutoringClasses/tutoringClassesApiService";
import ViewSubjectModal from "./ViewSubjectModal/ViewSubjectModal";
import AddTutoringClassModal from "./AddTutoringClassModal/AddTutoringClassModal";

const AllTutoringClass = () => {
  const [openTutoringClassModal, setOpenTutoringClassModal] = useState(false);

  const [viewSubjectData, setViewSubjectData] = useState(null);
  const [openViewSubjectModal, setOpenViewSubjectModal] = useState(false);

  const { data: allTutoringClassesData } = useGetClassesQuery();
  const allClasses = allTutoringClassesData?.data;

  return (
    <>
      <div className="py-10">
        <div className="flex justify-between items-center mb-5">
          <h1 className="font-bold text-2xl text-white">All Class</h1>
          <div
            className="font-semibold text-sm border px-6 py-[6px] text-[#1C6BAD] rounded-sm border-sky-200 bg-white cursor-pointer"
            onClick={() => setOpenTutoringClassModal(true)}
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
                  Class Name
                </th>
                <th className="text-gray-900 border-blue-100 bg-blue-100 px-4 py-2 font-semibold">
                  Subject
                </th>
              </tr>
            </thead>
            <tbody>
              {/* row 1 */}
              {allClasses?.map((tutoringClass, idx) => {
                const classes =
                  "p-4 text-base text-gray-800 font-normal border-b";
                return (
                  <tr key={tutoringClass._id} className={` hover:bg-blue-50`}>
                    <th className={`${classes} w-[120px]`}>{idx + 1}</th>
                    <td className={classes}>{tutoringClass?.className}</td>
                    <td
                      onClick={() => {
                        setViewSubjectData(tutoringClass),
                          setOpenViewSubjectModal(true);
                      }}
                      className={`${classes} w-[150px] cursor-pointer hover:text-blue-gray-500`}
                    >
                      View Subjects
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
      {openViewSubjectModal && viewSubjectData && (
        <ViewSubjectModal
          viewSubjectData={viewSubjectData}
          openViewSubjectModal={openViewSubjectModal}
          setViewSubjectData={setViewSubjectData}
          setOpenViewSubjectModal={setOpenViewSubjectModal}
        />
      )}
      {openTutoringClassModal && (
        <AddTutoringClassModal
          openAddTutoringClassModal={openTutoringClassModal}
          setOpenAddTutoringClassModal={setOpenTutoringClassModal}
        />
      )}
    </>
  );
};

export default AllTutoringClass;
