"use client";

import React from "react";
import TextField from "../components/TextField";
import Button from "../components/Button";
import { useKeycloakProfile } from "./hooks/useUserProfile";
import { useCoachRequest } from "./hooks/useCoachRequest";
import { CoachRequestModal } from "./modals/RequestModal";
import { ConfirmExitModal } from "./modals/ExitModal";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import RoutesNavigation from "../../routes";

const UserProfile: React.FC = () => {
  const {
    user,
    isLoading,
    
    //newImageUrl,
    //setNewImageUrl,
    //isEditingImage,
    //setIsEditingImage,
    //handleImageSave,
    //handleApplyForTrainer
  } = useKeycloakProfile();

  const router = useRouter();

  const {
    isModalOpen,
    setIsModalOpen,
    isConfirmExitOpen,
    setIsConfirmExitOpen,
    isLoading: isSubmitting,
    handleSubmit,
    handleClose,
    confirmClose
  } = useCoachRequest();

  const handleMenuItemClick = () => {
 
    router.push(RoutesNavigation.CommunitiesTrainer);
  };

  if (isLoading) {
    return <p className="text-white text-center">Loading user data...</p>;
  }

  if (!user) {
    return <p className="text-white text-center">Please log in to view your profile</p>;
  }

  const renderRoleButtons = () => {
    const buttonStyles =
      "bg-secondary-default hover:bg-secondary-hover active:bg-secondary-active text-white";

    return user.role === "Trainer" ? (
      <div className="flex flex-col items-center gap-4">
        <div className="flex gap-4">
          <Button
            backgroundColor="secondary"
            className={buttonStyles}
            onClick={() => toast.success("Viewing Statistics")}
          >
            Statistics
          </Button>
          <Button
            backgroundColor="secondary"
            className={buttonStyles}
            onClick={() => handleMenuItemClick()}
          >
            Communities
          </Button>
        </div>
      </div>
    ) : (
      <Button
        backgroundColor="secondary"
        className={buttonStyles}
        onClick={() => setIsModalOpen(true)}
      >
        Request to be a Coach
      </Button>
    );
  };

  return (
    <>
      <div className="flex flex-col h-screen justify-center items-center p-4">
        <h1 className="text-white text-2xl sm:text-4xl font-bold text-center sm:mb-12 sm:absolute sm:top-24">
          {`${user.role.charAt(0).toUpperCase() + user.role.slice(1)} Profile`}
        </h1>
        <div className="flex flex-col sm:flex-row sm:gap-24 gap-8 items-center sm:mt-20">
          <div className="flex flex-col items-center gap-6">
            <div className="relative">
              <div
                style={{
                  backgroundImage: `url(${user.userImage})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                }}
                className="rounded-full w-48 sm:w-64 h-48 sm:h-64 border-4 sm:border-8 border-black"
                role="img"
                aria-label="Profile Picture"
              />
            </div>
            {renderRoleButtons()}
          </div>
          <div className="flex flex-col justify-center items-center sm:items-start h-auto sm:pt-12 w-full sm:w-auto">
            <div className="flex flex-col gap-4 w-full sm:w-auto">
              <TextField
                label="First Name:"
                type="text"
                placeholder="First Name"
                value={user.firstName}
                disabled
              />
              <TextField
                label="Last Name:"
                type="text"
                placeholder="Last Name"
                value={user.lastName}
                disabled
              />
              <TextField
                label="Email:"
                type="email"
                placeholder="Email"
                value={user.email}
                disabled
              />
            </div>
          </div>
        </div>
      </div>

      <CoachRequestModal
        isOpen={isModalOpen}
        onClose={handleClose}
        onSubmit={handleSubmit}
        isLoading={isSubmitting}
      />

      <ConfirmExitModal
        isOpen={isConfirmExitOpen}
        onConfirm={confirmClose}
        onCancel={() => setIsConfirmExitOpen(false)}
      />
    </>
  );
};

export default UserProfile;
