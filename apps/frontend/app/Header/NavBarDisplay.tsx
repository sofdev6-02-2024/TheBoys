
import Header from "./NavBar";
import logo from "../Images/logo.png";
import menuIcon from "../Images/IconImages/menuIcon.png";
import notificationIcon from "../Images/IconImages/notification.png";
import userIcon from "../Images/IconImages/user.png";
import homeIcon from "../Images/IconImages/home.png";
import usersIcon from "../Images/IconImages/users.png";
import workoutIcon from "../Images/IconImages/workout.png";

const icons = [
  { id: 'home', src: homeIcon, alt: 'Home icon' },
  { id: 'users', src: usersIcon, alt: 'Users icon' },
  { id: 'workout', src: workoutIcon, alt: 'Workout icon' },
  { id: 'profile', src: userIcon, alt: 'Profile icon' },
  { id: 'notifications', src: notificationIcon, alt: 'Notifications icon' },
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
