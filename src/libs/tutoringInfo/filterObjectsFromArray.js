export function filterObjectsFromArray(array, targetObject) {
    return array.filter((obj) => {
      const keys1 = Object.keys(obj);
      const keys2 = Object.keys(targetObject);

      if (keys1.length !== keys2.length) {
        return true;
      }

      for (const key of keys1) {
        if (obj[key] !== targetObject[key]) {
          return true;
        }
      }

      return false;
    });
  }