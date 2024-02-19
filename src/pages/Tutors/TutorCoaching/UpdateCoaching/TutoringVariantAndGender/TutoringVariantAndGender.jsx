import { commonSelectClassName } from "../../../../../libs/commonSelectClassName";


const TutoringVariantAndGender = ({
  register,
  initialState,
  setInitialState,
  errors,
  setSelectedTutoringSubjects,
  tutoringVariants,
}) => {
  const genders = [
    {
      id: 1,
      genderName: "Male",
      value: "male",
    },
    {
      id: 2,
      genderName: "Female",
      value: "female",
    },
    {
      id: 3,
      genderName: "Any Gender",
      value: "any gender",
    },
  ];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">

      {/* tutoring variant */}
      <div className="w-full">
        <label className="block mb-3 text-sm font-semibold outline-none text-gray-900 dark:text-white">
          Tutoring Variant *
        </label>
        <select
          {...register("tutoringVariant", {
            required: initialState?.tutoringVariant
              ? false
              : "Tutoring variant is required",
          })}
          className={commonSelectClassName}
          value={initialState?.tutoringVariant}
          onChange={(event) => {
            setInitialState({
              ...initialState,
              tutoringVariant: event.target.value,
            }),
              setSelectedTutoringSubjects([]);
          }}
        >
          <option value="" disabled>
            Select Tutoring Variant
          </option>
          {tutoringVariants?.map((variant, idx) => (
            <option key={idx} value={variant?.variant}>
              {variant?.variant}
            </option>
          ))}
        </select>
        {errors.tutoringVariant && (
          <p className="text-red-500 text-sm absolute">
            {errors.tutoringVariant?.message}
          </p>
        )}
      </div>
      {/* gender */}
      <div className="w-full">
        <label className="block mb-3 text-sm font-semibold outline-none text-gray-900 dark:text-white">
         Eligible Gender *
        </label>
        <select
          {...register("gender", {
            required: initialState?.gender ? false : "Gender is required",
          })}
          className={commonSelectClassName}
          value={initialState?.gender}
          onChange={(event) =>
            setInitialState({
              ...initialState,
              gender: event.target.value,
            })
          }
        >
          <option value="" disabled>
            Select Gender
          </option>
          {genders?.map((gender, idx) => (
            <option key={idx} value={gender?.value}>
              {gender?.genderName}
            </option>
          ))}
        </select>
        {errors.gender && (
          <p className="text-red-500 text-sm absolute">
            {errors.gender?.message}
          </p>
        )}
      </div>
    </div>
  );
};

export default TutoringVariantAndGender;
