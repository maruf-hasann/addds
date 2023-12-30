import { useState } from "react";
import { useGetClassesQuery } from "../../../store/service/tutoringClasses/tutoringClassesApiService";
import ViewSubjectModal from "./ViewSubjectModal/ViewSubjectModal";
import AddTutoringClassModal from "./AddTutoringClassModal/AddTutoringClassModal";
import DataTable from "../../../components/Shared/DataTable/DataTable";

const AllTutoringClass = () => {
  const [openTutoringClassModal, setOpenTutoringClassModal] = useState(false);

  const [viewSubjectData, setViewSubjectData] = useState(null);
  const [openViewSubjectModal, setOpenViewSubjectModal] = useState(false);

  const { data: allTutoringClassesData, isLoading } = useGetClassesQuery();
  const allClasses = allTutoringClassesData?.data;

  return (
    <>
      <div className="py-10">
        <div className="flex justify-between items-center mb-5">
          <h1 className="font-bold text-xl md:text-2xl text-white">
            All Class
          </h1>
          <div
            className="font-semibold text-sm border px-6 py-[6px] text-[#1C6BAD] rounded-sm border-sky-200 bg-white cursor-pointer"
            onClick={() => setOpenTutoringClassModal(true)}
          >
            Add New
          </div>
        </div>
        <DataTable
          isLoading={isLoading}
          error={false}
          tableData={allClasses}
          handleSelectedRowItem={(data) => console.log(data)}
          columns={[
            { name: "Class Name", dataIndex: "className", key: "_id" },
            {
              name: "Actions",
              render: ({ item }) => (
                <div
                  onClick={() => {
                    setViewSubjectData(item), setOpenViewSubjectModal(true);
                  }}
                  className={` cursor-pointer hover:text-blue-gray-500`}
                >
                  View Subjects
                </div>
              ),
            },
          ]}
        />
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
