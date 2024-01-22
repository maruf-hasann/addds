export const handleSelectAll = ({
  selectAll,
  setSelectAll,
  setSelectedRow,
  sortedData,
}) => {
  setSelectAll(!selectAll);
  if (selectAll) {
    setSelectedRow([]);
    return;
  }
  setSelectedRow(sortedData);
};
