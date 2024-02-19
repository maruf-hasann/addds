import React, { useState } from "react";
import { RxCross2 } from "react-icons/rx";

import {
  Accordion,
  AccordionBody,
  AccordionHeader,
} from "@material-tailwind/react";
import { FaAngleDown, FaAngleUp } from "react-icons/fa";
import { useGetWeeklyCoachingScheduleByCoachingIdQuery } from "../../../../../store/service/tutorInfo/coaching/coachingSchedule/coachingScheduleApiService";

const CoachingRoutine = ({ isOpen, setIsOpen, coaching, setCoaching }) => {
  const days = [
    "saturday",
    "sunday",
    "monday",
    "tuesday",
    "wednesday",
    "thursday",
    "friday",
  ];
  const { data: CoachingRoutineData, isLoading } =
    useGetWeeklyCoachingScheduleByCoachingIdQuery(coaching?.coachingId);
  const coachingRoutine = CoachingRoutineData?.data?.[0];

  const modifiedSchedules = groupSchedulesByDay(coachingRoutine?.weekly);
  modifiedSchedules.sort((a, b) => {
    return days.indexOf(a.day) - days.indexOf(b.day);
  });

  //   handle close
  const closeModal = () => {
    setIsOpen(false);
    setCoaching(null);
  };

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

  const [open, setOpen] = useState(1);

  const handleOpen = (value) => setOpen(open === value ? 0 : value);

  return (
    <div
      className={`fixed inset-0 ${
        isOpen ? "opacity-100 visible" : "opacity-0 invisible"
      } transition-opacity duration-300 ease-in-out flex items-center justify-center z-50`}
    >
      <div className="fixed inset-0 bg-black opacity-50"></div>
      <div
        className="bg-white rounded-md z-10  max-w-[600px] w-full relative mx-1 overflow-y-auto"
        style={{ maxHeight: "460px" }}
      >
        <div className="px-4 py-3 border-b sticky top-0 z-50 backdrop-filter backdrop-blur-sm">
          <div className="overflow-hidden">
            <p className="font-semibold">{coaching?.title}</p>
          </div>
          <button
            onClick={closeModal}
            className="absolute top-3 right-3 text-gray-500 text-2xl hover:text-red-500"
          >
            <RxCross2 />
          </button>
        </div>
        <div className="px-4 pt-2 pb-2">
          {modifiedSchedules?.map((schedule, index) => (
            <Accordion key={index} open={open === index + 1} className="my-2">
              <AccordionHeader
                onClick={() => handleOpen(index + 1)}
                className={`capitalize border-b-0 border border-b-gray-200 ps-3 py-3 rounded-sm ${
                  open === index + 1 && " border-gray-200"
                }`}
              >
                <div className="flex justify-between w-full items-center">
                  <div className="flex items-center gap-10">
                    <div className="w-[100px]">{schedule?.day}</div>
                    <div className="text-sm font-normal flex-1 flex flex-wrap gap-5">
                      {schedule?.schedules?.map((scdl, idx) => (
                        <span key={idx}>{scdl?.slotTitle}</span>
                      ))}
                    </div>
                  </div>
                  {open === index + 1 ? <FaAngleUp /> : <FaAngleDown />}
                </div>
              </AccordionHeader>
              <AccordionBody className="py-0">
                <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 bg-blue-50 p-3">
                  {schedule?.schedules?.map((scdl, idx) => (
                    <div
                      className="grid grid-cols-1 bg-white p-2 py-5 text-center gap-1 font-semibold"
                      key={idx}
                    >
                      <span>{scdl?.slotTitle}</span>
                      <div>
                        <span>{scdl?.startTime}</span> -{" "}
                        <span>{scdl?.endTime}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </AccordionBody>
            </Accordion>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CoachingRoutine;
