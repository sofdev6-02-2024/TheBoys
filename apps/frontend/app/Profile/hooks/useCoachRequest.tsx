import { useState } from 'react';
import { toast } from 'sonner';
import { CoachRequest } from '../forms/coach-request';
import { useKeycloakProfile } from './useUserProfile';

export const useCoachRequest = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isConfirmExitOpen, setIsConfirmExitOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { user } = useKeycloakProfile();

  const checkExistingRequest = async () => {
    if (!user?.id) return false;
    
    try {
      const response = await fetch(`http://localhost:4444/trainer-requests`);
      const requests = await response.json();
      return requests.some((request: { userId: string }) => request.userId === user.id);
    } catch (error) {
      console.error('Error checking existing request:', error);
      return false;
    }
  };

  const handleSubmit = async (data: CoachRequest) => {
    if (!user?.id) {
      toast.error('User not authenticated');
      return;
    }

    setIsLoading(true);
    
    try {
      const hasExistingRequest = await checkExistingRequest();
      if (hasExistingRequest) {
        toast.error('Your request is under review');
        return;
      }

      const response = await fetch('http://localhost:4444/trainer-requests/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userId: user.id,
          ...data
        }),
      });

      if (response.status === 201) {
        toast.success('Your request has been sent and is in pending status');
        setIsModalOpen(false);
      } else {
        throw new Error('Failed to submit request');
      }
    } catch (error) {
      toast.error('Error submitting request');
    } finally {
      setIsLoading(false);
    }
  };

  const handleClose = () => {
    setIsConfirmExitOpen(true);
  };

  const confirmClose = () => {
    setIsModalOpen(false);
    setIsConfirmExitOpen(false);
  };

  return {
    isModalOpen,
    setIsModalOpen,
    isConfirmExitOpen,
    setIsConfirmExitOpen,
    isLoading,
    handleSubmit,
    handleClose,
    confirmClose
  };
};
