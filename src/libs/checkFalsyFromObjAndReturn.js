/* eslint-disable no-unused-vars */
export const checkFalsyFromObjAndReturn = (obj) => {
    for (const [key, value] of Object.entries(obj)) {
      if (value === '') {
        return true;
      }
    }
    return false;
  };