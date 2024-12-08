"use client";

import React, { useEffect, useState } from "react";
import CommunityList from "./components/CommunityList";
import CommunityModal from "./components/CommunityModal";
import { useCommunities } from "./components/hooks/useCommunities";
import { useKeycloakProfile } from "@/app/Profile/hooks/useUserProfile";


type UserRole = "Trainer" | "Admin" | null;

export default function CommunitiesPage() {
  const {
    isModalOpen,
    setIsModalOpen,
    formData,
    setFormData,
    imageUrl,
    filteredCommunities,
    isEditing,
    isLoading,
    handleImageUpload,
    handleConfirm,
    handleEditCommunity,
    handleDeleteCommunity,
  } = useCommunities();

  const { user } = useKeycloakProfile();
  const [isLoadingUserRole, setIsLoadingUserRole] = useState(true);
  const [userRole, setUserRole] = useState<UserRole>(null);

  useEffect(() => {
    if (user) {
      if (user.role === "Trainer" || user.role === "Admin") {
        setUserRole(user.role);
      } else {
        setUserRole(null); 
      }
      setIsLoadingUserRole(false);
    }
  }, [user]);

  if (isLoadingUserRole) {
    return (
      <div className="flex flex-col justify-center items-center h-full">
        <h1 className="text-3xl font-bold text-white">Loading your Community...</h1>
        <p className="text-lg text-gray-300">Please wait while we fetch your data.</p>
      </div>
    );
  }

  if (userRole !== "Trainer") {
    return (
      <div className="flex flex-col justify-center items-center h-full">
        <h1 className="text-3xl font-bold text-red-500">Access Denied</h1>
        <p className="text-lg text-gray-300">You do not have permission to access this page.</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col justify-start items-center h-full space-y-10 px-4 pt-20">
      <h1 className="text-3xl font-bold text-center text-white mt-0">Communities</h1>

      <div className="max-w-[1440px] w-full flex flex-col">
        <button
          className="bg-red-500 text-white px-4 py-2 rounded-md ml-auto"
          onClick={() => {
            setIsModalOpen(true);
            setFormData({
              name: "",
              description: "",
              type: "",
              cost: 0,
              trainerId: "",
              imageUrl: "",
            });
          }}
        >
          Create New Community
        </button>

        <CommunityModal
          isModalOpen={isModalOpen}
          setIsModalOpen={setIsModalOpen}
          formData={formData}
          setFormData={setFormData}
          handleConfirm={handleConfirm}
          handleImageUpload={handleImageUpload}
          isEditing={isEditing}
          imageUrl={imageUrl}
        />
        {isLoading ? (
          <p className="text-center text-lg font-semibold">Loading communities...</p>
        ) : (
          <CommunityList
            communities={filteredCommunities}
            onEdit={handleEditCommunity}
            onDelete={handleDeleteCommunity}
            isLoading={isLoading}
          />
        )}
      </div>
    </div>
  );
}

