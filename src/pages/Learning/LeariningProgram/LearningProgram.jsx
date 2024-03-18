import React, { useState } from "react";
import ReactPlayer from "react-player";
import AddProgram from "../../../components/Learning/Program/AddProgram";
import { useGetAllProgramQuery } from "../../../store/service/learningProgram/learningProgramApiService";
import DataTable from "../../../components/Shared/DataTable/DataTable";
import { FaRegImage } from "react-icons/fa6";

const LearningProgram = () => {
  const [modalOpen, setModalOpen] = useState(false);
  // redux api
  const { data: programInfo, isLoading } = useGetAllProgramQuery();
  const allProgramData = programInfo?.data;
 

  return (
    <div className="py-10 w-full">
      <div className="flex justify-between items-center mb-5">
        <h1 className="font-bold text-xl md:text-2xl text-white">
          All Program
        </h1>
        <div
          onClick={() => setModalOpen(true)}
          className="font-semibold text-sm border px-6 py-[6px] text-[#1C6BAD] rounded-sm border-sky-200 bg-white cursor-pointer"
        >
          Add Program
        </div>
      </div>
      <DataTable
        isLoading={isLoading}
        error={false}
        tableData={allProgramData}
      
        columns={[
          {
            name: "Media",
            render: ({ item }) => (
              <div>
                {item?.media?.type === "image" ? (
                  <img
                    class="w-[208px] h-[131px] "
                    src={item?.media?.url}
                    alt={item?.name}
                  />
                ) : (
                  <ReactPlayer
                    controls
                    width={"208px"}
                    height={"112px"}
                    url={item?.media?.url}
                  />
                )}
              </div>
            ),
          },
          { name: "Name", dataIndex: "title", key: "_id" },

          {
            name: "Category",
            dataIndex: "programCategory",
            key: "_id",
          },
          {
            name: "Starting Time",
            dataIndex: "startingTime",
            key: "_id",
          },
          {
            name: "Schedule Time",
            dataIndex: "scheduleTime",
            key: "_id",
          },
          {
            name: "Batch No",
            dataIndex: "batchNo",
            key: "_id",
          },
          {
            name: "Youtube Link",
            render: ({ item }) => <div>{item?.externalInfo?.url}</div>,
          },
        ]}
      />
      {/* add Program Modal */}
      {modalOpen && (
        <AddProgram modalOpen={modalOpen} setModalOpen={setModalOpen} />
      )}
    </div>
  );
};

export default LearningProgram;
