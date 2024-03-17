import React, { useState } from 'react';
import AddProgram from '../../../components/Learning/Program/AddProgram';
import { useGetAllProgramQuery } from '../../../store/service/learningProgram/learningProgramApiService';

const LearningProgram = () => {
  const [modalOpen, setModalOpen] = useState(false);
  // redux api
  const { data: programInfo } = useGetAllProgramQuery()
  console.log(programInfo);
    return (
      <div className="py-10 w-full">
        <div className="flex justify-between items-center mb-5">
          <h1 className="font-bold text-xl md:text-2xl text-white">
            All Program
          </h1>
          <div
            onClick={() => setModalOpen(true)}
            className="font-semibold text-sm border px-6 py-[6px] text-[#1C6BAD] rounded-sm border-sky-200 bg-white cursor-pointer"
          >
            Add Program
          </div>
        </div>
        {/* add Program Modal */}
        {modalOpen && (
          <AddProgram modalOpen={modalOpen} setModalOpen={setModalOpen} />
        )}
      </div>
    );
};

export default LearningProgram;