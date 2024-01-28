const SubjectCommonComponent = ({ name, allSubject }) => {
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

  export default SubjectCommonComponent;