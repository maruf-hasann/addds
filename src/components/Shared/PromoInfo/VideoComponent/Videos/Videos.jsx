import { FaAws, FaLock, FaYoutube } from "react-icons/fa";
import { BiWorld } from "react-icons/bi";
import moment from "moment";
import { useEffect, useState } from "react";
import { FaAngleDown, FaDownload } from "react-icons/fa6";
import { TbReplace } from "react-icons/tb";
import ReactPlayer from "react-player";
import TableSkeleton from "../../../DataTable/TableSkeleton/TableSkeleton";
import VideoUrlReplaceModal from "../VideoUrlReplaceModal/VideoUrlReplaceModal";
import CopyToClipboard from "react-copy-to-clipboard";
import toast from "react-hot-toast";
import CommonTextModalForCopy from "../../../CommonTextModalForCopy/CommonTextModalForCopy";

const Videos = ({ videos, isLoading }) => {
  const [hideThumbnail, setHideThumbnail] = useState(null);
  const [updateVisibility, setUpdateVisibility] = useState(null);
  const [updatePending, setUpdatePending] = useState(null);
  const [currentlyPlayingVideo, setCurrentlyPlayingVideo] = useState(null);
  const [data, setData] = useState([]);
  const [selectAll, setSelectAll] = useState(false);
  const [sortConfig, setSortConfig] = useState({ key: null, direction: "asc" });
  const [selectedRow, setSelectedRow] = useState([]);
  const [entries, setEntries] = useState(10);
  const [sortedData, setSortedData] = useState([]);
  const [openVideoUrlReplaceModal, setOpenVideoUrlReplaceModal] =
    useState(false);
  const [replaceVideoData, setReplaceVideoData] = useState({});
  const [isOpenCopyModal, setIsOpenCopyModal] = useState(false);
  const [modalContent, setModalContent] = useState("");

  useEffect(() => {
    if (videos) {
      const newData = videos?.map((item, index) => {
        return { ...item, key: index };
      });
      setData(newData);
      setSortedData([...newData]); // Set sortedData initially
    }
  }, [videos]);

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
      <div>
        {Array.from({ length: 5 }, (_, idx) => (
          <TableSkeleton key={idx} />
        ))}
      </div>
    );
  }

  if (data.length < 1) {
    return (
      <div className="p-5 text-center font-bold dark:bg-boxdark rounded">
        No data found
      </div>
    );
  }

  const columns = [
    {
      name: "Video",
    },
    {
      name: "Title",
    },
    {
      name: "Visibility",
    },
    {
      name: "Status",
    },
    {
      name: "Date",
    },
    {
      name: "Hosting Location",
    },
    {
      name: "Action",
    },
  ];

  const handleSort = (key) => {
    let direction = "asc";
    if (sortConfig.key === key && sortConfig.direction === "asc") {
      direction = "desc";
    }
    setSortConfig({ key, direction });
  };

  const handleSelectAll = () => {
    setSelectAll(!selectAll);
    if (selectAll) {
      setSelectedRow([]);
      return;
    }
    setSelectedRow(sortedData);
  };

  const handleSelectRow = (row) => {
    const isExist = selectedRow.find((item) => item.key === row.key);
    if (isExist) {
      setSelectedRow((prevSelectedRow) =>
        prevSelectedRow.filter((item) => item?.key !== row?.key)
      );
      return;
    }
    setSelectedRow((prevSelectedRow) => [...prevSelectedRow, row]);
  };

  const handleDownloadVideoAndThumbnail = async (url, fileName) => {
    console.log(url, fileName)
    try {
      // const response = await fetch(url);

      const response = await fetch(url);

      const blob = await response.blob();

      // Create a link element
      const link = document.createElement("a");
      link.href = window.URL.createObjectURL(blob);
      link.download = fileName;

      // Trigger the download automatically
      link.click();

      // Clean up
      window.URL.revokeObjectURL(link.href);
    } catch (error) {
      toast.error("Error downloading file", error);
    }
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
                    onChange={handleSelectAll}
                  />
                </th>

                {columns?.map((column, index) => (
                  <th
                    key={index}
                    onClick={() => handleSort(column.dataIndex)}
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
                      onChange={() => handleSelectRow(item)}
                    />
                  </td>

                  {/* video */}
                  <td
                    className={`p-4 border-t border-t-blue-gray-100 whitespace-nowrap align-top `}
                  >
                    <div
                      className="flex gap-2 w-60 h-28 relative"
                      onMouseEnter={() => {
                        if (!currentlyPlayingVideo) {
                          setHideThumbnail(item?._id);
                        }
                      }}
                      onMouseLeave={() => {
                        if (!currentlyPlayingVideo) {
                          setHideThumbnail(null);
                        }
                      }}
                    >
                      <ReactPlayer
                        controls
                        width={"240px"}
                        height={"112px"}
                        url={[item?.videoUrl]}
                        onPlay={() => setCurrentlyPlayingVideo(item?._id)}
                        playing={currentlyPlayingVideo === item?._id}
                      />

                      {currentlyPlayingVideo !== item?._id &&
                        (hideThumbnail === item?._id ? (
                          <div
                            onMouseLeave={() => setHideThumbnail(null)}
                            onClick={() => setCurrentlyPlayingVideo(item?._id)}
                            className={`absolute inset-0 w-60 h-28 object-cover cursor-pointer`}
                          />
                        ) : (
                          <img
                            onMouseEnter={() => setHideThumbnail(item?._id)}
                            src={item?.thumbnail}
                            alt=""
                            className={`absolute inset-0 w-60 h-28 object-cover ${
                              hideThumbnail === item?._id && "-z-10"
                            }`}
                          />
                        ))}
                    </div>
                  </td>
                  {/* title */}
                  <td
                    className={`p-4 border-t border-t-blue-gray-100 whitespace-nowrap align-top `}
                  >
                    <div>
                      <div
                        onClick={() => {
                          setIsOpenCopyModal(true),
                            setModalContent(item?.description);
                        }}
                        className="font-semibold cursor-pointer"
                      >
                        {item?.title?.length > 20
                          ? item?.title?.slice(0, 20) + "..."
                          : item?.title}
                      </div>
                      <p
                        onClick={() => {
                          setIsOpenCopyModal(true),
                            setModalContent(item?.description);
                        }}
                        className="mt-2 text-sm whitespace-normal cursor-pointer"
                      >
                        {item?.description?.length > 50
                          ? item?.description?.slice(0, 50) + "..."
                          : item?.description}
                      </p>
                    </div>
                  </td>
                  {/* visibility */}
                  <td
                    className={`p-4 border-t border-t-blue-gray-100 whitespace-nowrap align-top `}
                  >
                    <div className="flex items-center gap-2 capitalize relative">
                      {item?.visibility === "public" ? <BiWorld /> : <FaLock />}
                      <p>{item?.visibility}</p>
                      <FaAngleDown
                        className="cursor-pointer"
                        onClick={() => {
                          setUpdateVisibility(
                            updateVisibility ? null : item?._id
                          );
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
                  </td>
                  {/* status */}
                  <td
                    className={`p-4 border-t border-t-blue-gray-100 whitespace-nowrap align-top `}
                  >
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
                  </td>
                  {/* date */}
                  <td
                    className={`p-4 border-t border-t-blue-gray-100 whitespace-nowrap align-top `}
                  >
                    <div className="flex flex-col gap-1">
                      <p className="text-gray-900">
                        {moment(item?.time).format("MMM D, YYYY")}
                      </p>
                      <p className="text-sm">Published</p>
                    </div>
                  </td>
                  {/* hosting location */}
                  <td
                    className={`p-4 border-t border-t-blue-gray-100 whitespace-nowrap align-top  font-semibold`}
                  >
                    {item?.videoUrl?.includes("youtu.be") ? (
                      <div className="flex items-center gap-2 justify-center">
                        <FaYoutube /> Youtube
                      </div>
                    ) : (
                      <div className="flex items-center gap-2 justify-center">
                        <FaAws /> Aws
                      </div>
                    )}
                  </td>
                  {/* action */}
                  <td
                    className={`p-4 border-t border-t-blue-gray-100 whitespace-nowrap align-top flex justify-center`}
                  >
                    <div className="flex  items-center gap-5">
                      <TbReplace
                        onClick={() => {
                          setOpenVideoUrlReplaceModal(true),
                            setReplaceVideoData({
                              id: item?._id,
                              preUrl: item?.videoUrl,
                            });
                        }}
                        title="Replace Video URL"
                        className="cursor-pointer text-xl"
                      />
                      <FaDownload
                        onClick={() =>
                          handleDownloadVideoAndThumbnail(
                            item?.thumbnail,
                            "thumbnail-download"
                          )
                        }
                        className="cursor-pointer text-xl"
                        title="Download Video and Thumbnail"
                      />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      {openVideoUrlReplaceModal && (
        <VideoUrlReplaceModal
          replaceVideoData={replaceVideoData}
          setReplaceVideoData={setReplaceVideoData}
          isOpen={openVideoUrlReplaceModal}
          setIsOpen={setOpenVideoUrlReplaceModal}
          setData={setData}
        />
      )}

      {isOpenCopyModal && modalContent && (
        <CommonTextModalForCopy
          content={modalContent}
          setContent={setModalContent}
          isOpenModal={isOpenCopyModal}
          setIsOpenModal={setIsOpenCopyModal}
        />
      )}
    </div>
  );
};

export default Videos;
