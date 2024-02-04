export const modifySubjectsForPost = (subjectArray) => {
    const modifiedSubjects = [];

    if (!subjectArray?.length) return modifiedSubjects;

    for (let i = 0; i < subjectArray?.length; i++) {
      if (subjectArray?.[i]?.subSubjects?.length) {
        for (let j = 0; j < subjectArray?.[i]?.subSubjects?.length; j++) {
          modifiedSubjects.push({
            mainSubject: subjectArray?.[i]?.mainSubject,
            subSubject: subjectArray?.[i].subSubjects?.[j],
          });
        }
      } else {
        modifiedSubjects?.push({
          mainSubject: subjectArray?.[i]?.mainSubject,
          subSubject: "",
        });
      }
    }

    return modifiedSubjects;
  };