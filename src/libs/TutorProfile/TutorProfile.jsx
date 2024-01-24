export const CommonComponent = ({ name, value }) => {
  return (
    <div className="p-5 border-0 border-b-[1px] border-gray-200 bg-white">
      <h4 className="font-medium text-sm mb-1">{name}</h4>
      <h2 className="font-bold text-lg">{value}</h2>
    </div>
  );
};

export const ArrayCommonComponent = ({ name, values, valueName }) => {
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

export const SubjectCommonComponent = ({ name, allSubject }) => {
  return (
    <div className="p-5 border-0 border-b-[1px] border-gray-200 bg-white">
      <h4 className="font-medium text-sm mb-1">{name}</h4>
      <div className="flex items-center gap-2 flex-wrap">
        {allSubject?.map((subject, idx) => (
          <span
            key={idx}
            className="font-bold text-lg bg-blue-50 px-3 rounded-sm"
          >
            {subject.subSubjects?.length
              ? `${subject.mainSubject}(${subject?.subSubjects?.map(
                  (subSub) => subSub
                )})`
              : subject?.mainSubject}
          </span>
        ))}
      </div>
    </div>
  );
};

export const transformSubjectArray = (inputArray) => {
  // Check if the input is an array
  if (!Array.isArray(inputArray)) {
    return;
  }

  return inputArray.reduce((acc, item) => {
    const existingItem = acc.find((i) => i.mainSubject === item.mainSubject);

    if (existingItem) {
      if (item.subSubject) {
        existingItem.subSubjects.push(item.subSubject);
      }
    } else {
      acc.push({
        mainSubject: item.mainSubject,
        subSubjects: item.subSubject ? [item.subSubject] : [],
      });
    }

    return acc;
  }, []);
};
