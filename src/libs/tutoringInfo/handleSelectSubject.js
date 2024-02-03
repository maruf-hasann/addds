export const handleSelectSubject = (
    subjectsArray,
    setSubjectsArray,
    mainSubject,
    selectedOption
  ) => {
    console.log(subjectsArray);
    if (mainSubject === undefined || selectedOption === undefined) {
      const existingSubject = subjectsArray?.find(
        (subject) => subject?.mainSubject === mainSubject
      );
      if (!existingSubject) {
        setSubjectsArray([
          { mainSubject: mainSubject, subSubjects: [] },
          ...subjectsArray,
        ]);
      }
    } else {
      setSubjectsArray((prevSelected) => {
        const existingSubject = subjectsArray?.find(
          (subject) => subject?.mainSubject === mainSubject
        );
        if (existingSubject) {
          const isOptionIncluded =
            existingSubject?.subSubjects?.includes(selectedOption);
          if (!isOptionIncluded) {
            const updatedSubjects = prevSelected?.map((subject) => {
              return subject?.mainSubject === mainSubject
                ? {
                    ...subject,
                    subSubjects: [selectedOption, ...subject.subSubjects],
                  }
                : subject;
            });
            return updatedSubjects;
          }
        } else {
          return [
            {
              mainSubject: mainSubject,
              subSubjects: [selectedOption],
            },
            ...subjectsArray,
          ];
        }
        return prevSelected;
      });
    }
  };
