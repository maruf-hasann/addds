import { useEffect, useState } from "react";
import { FaEdit, FaTrash, FaUpload } from "react-icons/fa";
import { IoEye } from "react-icons/io5";
import ReactPlayer from "react-player";
import moment from "moment";
import toast from "react-hot-toast";
import { useDeleteCoachingMutation } from "../../../../store/service/tutorInfo/coaching/coachingApiService";
import TableSkeleton from "../../../../components/Shared/DataTable/TableSkeleton/TableSkeleton";
import { handleSelectAll } from "../../../../libs/DataTable/handleSelectAll";
import { handleSort } from "../../../../libs/DataTable/handleSort";
import { handleSelectRow } from "../../../../libs/DataTable/handleSelectRow";
import DeleteConfirmationModal from "../../AcademicTutoring/EditAcademicTutoring/EditPromoInfo/DeleteConfirmationModal/DeleteConfirmationModal";
import CommonTextModal from "../../../../components/Shared/CommonTextModal.jsx/CommonTextModal";
import UpdateCoachingModal from "../UpdateCoaching/UpdateCoaching";
import { MdPermMedia } from "react-icons/md";
import { AiOutlineSchedule } from "react-icons/ai";
import { PhotoProvider, PhotoView } from "react-photo-view";
import CoachingDetails from "./CoachingDetails/CoachingDetails";
import AddMedia from "./AddMedia/AddMedia";

