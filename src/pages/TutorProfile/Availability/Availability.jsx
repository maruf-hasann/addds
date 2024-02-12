import React, { useState } from "react";
import {
  Accordion,
  AccordionHeader,
  AccordionBody,
} from "@material-tailwind/react";
import { FaAngleDown, FaAngleUp } from "react-icons/fa";
import { PiSunDimFill } from "react-icons/pi";
import { RiSunFill } from "react-icons/ri";
import { BsSunriseFill, BsSunsetFill } from "react-icons/bs";
import { IoMdMoon } from "react-icons/io";
import { useGetUserTimeSlotQuery } from "../../../store/service/tutorInfo/tutoringTimeSlot/tutoringTimeSlotApiService";

const Availability = ({ number }) => {
  const { data: timeSlotsData } = useGetUserTimeSlotQuery(number);
  const timeSlots = timeSlotsData?.data;
  const [open, setOpen] = useState(1);
  const days = [
    "saturday",
    "sunday",
    "monday",
    "tuesday",
    "wednesday",
    "thursday",
    "friday",
  ];
  const slotOrder = ["morning", "noon", "afternoon", "evening", "night"];

  const handleOpen = (value) => setOpen(open === value ? 0 : value);
  return (
    <div className="bg-white  my-10">
      <div className="">
        <div className="shadow-md rounded-lg">
          <div className="flex justify-between bg-white shadow-md pt-7 pb-3 px-4">
            <div>
              <h2 className="capitalize text-2xl font-semibold text-gray-800 ">
                Availability
              </h2>
            </div>
          </div>
          <div className="p-5 bg-[#f1f5f9]">
            <div className="bg-white p-5">
              {timeSlots ? (
                days?.map((day, index) => (
                  <div key={index}>
                    {timeSlots?.[day]?.find((slot) => slot?.time?.length) ? (
                      <Accordion open={open === index + 1} className="my-5">
                        <AccordionHeader
                          onClick={() => handleOpen(index + 1)}
                          className={`capitalize border-b-0 border border-b-gray-200 ps-3 py-3 rounded-sm ${
                            open === index + 1 && " border-gray-200"
                          }`}
                        >
                          <div className="flex justify-between w-full items-center">
                            <div className="flex items-center gap-10">
                              <div className="w-[100px]">{day}</div>
                              <div className="text-sm font-normal flex-1 flex flex-wrap gap-5">
                                {slotOrder?.map((slotName) => {
                                  const slot = timeSlots[day]?.find(
                                    (slot) => slot?.slotName === slotName
                                  );
                                  return (
                                    slot && (
                                      <div
                                        key={slotName}
                                        className="hidden items-center gap-1 md:flex"
                                      >
                                        {slot?.slotName === "morning" && (
                                          <BsSunriseFill />
                                        )}
                                        {slot?.slotName === "noon" && (
                                          <RiSunFill />
                                        )}
                                        {slot?.slotName === "afternoon" && (
                                          <PiSunDimFill />
                                        )}
                                        {slot?.slotName === "evening" && (
                                          <BsSunsetFill />
                                        )}
                                        {slot?.slotName === "night" && (
                                          <IoMdMoon />
                                        )}
                                        {slot?.slotName}
                                      </div>
                                    )
                                  );
                                })}
                              </div>
                            </div>
                            {open === index + 1 ? (
                              <FaAngleUp />
                            ) : (
                              <FaAngleDown />
                            )}
                          </div>
                        </AccordionHeader>
                        <AccordionBody className="py-0">
                          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 bg-blue-50 p-5">
                            {timeSlots?.[day]?.map(
                              (time) =>
                                time?.time?.length &&
                                time?.time?.map((sTime) => (
                                  <div
                                    key={index}
                                    className="flex items-center justify-center font-semibold text-lg bg-white px-5 py-10 mx-auto w-full"
                                  >
                                    {sTime.from} - {sTime.to}
                                  </div>
                                ))
                            )}
                          </div>
                        </AccordionBody>
                      </Accordion>
                    ) : (
                      ""
                    )}
                  </div>
                ))
              ) : (
                <div className="flex flex-col items-center my-5">
                  <p className="font-bold ">No data found</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Availability;
