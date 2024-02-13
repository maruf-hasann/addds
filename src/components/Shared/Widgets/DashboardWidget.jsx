import React from "react";

const DashboardWidget = ({ children, amount, name }) => {
    return (
        <div className="bg-white shadow-sm shadow-white rounded-2xl p-4 hover:-translate-y-1 transition-all duration-500 hover:cursor-pointer">
            <div className="grid grid-cols-4 items-center justify-between">
                <div className="inline-flex col-span-1 flex-shrink-0 justify-center items-center w-12 h-12 text-white bg-gradient-to-br from-primary to-primary/80 rounded-lg">
                    {children}
                </div>
                <div className="flex-shrink-0 ml-3 col-span-3">
                    <span className="text-2xl font-bold leading-none text-gray-800 sm:text-3xl">
                        {amount}
                    </span>
                    <h3 className="text-base font-normal text-gray-500">
                        {name}
                    </h3>
                </div>
            </div>
        </div>
    );
};

export default DashboardWidget;
