import React from "react";
import { RxCross2 } from "react-icons/rx";

import { commonSelectClassName } from "../../../../../libs/commonSelectClassName";
import { isObjectInArray } from "../../../../../libs/tutoringInfo/isObjectInArray";
import { filterObjectsFromArray } from "../../../../../libs/tutoringInfo/filterObjectsFromArray";

const EligibleFor = ({
  customErrors,
  eligiblesFor,
  selectedEligiblesFor,
  setSelectedEligiblesFor,
}) => {
  console.log(selectedEligiblesFor);

  return (
    <div>
      {/* Eligible For */}
      <div className={`w-full`}>
        <label className="block mb-3 text-sm font-semibold outline-none text-gray-900 dark:text-white">
          Eligible For
        </label>
        <select
          defaultValue=""
          className={commonSelectClassName}
          onChange={(event) => {
            const selectedValue = JSON.parse(event.target.value);
            if (!isObjectInArray(selectedEligiblesFor, selectedValue)) {
              setSelectedEligiblesFor([...selectedEligiblesFor, selectedValue]);
            }
          }}
        >
          <option value="" disabled>
            Choose Option
          </option>
          {eligiblesFor?.map((eligible, idx) => (
            <option key={idx} value={JSON.stringify({ name: eligible?.name })}>
              {eligible?.name}
            </option>
          ))}
        </select>
        {!selectedEligiblesFor?.length && customErrors?.eligibleFor && (
          <p className="text-red-500 text-sm absolute">
            {customErrors.eligibleFor}
          </p>
        )}
        <div
          className={`flex flex-wrap  gap-2 ${
            selectedEligiblesFor?.length && "mt-3"
          }`}
        >
          {selectedEligiblesFor?.map((item, idx) => (
            <div
              onClick={() => {
                let selectedEligible;
                selectedEligible = filterObjectsFromArray(
                  selectedEligiblesFor,
                  item
                );
                setSelectedEligiblesFor(selectedEligible);
              }}
              key={idx}
              className="flex items-center justify-between gap-5 bg-gray-100 mb-1"
            >
              <div className="py-1 pl-3 text-sm font-semibold text-gray-500 capitalize whitespace-nowrap">
                <span className="mr-2">{idx + 1}</span>
                {item?.name}
              </div>
              <div className="hover:bg-red-500 h-full w-full flex justify-center items-center rounded-r px-1 cursor-pointer text-red-500 hover:text-white transition-colors duration-200">
                <RxCross2 className="h-5 w-5" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default EligibleFor;
