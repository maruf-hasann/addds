import moment from "moment";
import { BiWorld } from "react-icons/bi";
import { FaLock } from "react-icons/fa";
import DataTable from "../../../../../../components/Shared/DataTable/DataTable";
import { useState } from "react";
import { FaAngleDown } from "react-icons/fa6";

const Images = ({ images, isLoading }) => {
  const [updateVisibility, setUpdateVisibility] = useState(null);
  const [updatePending, setUpdatePending] = useState(null);
  return (
    <div>
      <DataTable
        isLoading={isLoading}
        error={false}
        tableData={images}
        hideSerial={true}
        handleSelectedRowItem={(data) => console.log(data)}
        columns={[
          {
            name: "Video",
            render: ({ item }) => (
              <div className="max-h-28 w-52 flex justify-center items-center border">
                <img
                  src={item?.imgUrl}
                  alt="Image"
                  className="h-28 object-cover"
                />
              </div>
            ),
          },

          {
            name: "Title",
            render: ({ item }) => (
              <div>
                <p className="font-semibold">
                  {item?.title?.length > 20
                    ? item?.title?.slice(0, 20) + "..."
                    : item?.title}
                </p>

                <p className="mt-2 text-sm whitespace-normal">
                  {item?.description?.length > 50
                    ? item?.description?.slice(0, 50) + "..."
                    : item?.description}
                </p>
              </div>
            ),
          },
          {
            name: "Visibility",
            render: ({ item }) => (
              <div className="flex items-center gap-2 capitalize relative">
                {item?.visibility === "public" ? <BiWorld /> : <FaLock />}
                <p>{item?.visibility}</p>
                <FaAngleDown
                  className="cursor-pointer"
                  onClick={() => {
                    setUpdateVisibility(updateVisibility ? null : item?._id);
                  }}
                />
                {item?._id === updateVisibility ? (
                  <div
                    onMouseLeave={() => {
                      setUpdateVisibility(null);
                    }}
                    className="absolute border border-white -left-10 flex flex-col bg-blue-50"
                  >
                    <p
                      style={{ userSelect: "none" }}
                      className="hover:bg-white px-5 pb-1 cursor-pointer flex items-center gap-2 text-gray-800"
                    >
                      <FaLock /> Private
                    </p>
                    <p
                      style={{ userSelect: "none" }}
                      className="hover:bg-white px-5 pb-1 cursor-pointer flex items-center gap-2 text-gray-800"
                    >
                      <BiWorld /> Public
                    </p>
                  </div>
                ) : (
                  ""
                )}
              </div>
            ),
          },
          {
            name: "Status",
            render: ({ item }) => (
              <div className="flex items-center gap-2 font-semibold capitalize relative">
                {item?.status}{" "}
                <FaAngleDown
                  className="cursor-pointer"
                  onClick={() => {
                    setUpdatePending(updatePending ? null : item?._id);
                  }}
                />
                {item?._id === updatePending ? (
                  <div
                    onMouseLeave={() => {
                      setUpdatePending(null);
                    }}
                    className="absolute border border-white -left-8 -top-4 flex flex-col bg-blue-50 font-normal"
                  >
                    <p
                      style={{ userSelect: "none" }}
                      className="hover:bg-white px-5 pb-1 cursor-pointer flex items-center gap-2 text-gray-800"
                    >
                      Reject
                    </p>
                    <p
                      style={{ userSelect: "none" }}
                      className="hover:bg-white px-5 pb-1 cursor-pointer flex items-center gap-2 text-gray-800"
                    >
                      Pending
                    </p>
                    <p
                      style={{ userSelect: "none" }}
                      className="hover:bg-white px-5 pb-1 cursor-pointer flex items-center gap-2 text-gray-800"
                    >
                      Approve
                    </p>
                  </div>
                ) : (
                  ""
                )}
              </div>
            ),
          },

          {
            name: "Date",
            render: ({ item }) => (
              <div className="flex flex-col gap-1">
                <p className="text-gray-900">
                  {moment(item?.time).format("MMM D, YYYY")}
                </p>
                <p className="text-sm">Published</p>
              </div>
            ),
          },
        ]}
      />
    </div>
  );
};

export default Images;
