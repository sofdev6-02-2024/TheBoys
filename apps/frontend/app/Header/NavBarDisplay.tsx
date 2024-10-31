import NavBar from "./NavBar";
import logo from "../Images/logo.png";
import {  FiMenu } from "react-icons/fi";
import { FaUser } from "react-icons/fa";
import { FaHouseChimney } from "react-icons/fa6";
import { HiUsers } from "react-icons/hi";
import { FaMonument,FaDumbbell } from "react-icons/fa";



const icons = [
  { id: 'home', IconElement: <FaHouseChimney className="w-9 h-9" />, alt: 'Home icon' },
  { id: 'users', IconElement: <HiUsers className="w-9 h-9" />, alt: 'Users icon' },
  { id: 'workout', IconElement: <FaDumbbell className="w-9 h-9" />, alt: 'Workout icon' },
  { id: 'profile', IconElement: <FaUser className="w-9 h-9" />, alt: 'Profile icon' },
  { id: 'notifications', IconElement: <FaMonument className="w-9 h-9" />, alt: 'Notifications icon' },
];

export default function HomePage() {
  return (
    <NavBar
      appName="BODY BOOST"
      logoSrc={logo}
      menuItems={["Home", "Community", "Trainers"]}
      icons={icons}
      menuIcon={<FiMenu className="text-white w-10 h-10" />}
      notificationIcon={<FaMonument className="text-white w-10 h-10 cursor-pointer" />}
      userIcon={<FaUser className="text-white w-10 h-10 cursor-pointer" />}
    />
  );
}
