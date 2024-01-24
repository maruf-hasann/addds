import React, { useState } from "react";
import { useEffect } from "react";
import cn from "../../../libs/cn";
import TableSkeleton from "./TableSkeleton/TableSkeleton";
import { handleSort } from "../../../libs/DataTable/handleSort";
import { handleSelectAll } from "../../../libs/DataTable/handleSelectAll";
import { handleSelectRow } from "../../../libs/DataTable/handleSelectRow";
// import TableSkeleton from "../Loader/TableSkeleton";

const DataTable = ({
  tableData,
  handleSelectedRowItem,
  error,
  isError,
  columns,
  isLoading,
  pagination = true,
  hideSerial = false,
  checkbox = false,
  textCenter = false,
  ...restProps
}) => {
  // default table data
  const [data, setData] = useState([]);
  const [selectAll, setSelectAll] = useState(false);
  const [sortConfig, setSortConfig] = useState({ key: null, direction: "asc" });
  const [selectedRow, setSelectedRow] = useState([]);
  const [entries, setEntries] = useState(10);
  const [sortedData, setSortedData] = useState([]);

  useEffect(() => {
    if (tableData) {
      const newData = tableData?.map((item, index) => {
        return { ...item, key: index };
      });
      setData(newData);
      setSortedData([...newData]); // Set sortedData initially
    }
  }, [tableData]);

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

  useEffect(() => {
    if (handleSelectedRowItem) {
      handleSelectedRowItem(selectedRow);
    }
  }, [selectedRow]);

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

  // shows error message
  if (isError) {
    return <div>Something went wrong</div>;
  }

  if (data.length < 1) {
    return (
      <div className="p-5 text-center font-bold dark:bg-boxdark rounded">
        No data found
      </div>
    );
  }

  return (
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
              {checkbox && (
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
              )}
              {!hideSerial && (
                <th className={`p-4 text-left }`}>
                  <div className="flex items-center justify-between">
                    <span>Sl</span>
                  </div>
                </th>
              )}

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
                {checkbox && (
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
                )}
                {!hideSerial && (
                  <td className="p-4 border-t border-t-blue-gray-100 w-28">
                    {idx + 1}
                  </td>
                )}
                {/* render table data based on column data index  */}
                {columns?.map((column, index) => (
                  <td
                    key={index}
                    className={`p-4 border-t border-t-blue-gray-100 whitespace-nowrap ${!textCenter && 'align-top'} ${
                      index === columns.length - 1 ? "w-40" : ""
                    }`}
                  >
                    {column?.render ? (
                      <column.render item={item} />
                    ) : column?.dataIndex2 ? (
                      item[column?.dataIndex]?.[column?.dataIndex2] ? (
                        item[column?.dataIndex]?.[column?.dataIndex2]
                      ) : (
                        "N/A"
                      )
                    ) : item[column?.dataIndex] ? (
                      item[column?.dataIndex]
                    ) : (
                      "N/A"
                    )}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {/* table end here  */}
    </div>
  );
};

export default DataTable;
