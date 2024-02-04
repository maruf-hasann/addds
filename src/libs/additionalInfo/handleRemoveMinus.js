export const handleRemoveMinus = (e) => {
    // Prevent entering minus sign
    if (e.key === "-" || e.key === "e" || e.key === ".") {
      e.preventDefault();
    } else if (e.key === "ArrowDown") {
      if (e.target.value === "0" || e.target.value === "") {
        e.preventDefault()
      }
    }
  };