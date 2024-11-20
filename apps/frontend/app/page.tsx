import HomePage from "./HomePage/HomePage";
import UserProfilePage from "./Profile/page";

export default function Home() {

  return (
    <div className="min-h-screen bg-[#28292E] flex flex-col items-center">
      <div className="max-w-[1440px] w-full flex flex-col">
        <main className="flex-grow">
          <UserProfilePage />
        </main>
      </div>
    </div>
  );
}
