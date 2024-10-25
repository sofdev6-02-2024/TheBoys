
import Header from "./NavBar";
import logo from "../Images/logo.png";
import menuIcon from "../Images/menuIcon.png";
import notificationIcon from "../Images/notification.png";
import userIcon from "../Images/user.png";
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

export default function HomePage() {

  return (
    <Header
      appName="BODY BOOST"
      logoSrc={logo}
      menuItems={["Home", "Community", "Trainers"]}
      icons={icons}
      menuIcon={menuIcon}
      notificationIcon={notificationIcon}
      userIcon={userIcon}
    />
  );
}
