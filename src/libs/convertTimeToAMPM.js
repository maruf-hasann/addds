export function convertToAMPM(timeString) {
  const [hours, minutes] = timeString.split(":");
  const hoursInt = parseInt(hours, 10);
  const minutesInt = parseInt(minutes, 10);
  const meridiem = hoursInt >= 12 ? "PM" : "AM";
  const hours12 = (hoursInt % 12 || 12).toString().padStart(2, "0");
  return `${hours12}:${minutesInt.toString().padStart(2, "0")}${meridiem}`;
}