const AllCoaching = ({ allCoaching, isLoading }) => {
  const [selectAll, setSelectAll] = useState(false);
  const [sortConfig, setSortConfig] = useState({ key: null, direction: "asc" });
  const [selectedRow, setSelectedRow] = useState([]);
  const [entries, setEntries] = useState(10);
  const [sortedData, setSortedData] = useState([]);
  const [data, setData] = useState([]);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [deleteData, setDeleteData] = useState(null);
  const [currentlyPlayingVideo, setCurrentlyPlayingVideo] = useState(null);

  const [textModalContent, setTextModalContent] = useState("");
  const [isTextModalOpen, setIsTextModalOpen] = useState(false);

  const [updateCoachingData, setUpdateCoachingData] = useState(null);
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);

  const [isScheduleModalOpen, setIsScheduleModalOpen] = useState(false);
  const [scheduleModalData, setScheduleModalData] = useState(null);

  const [isMediaModalOpen, setIsMediaModalOpen] = useState(false);
  const [mediaModalData, setMediaModalData] = useState(null);

  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);
  const [detailsModalData, setDetailsModalData] = useState(null);

  const [isCoachingRoutineModalOpen, setIsCoachingRoutineModalOpen] =
    useState(false);
  const [coachingRoutineModalData, setCoachingRoutineModalData] =
    useState(null);

  const [deleteCoaching, { isLoading: coachingDeleteLoading }] =
    useDeleteCoachingMutation();

  useEffect(() => {
    if (allCoaching) {
      const newData = allCoaching?.map((item, index) => {
        return { ...item, key: index };
      });
      setData(newData);
      setSortedData([...newData]); // Set sortedData initially
    }
  }, [allCoaching]);

  useEffect(() => {
    // Sort the data when sortConfig or data changes
    const newSortedData = [...data].sort((a, b) => {
      if (sortConfig.direction === "asc") {
        return a[sortConfig.key] > b[sortConfig.key] ? 1 : -1;
      } else {
        return a[sortConfig.key] < b[sortConfig.key] ? 1 : -1;
      }
    });
    setSortedData(newSortedData);
  }, [data, sortConfig]);

  // table skeleton
  if (isLoading) {
    return (
      <div className="mt-10">
        {Array.from({ length: 5 }, (_, idx) => (
          <TableSkeleton key={idx} />
        ))}
      </div>
    );
  }

  if (data.length < 1) {
    return (
      <div className="p-5 text-center font-bold dark:bg-boxdark rounded bg-white">
        No data found
      </div>
    );
  }

  const columns = [
    {
      name: "Featured Media",
    },

    {
      name: "Title",
    },
    {
      name: "Education Variant",
    },
    {
      name: "Coaching Variant",
    },
    {
      name: "Curriculum Board",
    },
    {
      name: "Coaching Fee",
    },
    {
      name: "Fee Variation",
    },
    {
      name: "Coaching Place",
    },
    {
      name: "Starting Date",
    },
    {
      name: "Duration",
    },
    {
      name: "Gender",
    },
    {
      name: "About Coaching",
    },
    {
      name: "Program Details",
    },
    {
      name: "Class Routine",
    },
    {
      name: "Action",
    },
  ];

  const handleDeleteCoaching = async () => {
    const result = await deleteCoaching(deleteData);
    if (result?.data?.success) {
      toast.success(result?.data?.message);
      setIsDeleteModalOpen(false);
    } else {
      setIsDeleteModalOpen(false);
      toast.error(result?.error?.data?.message);
    }
  };

  const handleCancelDeleteCoaching = () => {
    // Close the modal without performing the delete action
    setDeleteData(null);
    setIsDeleteModalOpen(false);
  };

  return (
    <div>
      <div className="bg-white rounded-md text-gray-700 px-3 py-10 mt-2">
        <div className="flex flex-col-reverse gap-5 md:flex-row items-center justify-between">
          <div className="flex items-center gap-x-2 ">
            <p>Show</p>
            <select
              className="dark:bg-blue-gray-700 outline-none border-blue-gray-50 px-2 p-1 cursor-pointer rounded"
              value={entries}
              onChange={(e) => setEntries(e.target.value)}
            >
              <option value="10" className="outline-blue-500">
                10
              </option>
              <option value="20" className="outline-none">
                20
              </option>
              <option value="30" className="outline-none">
                30
              </option>
              <option value="40" className="outline-none">
                40
              </option>
              <option value="50" className="outline-none">
                50
              </option>
            </select>
            <p>entries</p>
          </div>
          <div className="relative group">
            <input
              className="dark:bg-boxdark outline-none border rounded-full pl-10 pr-20 p-1 border-blue-gray-100 focus:outline-blue-gray-300"
              type="text"
              placeholder="Search"
            />
            <svg
              className="absolute group-focus:w-2 group-focus:h-2 -translate-y-1/2 top-1/2 left-2 fill-body group-focus:fill-blue-gray-400 dark:fill-bodydark dark:hover:fill-primary"
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M9.16666 3.33332C5.945 3.33332 3.33332 5.945 3.33332 9.16666C3.33332 12.3883 5.945 15 9.16666 15C12.3883 15 15 12.3883 15 9.16666C15 5.945 12.3883 3.33332 9.16666 3.33332ZM1.66666 9.16666C1.66666 5.02452 5.02452 1.66666 9.16666 1.66666C13.3088 1.66666 16.6667 5.02452 16.6667 9.16666C16.6667 13.3088 13.3088 16.6667 9.16666 16.6667C5.02452 16.6667 1.66666 13.3088 1.66666 9.16666Z"
                fill=""
              />
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M13.2857 13.2857C13.6112 12.9603 14.1388 12.9603 14.4642 13.2857L18.0892 16.9107C18.4147 17.2362 18.4147 17.7638 18.0892 18.0892C17.7638 18.4147 17.2362 18.4147 16.9107 18.0892L13.2857 14.4642C12.9603 14.1388 12.9603 13.6112 13.2857 13.2857Z"
                fill=""
              />
            </svg>
          </div>
        </div>
        {/* table start here  */}
        <div className="overflow-x-auto">
          <table className="min-w-full rounded-lg overflow-hidden mt-4">
            <thead className="bg-blue-100">
              <tr>
                <th className="p-4 text-left w-14">
                  <input
                    type="checkbox"
                    checked={selectAll}
                    onChange={() =>
                      handleSelectAll({
                        selectAll,
                        setSelectAll,
                        sortedData,
                        setSelectedRow,
                      })
                    }
                  />
                </th>

                {columns?.map((column, index) => (
                  <th
                    key={index}
                    onClick={() =>
                      handleSort({
                        key: column.dataIndex,
                        setSortConfig: setSortConfig,
                        sortConfig: sortConfig,
                      })
                    }
                    className={`cursor-pointer p-4 text-left hover:bg-blue-200 whitespace-nowrap`}
                  >
                    <div className="flex items-center justify-between">
                      <span>{column.name}</span>
                    </div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className=" border-blue-gray-10">
              {sortedData?.slice(0, entries).map((item, idx) => (
                <tr
                  key={item._id}
                  className={`hover:bg-blue-50 ${
                    idx === sortedData?.length - 1
                      ? "border-b border-b-blue-gray-100"
                      : ""
                  }`}
                >
                  <td className="p-4 border-t border-t-blue-gray-100">
                    <input
                      type="checkbox"
                      checked={
                        selectedRow.find((row) => row.key === item.key) || false
                      }
                      onChange={() =>
                        handleSelectRow({
                          row: item,
                          selectedRow,
                          setSelectedRow,
                        })
                      }
                    />
                  </td>

                  {/* featured media */}
                  <td
                    className={`p-4 border-t border-t-blue-gray-100 whitespace-nowrap align-top `}
                  >
                    <div className="flex items-center justify-center">
                      {item?.mediasInfo?.[0]?.videoGallery?.length ||
                      item?.mediasInfo?.[0]?.mediaGallery?.length ? (
                        item?.mediasInfo?.[0]?.videoGallery?.length ? (
                          <ReactPlayer
                            controls
                            width={"208px"}
                            height={"112px"}
                            url={[
                              item?.mediasInfo?.[0]?.videoGallery?.[0]
                                ?.videoUrl,
                            ]}
                            onPlay={() => setCurrentlyPlayingVideo(item?._id)}
                            playing={currentlyPlayingVideo === item?._id}
                          />
                        ) : (
                          <PhotoProvider
                            speed={() => 800}
                            easing={(type) =>
                              type === 2
                                ? "cubic-bezier(0.36, 0, 0.66, -0.56)"
                                : "cubic-bezier(0.34, 1.56, 0.64, 1)"
                            }
                          >
                            <PhotoView
                              src={
                                item?.mediasInfo?.[0]?.mediaGallery?.[0]?.imgUrl
                              }
                            >
                              <img
                                src={
                                  item?.mediasInfo?.[0]?.mediaGallery?.[0]
                                    ?.imgUrl
                                }
                                alt="featured media"
                                className="w-52 h-28 object-cover cursor-pointer"
                              />
                            </PhotoView>
                          </PhotoProvider>
                        )
                      ) : (
                        <div
                          onClick={() => {
                            setIsMediaModalOpen(true), setMediaModalData(item);
                          }}
                          className="flex flex-col items-center justify-center gap-2 border w-52 h-28 hover:border-primary hover:text-primary cursor-pointer"
                        >
                          <FaUpload className="text-4xl" />
                          Add Media
                        </div>
                      )}
                    </div>
                  </td>

                  <td
                    className={`p-4 border-t border-t-blue-gray-100 whitespace-nowrap align-top `}
                  >
                    <div>
                      <p
                        onClick={() => {
                          item?.title?.length > 20 && setIsTextModalOpen(true),
                            setTextModalContent(item?.title);
                        }}
                        className={`font-semibold ${
                          item?.title?.length > 20 && "cursor-pointer"
                        }`}
                      >
                        {item?.title?.length > 20
                          ? item?.title?.slice(0, 20) + "..."
                          : item?.title}
                      </p>
                    </div>
                  </td>
                  <td
                    className={`p-4 border-t border-t-blue-gray-100 whitespace-nowrap align-top `}
                  >
                    {item?.educationVariant ? item?.educationVariant : "N/A"}
                  </td>
                  <td
                    className={`p-4 border-t border-t-blue-gray-100 whitespace-nowrap align-top `}
                  >
                    {item?.coachingVariant}
                  </td>
                  <td
                    className={`p-4 border-t border-t-blue-gray-100 whitespace-nowrap align-top `}
                  >
                    {item?.curriculumBoard ? item?.curriculumBoard : "N/A"}
                  </td>
                  <td
                    className={`p-4 border-t border-t-blue-gray-100 whitespace-nowrap align-top `}
                  >
                    {item?.coachingFee === 0
                      ? "Free"
                      : "BDT " + item?.coachingFee}
                  </td>
                  <td
                    className={`p-4 border-t border-t-blue-gray-100 whitespace-nowrap align-top `}
                  >
                    {item?.feeVariation ? item?.feeVariation : "N/A"}
                  </td>
                  <td
                    className={`p-4 border-t border-t-blue-gray-100 whitespace-nowrap align-top `}
                  >
                    {item?.coachingPlace}
                  </td>
                  <td
                    className={`p-4 border-t border-t-blue-gray-100 whitespace-nowrap align-top `}
                  >
                    {moment(item?.startingDate).format("DD MMM YYYY")}
                  </td>
                  <td
                    className={`p-4 border-t border-t-blue-gray-100 whitespace-nowrap align-top `}
                  >
                    {item?.duration}
                  </td>
                  <td
                    className={`p-4 border-t border-t-blue-gray-100 whitespace-nowrap align-top capitalize`}
                  >
                    {item?.gender}
                  </td>
                  <td
                    className={`p-4 border-t border-t-blue-gray-100 whitespace-nowrap align-top `}
                  >
                    <div className="flex">
                      <div
                        className={`${
                          item?.aboutCoaching?.length > 20 && "cursor-pointer"
                        }`}
                        onClick={() => {
                          item?.aboutCoaching?.length > 20 &&
                            setIsTextModalOpen(true),
                            setTextModalContent(item?.aboutCoaching);
                        }}
                        dangerouslySetInnerHTML={{
                          __html:
                            item?.aboutCoaching?.length > 20
                              ? item?.aboutCoaching?.slice(0, 20)
                              : item?.aboutCoaching,
                        }}
                      ></div>
                      <div>{item?.aboutCoaching?.length > 20 && "..."}</div>
                    </div>
                  </td>
                  <td
                    className={`p-4 border-t border-t-blue-gray-100 whitespace-nowrap align-top flex`}
                  >
                    <div className="flex">
                      <div
                        className={`${
                          item?.programDetails?.length > 20 && "cursor-pointer"
                        }`}
                        onClick={() => {
                          item?.programDetails?.length > 20 &&
                            setIsTextModalOpen(true),
                            setTextModalContent(item?.programDetails);
                        }}
                        dangerouslySetInnerHTML={{
                          __html:
                            item?.programDetails?.length > 20
                              ? item?.programDetails?.slice(0, 20)
                              : item?.programDetails,
                        }}
                      ></div>
                      <div>{item?.programDetails?.length > 20 && "..."}</div>
                    </div>
                  </td>
                  <td
                    className={`p-4 border-t border-t-blue-gray-100 whitespace-nowrap align-top `}
                  >
                    <span
                      className="cursor-pointer hover:text-primary"
                      onClick={() => {
                        setIsCoachingRoutineModalOpen(true),
                          setCoachingRoutineModalData(item);
                      }}
                    >
                      {" "}
                      View Routine
                    </span>
                  </td>
                  <td
                    className={`p-4 border-t border-t-blue-gray-100 whitespace-nowrap align-top `}
                  >
                    <div className="flex items-center gap-5">
                      <IoEye
                        onClick={() => {
                          setIsDetailsModalOpen(true),
                            setDetailsModalData(item);
                        }}
                        className="cursor-pointer hover:text-blue-500 text-xl"
                        title="View Details"
                      />
                      <MdPermMedia
                        onClick={() => {
                          setIsMediaModalOpen(true), setMediaModalData(item);
                        }}
                        className="cursor-pointer hover:text-blue-500 text-xl"
                        title="Add Media"
                      />
                      <AiOutlineSchedule
                        onClick={() => {
                          setIsScheduleModalOpen(true),
                            setScheduleModalData(item);
                        }}
                        className="cursor-pointer hover:text-blue-500 text-xl"
                        title="Add Schedule"
                      />
                      <FaEdit
                        onClick={() => {
                          setIsUpdateModalOpen(true),
                            setUpdateCoachingData(item);
                        }}
                        className="cursor-pointer hover:text-blue-500"
                      />
                      <FaTrash
                        onClick={() => {
                          setIsDeleteModalOpen(true),
                            setDeleteData(item?.coachingId);
                        }}
                        className="cursor-pointer hover:text-red-500"
                      />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      {isDeleteModalOpen && (
        <DeleteConfirmationModal
          isLoading={coachingDeleteLoading}
          onDelete={handleDeleteCoaching}
          onCancel={handleCancelDeleteCoaching}
        />
      )}

      {isTextModalOpen && textModalContent && (
        <CommonTextModal
          content={textModalContent}
          setContent={setTextModalContent}
          isOpenModal={isTextModalOpen}
          setIsOpenModal={setIsTextModalOpen}
        />
      )}

      {isUpdateModalOpen && updateCoachingData && (
        <UpdateCoachingModal
          coaching={updateCoachingData}
          setCoaching={setUpdateCoachingData}
          isOpenModal={isUpdateModalOpen}
          setIsOpenModal={setIsUpdateModalOpen}
        />
      )}

      {isDetailsModalOpen && detailsModalData && (
        <CoachingDetails
          coaching={detailsModalData}
          setCoaching={setDetailsModalData}
          isOpenModal={isDetailsModalOpen}
          setIsOpenModal={setIsDetailsModalOpen}
        />
      )}

      {isMediaModalOpen && mediaModalData && (
        <AddMedia
          coaching={mediaModalData}
          setCoaching={setMediaModalData}
          isOpen={isMediaModalOpen}
          setIsOpen={setIsMediaModalOpen}
        />
      )}
    </div>
  );
};

export default AllCoaching;
