"use client";

import React from "react";
import CommunityList from "./components/CommunityList";
import CommunityModal from "./components/CommunityModal";
import { useCommunities } from "./components/hooks/useCommunities";

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
