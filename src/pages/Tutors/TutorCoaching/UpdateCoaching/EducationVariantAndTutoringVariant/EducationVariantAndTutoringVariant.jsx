import { commonSelectClassName } from "../../../../../libs/commonSelectClassName";


const EducationVariantAndTutoringVariant = ({
  register,
  initialState,
  setInitialState,
  educationVariants,
  errors,
  setSelectedTutoringSubjects,
  tutoringVariants,
}) => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      {/* education variant */}
      <div className="w-full">
        <label className="block mb-3 text-sm font-semibold outline-none text-gray-900 dark:text-white">
          Education Variant *
        </label>
        <select
          {...register("educationVariant", {
            required: initialState?.educationVariant ? false : "Education variant is required",
          })}
          className={commonSelectClassName}
          value={initialState?.educationVariant}
          onChange={(event) =>
            setInitialState({
              ...initialState,
              educationVariant: event.target.value,
            })
          }
        >
          <option value="" disabled>
            Select Education Variant
          </option>
          {educationVariants?.map((variant, idx) => (
            <option key={idx} value={variant?.variantName}>
              {variant?.variantName}
            </option>
          ))}
        </select>
        {errors.educationVariant && (
          <p className="text-red-500 text-sm absolute">
            {errors.educationVariant?.message}
          </p>
        )}
      </div>
      {/* tutoring variant */}
      <div className="w-full">
        <label className="block mb-3 text-sm font-semibold outline-none text-gray-900 dark:text-white">
          Tutoring Variant *
        </label>
        <select
          {...register("tutoringVariant", {
            required: initialState?.tutoringVariant ? false : "Tutoring variant is required",
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
    </div>
  );
};

export default EducationVariantAndTutoringVariant;
