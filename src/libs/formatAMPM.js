import moment from "moment";

export const formatAMPM = (date) => {
  if (date) {
    const datetime = moment(date, "HH:mm");

    // Format the time in 12-hour AM/PM format
    const formattedTime = datetime.format("h:mm A");
    return formattedTime;
  }
  return "Invalid Date";
};
