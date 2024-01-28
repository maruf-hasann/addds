const ArrayCommonComponent = ({ name, values, valueName }) => {
  return (
    <div className="p-5 border-0 border-b-[1px] border-gray-200 bg-white">
      <h4 className="font-medium text-sm mb-1">{name}</h4>
      <div className="flex items-center gap-2 flex-wrap">
        {values?.map((value, idx) => (
          <h2
            key={idx}
            className="font-bold text-lg bg-blue-50 px-3 rounded-sm"
          >
            {value?.[valueName]}
          </h2>
        ))}
      </div>
    </div>
  );
};

export default ArrayCommonComponent;
