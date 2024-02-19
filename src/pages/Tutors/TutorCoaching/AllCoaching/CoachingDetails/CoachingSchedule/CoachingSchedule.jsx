import moment from "moment";

const CoachingSchedule = ({ schedule }) => {
  const days = [
    "saturday",
    "sunday",
    "monday",
    "tuesday",
    "wednesday",
    "thursday",
    "friday",
  ];

  const modifiedSchedules = groupSchedulesByDay(schedule?.coaching);

  function groupSchedulesByDay(schedules) {
    const slots = {};

    schedules?.forEach((schedule) => {
      if (!slots[schedule.day]) {
        slots[schedule.day] = {
          day: schedule.day,
          schedules: [],
        };
      }
      slots[schedule.day].schedules.push({
        scheduleId: schedule.scheduleId,
        slotTitle: schedule.slotTitle,
        startTime: schedule.startTime,
        endTime: schedule.endTime,
      });
    });

    return Object.values(slots);
  }

  const uniqueSlots = [];

  schedule?.coaching?.forEach((session) => {
    const slot = `${session.startTime}-${session.endTime}`;
    if (!uniqueSlots.includes(slot)) {
      uniqueSlots.push(slot);
    }
  });

  uniqueSlots.sort((slot1, slot2) => {
    const startTime1 = slot1?.split("-")[0];
    const startTime2 = slot2?.split("-")[0];
    const timeFormat = "hh:mmA";
    const time1 = moment(startTime1, timeFormat);
    const time2 = moment(startTime2, timeFormat);
    return time1 - time2;
  });

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white ">
        <thead>
          <tr>
            {["Day", ...uniqueSlots].map((slot, index) => (
              <th
                key={index}
                className="py-3 px-4 border text-gray-700 capitalize"
              >
                {slot}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {days.map((day, key) => (
            <tr key={key}>
              <td className="border px-6 py-2">
                <div className="flex items-center gap-2 capitalize text-gray-700 font-semibold">
                  {day}
                </div>
              </td>
              {uniqueSlots?.map((slot) => (
                <td
                  key={slot}
                  className={`border px-6 py-2 ${
                    modifiedSchedules
                      ?.find((sDay) => sDay?.day === day)
                      ?.schedules?.find(
                        (schedule) =>
                          `${schedule.startTime}-${schedule.endTime}` === slot
                      )
                      ? "bg-blue-50"
                      : "bg-gray-50"
                  }`}
                >
                  <div className="flex items-center gap-2 capitalize text-gray-700 justify-center">
                    {modifiedSchedules
                      ?.find((sDay) => sDay?.day === day)
                      ?.schedules?.find(
                        (schedule) =>
                          `${schedule.startTime}-${schedule.endTime}` === slot
                      )?.slotTitle || "-"}
                  </div>
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CoachingSchedule;
