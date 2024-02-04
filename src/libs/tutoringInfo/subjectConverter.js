export const subjectConverter = (inputArray) => {
    if (!inputArray?.length) return [];
    const resultObject = {};

    inputArray.forEach((item) => {
      if (!resultObject[item.mainSubject]) {
        resultObject[item.mainSubject] = {
          mainSubject: item.mainSubject,
          subSubjects: [],
        };
      }

      if (item.subSubject) {
        resultObject[item.mainSubject].subSubjects.push(item.subSubject.trim());
      }
    });

    return Object.values(resultObject);
  };