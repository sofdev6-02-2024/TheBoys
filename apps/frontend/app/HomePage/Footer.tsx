"use client";

import Image from "next/image";
import { useState } from "react";

import homeIcon from "../Images/home.png";
import usersIcon from "../Images/users.png";
import workoutIcon from "../Images/workout.png";
import profileIcon from "../Images/user.png";
import notificationsIcon from "../Images/notification.png";

const icons = [
  { id: 'home', src: homeIcon, alt: 'Home icon' },
  { id: 'users', src: usersIcon, alt: 'Users icon' },
  { id: 'workout', src: workoutIcon, alt: 'Workout icon' },
  { id: 'profile', src: profileIcon, alt: 'Profile icon' },
  { id: 'notifications', src: notificationsIcon, alt: 'Notifications icon' },
];

export default function Footer() {
  const [activeIcon, setActiveIcon] = useState<string | null>(null);

  const handleIconClick = (id: string) => {
    setActiveIcon(id);
    console.log(`Icon clicked: ${id}`);
  };

  return (
    <div className="w-full bg-[#28292E] p-2 fixed bottom-0 block sm:hidden ">
      <div className="flex justify-between items-center max-w-lg mx-auto">
        {icons.map(({ id, src, alt }) => (
          <div
            key={id}
            className="relative cursor-pointer"
            onClick={() => handleIconClick(id)}
          >
            <Image
              src={src}
              alt={alt}
              width={44}
              height={44}
              objectFit="contain"
              className={`transition duration-200 ${
                activeIcon === id ? 'filter-red' : ''
              }`}
            />

            {activeIcon === id && (
              <div className="absolute inset-0 w-full h-full">
                <Image
                  src={src}
                  alt={alt}
                  width={44}
                  height={44}
                  objectFit="contain"
                  className="filter-red transition duration-200"
                  style={{
                    filter: 'invert(36%) sepia(83%) saturate(7500%) hue-rotate(330deg)',
                  }}
                />
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
