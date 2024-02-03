export const handleRemoveSubject = (
    subjectsArray,
    setSubjectsArray,
    subjectToRemove
  ) => {
    const updatedSubjects = subjectsArray?.filter(
      (subject) => subject?.mainSubject !== subjectToRemove?.mainSubject
    );
    setSubjectsArray(updatedSubjects);
  };