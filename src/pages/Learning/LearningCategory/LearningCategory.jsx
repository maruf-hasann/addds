import React, { useState } from 'react';
import AddLearningCategory from '../../../components/Learning/LearningCategory/AddLearningCategory';

const LearningCategory = () => {
     const [modalOpen, setModalOpen] = useState(false);
    return (
      <div className="py-10 w-full">
        <div className="flex justify-between items-center mb-5">
          <h1 className="font-bold text-xl md:text-2xl text-white">
            All Category
          </h1>
          <div
            onClick={() => setModalOpen(true)}
            className="font-semibold text-sm border px-6 py-[6px] text-[#1C6BAD] rounded-sm border-sky-200 bg-white cursor-pointer"
          >
            Add Category
          </div>
        </div>

        {/* add category Modal */}
        {modalOpen && (
          <AddLearningCategory modalOpen={modalOpen} setModalOpen={setModalOpen} />
        )}
      </div>
    );
};

export default LearningCategory;