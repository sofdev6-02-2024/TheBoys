import React from 'react';
import { CoachRequest } from '../forms/coach-request';
import { CoachRequestForm } from '../forms/CoachRequestForm';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: CoachRequest) => Promise<void>;
  isLoading: boolean;
}

export const CoachRequestModal: React.FC<Props> = ({
  isOpen,
  onClose,
  onSubmit,
  isLoading
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center p-4">
      <div className="bg-[#28292E] p-6 rounded-lg shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <h2 className="text-xl font-bold mb-4 text-white">Request to be a Trainer</h2>
        <CoachRequestForm
          onSubmit={onSubmit}
          onClose={onClose}
          isLoading={isLoading}
        />
      </div>
    </div>
  );
};
