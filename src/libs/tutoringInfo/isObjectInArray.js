export function isObjectInArray(array, targetObject) {
    return array?.some(
      (obj) => JSON.stringify(obj) === JSON.stringify(targetObject)
    );
  }