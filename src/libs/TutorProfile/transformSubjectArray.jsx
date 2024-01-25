const transformSubjectArray = (inputArray) => {
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

export default transformSubjectArray;
