export const sortDataByCreatedAt = (data) => {
    if (!Array.isArray(data)) {
      return;
    }
  
    const sortedData = [...data].sort(
      (a, b) => new Date(a.createdAt) - new Date(b.createdAt)
    );
  
    return sortedData;
  };