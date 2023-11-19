import { Link } from "react-router-dom";
import { useState } from "react";
import { useGetClassesQuery } from "../../../store/service/tutoringClasses/tutoringClassesApiService";
import ViewSubjectModal from "./ViewSubjectModal/ViewSubjectModal";

const AllTutoringClass = () => {
  const [viewSubjectData, setViewSubjectData] = useState(null);
  const [openViewSubjectModal, setOpenViewSubjectModal] = useState(false);

  const { data: allTutoringClassesData } = useGetClassesQuery();
  const allClasses = allTutoringClassesData?.data;

  return (
    <>
      <div className="py-10">
        <div className="flex justify-between items-center pb-3">
          <h1 className="font-bold to-gray-800">All Class</h1>
          <Link
            to={"/add-tutoring-class"}
            className="font-bold border px-4 py-2 text-gray-600 rounded-sm border-sky-200 hover:text-sky-700 bg-white"
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
                  Class Name
                </th>
                <th className="text-gray-800 border-blue-100 bg-blue-50 p-4 font-semibold">
                  Subject
                </th>
              </tr>
            </thead>
            <tbody>
              {/* row 1 */}
              {allClasses?.map((tutoringClass, idx) => {
                const classes = "p-4 border-b border-blue-gray-50 text-base text-gray-800 font-normal";
                return (
                  <tr key={tutoringClass._id} className={` ${idx % 2 !== 0 && 'bg-gray-50'}`}>
                    <th className={classes}>{idx + 1}</th>
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
    </>
  );
};

export default AllTutoringClass;
