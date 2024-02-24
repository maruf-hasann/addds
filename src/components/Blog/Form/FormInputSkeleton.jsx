import React from 'react';

const FormInputSkeleton = () => {
    return (
      <div className="animate-pulse mb-4">
        <div className="w-[20%] bg-gray-200 h-2 mb-3 rounded-md"></div>
        <div className="w-[100%] bg-gray-200 h-8 rounded-md"></div>
      </div>
    );
};

export default FormInputSkeleton;