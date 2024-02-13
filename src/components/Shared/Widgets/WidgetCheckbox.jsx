import React from "react";
import { Controller } from "react-hook-form";
import { Checkbox, Typography } from "@material-tailwind/react";

const WidgetCheckbox = ({ labelName, checkboxId, control, name }) => {
    return (
        <label
            htmlFor={checkboxId}
            className="flex w-full cursor-pointer items-center px-3"
        >
            <Controller
                control={control}
                rules={{
                    required: false,
                }}
                render={({ field: { onChange, onBlur, ref, value } }) => (
                    <Checkbox
                        id={checkboxId}
                        name={name}
                        label={
                            <Typography
                                color="blue-gray"
                                className="flex font-normal text-sm"
                            >
                                {labelName}
                            </Typography>
                        }
                        checked={value === true ? true : false}
                        onBlur={onBlur}
                        onChange={onChange}
                        inputRef={ref}
                        value={value}
                        className="h-5 w-5 rounded-md border-gray-900/20 bg-white transition-all hover:scale-105 hover:before:opacity-0"
                        ripple={false}
                    />
                )}
                name={name}
            />
        </label>
    );
};

export default WidgetCheckbox;
