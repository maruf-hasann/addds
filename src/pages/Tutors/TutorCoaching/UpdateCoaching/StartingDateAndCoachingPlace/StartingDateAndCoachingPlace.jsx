import { commonInputClassName } from "../../../../../libs/commonInputClassName";
import { commonSelectClassName } from "../../../../../libs/commonSelectClassName";


const StartingDateAndCoachingPlace = ({
  register,
  errors,
  initialState,
  setInitialState,
}) => {
  const places = [
    {
      id: 1,
      placeName: "Online at Zoom",
    },
    {
      id: 2,
      placeName: "Offline at Institute",
    },
    {
      placeName: "Offline at Tutor Place",
    },
  ];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      {/* starting date */}
      <div className="w-full">
        <label className="block mb-3 text-sm font-semibold outline-none text-gray-900 dark:text-white">
          Starting Date *
        </label>
        <input
          type="date"
          {...register("startingDate", {
            required: initialState?.startingDate
              ? false
              : "Starting date is required",
          })}
          value={initialState?.startingDate ? initialState.startingDate.substring(0, 10) : ''}
          onChange={(e) =>
            setInitialState({ ...initialState, startingDate: e.target.value })
          }
          className={commonInputClassName}
        />
        {errors.startingDate && (
          <p className="text-red-500 text-sm absolute">
            {errors?.startingDate?.message}
          </p>
        )}
      </div>
      {/* Coaching place */}
      <div className="w-full">
        <label className="block mb-3 text-sm font-semibold outline-none text-gray-900 dark:text-white">
          Coaching Place *
        </label>
        <select
          {...register("coachingPlace", {
            required: initialState?.coachingPlace
              ? false
              : "Coaching Place is required",
          })}
          value={initialState?.coachingPlace}
          onChange={(e) =>
            setInitialState({ ...initialState, coachingPlace: e.target.value })
          }
          className={commonSelectClassName}
          defaultValue={""}
        >
          <option value="" disabled>
            Select Place
          </option>
          {places?.map((place, idx) => (
            <option key={idx} value={place?.placeName}>
              {place?.placeName}
            </option>
          ))}
        </select>
        {errors.coachingPlace && (
          <p className="text-red-500 text-sm absolute">
            {errors.coachingPlace?.message}
          </p>
        )}
      </div>
    </div>
  );
};

export default StartingDateAndCoachingPlace;
