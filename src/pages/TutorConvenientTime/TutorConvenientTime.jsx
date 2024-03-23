import React, { useState } from "react";
import { FaEdit,  FaTrash } from "react-icons/fa";
import { Button } from "@material-tailwind/react";
import DataTable from "../../components/Shared/DataTable/DataTable";
import {
  useDeleteTutorConvenientTimeMutation,
  useGetTutorConvenientTimeQuery,
} from "../../store/service/TutorConvenientTime/TutorConvenientTimeApiService";
import AddConvenientTime from "../../components/TutorConvenientTime/AddConvenientTime";
import DeleteModal from "../../components/Shared/DeleteModal/DeleteModal";
import UpdateTutorConvenientTime from "../../components/TutorConvenientTime/UpdateTutorConvenientTime";

const TutorConvenientTime = () => {
  const [state, setState] = useState({
    modalOpen: false,
    deleteModal: false,
    timeData: null,
    updateModal: false,
    updateData: null,

    
  });

  // redux api
  const { data: timeInfo, isLoading } = useGetTutorConvenientTimeQuery();
  const convenientTime = timeInfo?.data;
  // delete api
  const [deleteTutorConvenientTime] = useDeleteTutorConvenientTimeMutation();
  // Function to update state
  const updateTimeData = (newState) => {
    setState((prev) => ({
      ...prev,
      timeData: newState,
    }));
  };
  // close deleteModalFunc
  const closeDeleteModal = (newState) => {
    setState((prev) => ({
      ...prev,
      deleteModal: newState,
    }));
  };
  // closeUpdate modal
   const closeUpdateModal = (newState) => {
     setState((prev) => ({
       ...prev,
       updateModal: newState,
     }));
   };
  return (
    <>
      <div className="py-10">
        <div className="flex justify-between items-center mb-5">
          <h1 className="font-bold text-xl md:text-2xl text-white">
            All Tutoring Place
          </h1>
          <div
            className="font-semibold text-sm border px-6 py-[6px] text-[#1C6BAD] rounded-sm border-sky-200 bg-white cursor-pointer"
            onClick={() =>
              setState((prev) => ({
                ...prev,
                modalOpen: true,
              }))
            }
          >
            Add New
          </div>
        </div>
        <DataTable
          isLoading={isLoading}
          error={false}
          tableData={convenientTime}
          columns={[
            { name: "Time", dataIndex: "timer", key: "_id" },
            {
              name: "Actions",
              render: ({ item }) => (
                <div>
                  <Button
                    size="md"
                    className="px-3.5 py-2.5 bg-green-400  me-4"
                    onClick={() =>
                      setState((prev) => ({
                        ...prev,
                        updateModal: true,
                        updateData: item,
                      }))
                    }
                  >
                    <FaEdit className="text-[12px]" />
                  </Button>
                  <Button
                    color="red"
                    size="md"
                    className="px-3.5 py-2.5 bg-red-400 shadow-lg"
                    onClick={() =>
                      setState((prev) => ({
                        ...prev,
                        deleteModal: true,
                        timeData: item,
                      }))
                    }
                  >
                    <FaTrash className="text-[12px]" />
                  </Button>
                </div>
              ),
            },
          ]}
        />
      </div>
      {state.modalOpen && (
        <AddConvenientTime modalOpen={state?.modalOpen} setState={setState} />
      )}
      {state.deleteModal && (
        <DeleteModal
          id={state?.timeData?._id}
          name={state?.timeData?.timer}
          setDeleteData={updateTimeData}
          openDeleteModal={state?.deleteModal}
          setOpenDeleteModal={closeDeleteModal}
          deleteFunction={deleteTutorConvenientTime}
        />
      )}
      {state.updateModal && (
        <UpdateTutorConvenientTime
          updateModal={state.updateModal}
          setUpdateModal={closeUpdateModal}
          updateData={state.updateData}
        />
      )}
    </>
  );
};

export default TutorConvenientTime;
