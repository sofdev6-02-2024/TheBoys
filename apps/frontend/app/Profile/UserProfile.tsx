"use client";

import React, { useState } from "react";
import TextField from "../components/TextField";
import Button from "../components/Button";

const DEFAULT_IMAGE =
  "https://media.themoviedb.org/t/p/w300_and_h450_bestv2/wo2hJpn04vbtmh0B9utCFdsQhxM.jpg";

const UserProfile: React.FC = () => {
  const [user, setUser] = useState({
    username: "John Doe",
    email: "johndoe@example.com",
    password: "password123",
    role: "User", // 'User' o 'Trainer'
    userImage: DEFAULT_IMAGE,
  });

  const [newImageUrl, setNewImageUrl] = useState("");
  const [isEditingImage, setIsEditingImage] = useState(false);

  const updateUserField = (field: keyof typeof user, value: string) => {
    setUser((prev) => ({ ...prev, [field]: value }));
  };

  const handleImageSave = () => {
    setUser((prev) => ({ ...prev, userImage: newImageUrl || DEFAULT_IMAGE }));
    setIsEditingImage(false);
  };

  const renderRoleButtons = () => {
    const buttonStyles =
      "bg-secondary-default hover:bg-secondary-hover active:bg-secondary-active text-white";

    return user.role === "Trainer" ? (
      <div className="flex flex-col items-center gap-4">
        <div className="flex gap-4">
          <Button
            backgroundColor="secondary"
            className={buttonStyles}
            onClick={() => alert("Viewing Statistics")}
          >
            Statistics
          </Button>
          <Button
            backgroundColor="secondary"
            className={buttonStyles}
            onClick={() => alert("Managing Communities")}
          >
            Communities
          </Button>
        </div>
        <Button
          backgroundColor="secondary"
          className={buttonStyles}
          onClick={() => alert("Logging Out")}
        >
          Log Out
        </Button>
      </div>
    ) : (
      <Button
        backgroundColor="secondary"
        className={buttonStyles}
        onClick={() => alert("Logging Out")}
      >
        Log Out
      </Button>
    );
  };

  return (
    <div className="flex flex-col h-screen justify-center items-center p-4">
      <h1 className="text-white text-2xl sm:text-4xl font-bold text-center sm:mb-12 sm:absolute sm:top-24">
        {`${user.role} Profile`}
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
            <button
              className="absolute bottom-2 right-2 p-2 bg-black rounded-full"
              onClick={() => setIsEditingImage(true)}
            >
              ✏️
            </button>
          </div>
          {renderRoleButtons()}
        </div>
        <div className="flex flex-col justify-center items-center sm:items-start h-auto sm:pt-12 w-full sm:w-auto">
          <div className="flex flex-col gap-4 w-full sm:w-auto">
            <TextField
              label="User Name:"
              type="text"
              placeholder="Name"
              value={user.username}
              onChange={(e) => updateUserField("username", e.target.value)}
            />
            <TextField
              label="Email:"
              type="email"
              placeholder="Email"
              value={user.email}
              onChange={(e) => updateUserField("email", e.target.value)}
            />
            <TextField
              label="Password:"
              type="password"
              placeholder="Password"
              value={user.password}
              onChange={(e) => updateUserField("password", e.target.value)}
            />
          </div>
        </div>
      </div>
      {isEditingImage && (
        <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50">
          <div className="bg-[#28292E] p-4 rounded shadow-lg w-11/12 sm:w-auto">
            <h2 className="mb-2">Edit Profile Image URL</h2>
            <TextField
              type="text"
              placeholder="Enter new image URL"
              value={newImageUrl}
              onChange={(e) => setNewImageUrl(e.target.value)}
            />
            <div className="flex justify-end mt-4 gap-4">
              <Button
                backgroundColor="secondary"
                className="bg-secondary-default hover:bg-secondary-hover active:bg-secondary-active text-white"
                onClick={() => setIsEditingImage(false)}
              >
                Cancel
              </Button>
              <Button
                backgroundColor="secondary"
                className="bg-secondary-default hover:bg-secondary-hover active:bg-secondary-active text-white"
                onClick={handleImageSave}
              >
                Save
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserProfile;
