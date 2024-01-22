export const handleSelectRow = ({row, selectedRow, setSelectedRow}) => {
  const isExist = selectedRow.find((item) => item.key === row.key);
  if (isExist) {
    setSelectedRow((prevSelectedRow) =>
      prevSelectedRow.filter((item) => item?.key !== row?.key)
    );
    return;
  }
  setSelectedRow((prevSelectedRow) => [...prevSelectedRow, row]);
};
