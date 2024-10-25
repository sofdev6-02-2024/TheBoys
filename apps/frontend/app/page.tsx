import Header from "../app/HomePage/Header";
import Footer from "./HomePage/Footer";
import HomePage from "./HomePage/HomePage";
import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen bg-black flex flex-col">
      <Header />
      <main className="flex-grow">
       
        <HomePage/>
        
      </main>
      <Footer />
    </div>
  );
}
