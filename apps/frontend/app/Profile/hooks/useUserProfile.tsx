'use client'

import { useState } from "react";
import axios from "axios";
import { toast } from "sonner";
import { useAuth } from '../../AuthContextType';

export interface UserProfile {
  userId: string;
  userImage?: string;
}

export function useUserProfile() {
  const authContext = useAuth();
  const { user, setUser } = authContext;
  const [isLoading, setIsLoading] = useState(false);
  const [isEditingImage, setIsEditingImage] = useState(false);
  const [newImageUrl, setNewImageUrl] = useState('');

  const handleImageSave = async () => {
    if (!user) return;

    try {
      setIsLoading(true);
      const apiUrl = 'http://localhost:4444/users/';

      await axios.put(`${apiUrl}${user.userId}`, {
        userImage: newImageUrl,
      });

      setUser({ ...user, userImage: newImageUrl });
      setIsEditingImage(false);
      setNewImageUrl('');
      toast.success('Profile image updated successfully');
    } catch (error) {
      console.error(error);
      toast.error('Error updating profile image');
    } finally {
      setIsLoading(false);
    }
  };

  return {
    isLoading,
    user,
    newImageUrl,
    setNewImageUrl,
    isEditingImage,
    setIsEditingImage,
    handleImageSave,
  };
}
