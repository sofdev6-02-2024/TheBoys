import React from 'react';
import Button from '@/app/components/Button';

interface Props {
  isOpen: boolean;
  onConfirm: () => void;
  onCancel: () => void;
}

export const ConfirmExitModal: React.FC<Props> = ({
  isOpen,
  onConfirm,
  onCancel
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-[#28292E] p-6 rounded-lg shadow-xl">
        <h3 className="text-lg font-medium mb-4 text-white">
          Are you sure you want to cancel the submission?
        </h3>
        <div className="flex justify-end gap-4">
          <Button
            type="button"
            onClick={onCancel}
            backgroundColor="primary"
          >
            Cancel
          </Button>
          <Button
            type="button"
            onClick={onConfirm}
            backgroundColor="secondary"
          >
            Exit
          </Button>
        </div>
      </div>
    </div>
  );
};
