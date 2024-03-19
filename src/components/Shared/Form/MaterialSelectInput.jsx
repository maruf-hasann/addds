import PropTypes from "prop-types";
import { Select } from "@material-tailwind/react";

const MaterialSelectInput = ({
  register,
  selectName,
  errorMessage,
  error,
  children,
  label,
  setValue,
}) => {
  return (
    <>
      <label
        htmlFor="className"
        className="block mb-3 text-sm font-semibold outline-none text-gray-900 dark:text-white"
      >
        {label}
      </label>

      <div className="my-3">
        <Select
          {...register(selectName, {
            required: errorMessage,
          })}
          onChange={(value) => {
            setValue(selectName, value);
          }}
          label={label}
          error={error?.message}
        >
          {children}
        </Select>
      </div>
      <p className="text-pinkRed text-xs mt-1">{error?.message}</p>
    </>
  );
};

MaterialSelectInput.propTypes = {
  register: PropTypes.func.isRequired,
  setValue: PropTypes.func.isRequired,
  error: PropTypes.object,
  children: PropTypes.any,
  label: PropTypes.string.isRequired,
  selectName: PropTypes.string.isRequired,
  errorMessage: PropTypes.string,
};

export default MaterialSelectInput;
