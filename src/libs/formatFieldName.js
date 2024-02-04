export function formatFieldName(fieldName) {
    const words = fieldName.split(/(?=[A-Z])/);
    const formattedWords = words.map((word) => word.charAt(0).toUpperCase() + word.slice(1));
    return formattedWords.join(' ');
  }