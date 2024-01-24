import React from "react";
import DataTable from "../../DataTable/DataTable";
import { FaTrash } from "react-icons/fa6";

const CommonIdentityInfo = ({ identityInfo, isLoading }) => {
  return (
    <div className="px-5 py-5 bg-[#f1f5f9]">
      <div className="w-full rounded-md grid grid-cols-1">
        <div className=" px-5 pt-5 border-0 border-b-[1px] border-gray-200 bg-white">
          <p className="font-semibold text-gray-700 ">Photos</p>
        </div>
        <div className="p-5 bg-white">
          {identityInfo?.attachment?.length ? "" : ""}
          <DataTable
            isLoading={isLoading}
            error={false}
            tableData={identityInfo?.attachment}
            hideSerial={true}
            handleSelectedRowItem={(data) => console.log(data)}
            columns={[
              {
                name: "Image",
                render: ({ item }) => (
                  <div className="flex gap-2 w-52 h-32">
                    <img
                      src={item?.url}
                      alt=""
                      className="object-cover w-full"
                    />
                  </div>
                ),
              },
              {
                name: "Title",
                render: ({ item }) => (
                  <div className="capitalize">{item?.title}</div>
                ),
              },
              {
                name: "Action",
                render: ({ item }) => (
                  <div className="flex flex-col gap-1">
                    <FaTrash
                      className="hover:text-red-500 cursor-pointer"
                      onClick={() => {
                        setIsDeleteModalOpen(true),
                          setDeleteData({
                            id: item?._id,
                            phoneNumber: number,
                          });
                      }}
                    />
                  </div>
                ),
              },
            ]}
          />
        </div>
      </div>
    </div>
  );
};

export default CommonIdentityInfo;
