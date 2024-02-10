import { handleRemoveMinus } from "../../../../../libs/additionalInfo/handleRemoveMinus";


const CoachingFeeAndDuration = ({
  errors,
  register,
  initialState,
  setInitialState,
}) => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      <div className="w-full">
        <label className="block mb-3 text-sm font-semibold outline-none text-gray-900 dark:text-white">
          Coaching Fee (BDT) *
        </label>
        <input
          type="number"
          {...register("coachingFee", {
            required:
              initialState?.coachingFee === 0 || initialState?.coachingFee
                ? false
                : "Coaching Fee is required",
          })}
          value={initialState?.coachingFee}
          onChange={(e) =>
            setInitialState({ ...initialState, coachingFee: e.target.value })
          }
          className={`shadow-sm bg-gray-50 border border-gray-300 outline-none text-gray-900 text-sm rounded-md focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light `}
          placeholder="2500 BDT"
          onKeyDown={handleRemoveMinus}
        />
        {errors.coachingFee && (
          <p className="text-red-500 text-sm absolute">
            {errors?.coachingFee?.message}
          </p>
        )}
      </div>
      <div className="w-full">
        <label className="block mb-3 text-sm font-semibold outline-none text-gray-900 dark:text-white">
          Coaching Duration (Month) *
        </label>
        <input
          type="number"
          {...register("coachingDuration", {
            required: initialState?.duration
              ? false
              : "Coaching Duration is required",
          })}
          value={initialState?.duration}
          onChange={(e) =>
            setInitialState({ ...initialState, duration: e.target.value })
          }
          className={`shadow-sm bg-gray-50 border border-gray-300 outline-none text-gray-900 text-sm rounded-md focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light `}
          placeholder="6 Months"
          onKeyDown={handleRemoveMinus}
        />
        {errors.coachingDuration && (
          <p className="text-red-500 text-sm absolute">
            {errors?.coachingDuration?.message}
          </p>
        )}
      </div>
    </div>
  );
};

export default CoachingFeeAndDuration;
