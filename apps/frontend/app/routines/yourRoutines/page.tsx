
import RoutinesGrid from "./components/RoutinesGrid";


export default function Home() {

  return (
    <div className="min-h-screen bg-[#28292E] flex flex-col items-center px-4  pb-20">
      <div className="max-w-[1440px] w-full flex flex-col">
        <h1 className="text-2xl font-bold text-center text-white mt-4">Your Routines</h1>
        <RoutinesGrid />
      </div>
    </div>
  );
}
