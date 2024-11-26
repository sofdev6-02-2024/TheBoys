"use client"; 

import { RoutineButton } from "./Components/RoutineButton";
import { RoutineBox } from "./Components/RoutineBox";
import { RoutineHero } from "./Components/RoutineHero";
import { RoutineBenefits } from "./Components/RoutineBenefits";
import routineHero from "./Assets/routineHero.webp";
import routineHeroMobile from "./Assets/routineHeroMobile.webp";
import dailyChallenge from "./Assets/dailyChallenge.webp";
import yourProgress from "./Assets/yourProgress.webp";
import benefit1 from "./Assets/benefit1.webp";
import benefit2 from "./Assets/benefit2.webp";
import benefit3 from "./Assets/benefit3.webp";
import benefit4 from "./Assets/benefit4.webp";
import benefit1Mobile from "./Assets/benefit1Mobile.webp";
import benefit2Mobile from "./Assets/benefit2Mobile.webp";
import benefit3Mobile from "./Assets/benefit3Mobile.webp";
import benefit4Mobile from "./Assets/benefit4Mobile.webp";
import { AuthProvider, useAuth } from "../AuthContextType"; 
import { useRouter } from 'next/navigation';
import RoutesNavigation from "../../routes"; 



export default function RoutinesUser() {
    return (
      <AuthProvider>
        <RoutinesPage />
      </AuthProvider>
    );
  }

function RoutinesPage() {

    const {isLoggedIn}  = useAuth(); 
    const router = useRouter(); 

    const routineBenefits = [
        { src: benefit1, mobileSrc: benefit1Mobile, alt: "Image 1", title: "Create your Routines", text: "Customize and create the routine that best suits your objectives."},
        { src: benefit2, mobileSrc: benefit2Mobile, alt: "Image 2", title: "Generate Routines", text: "Generate a routine for yourself with AI."},
        { src: benefit3, mobileSrc: benefit3Mobile, alt: "Image 3", title: "Daily Challenge", text: "Each day you will have a random exercise to complete whenever you want." },
        { src: benefit4, mobileSrc: benefit4Mobile, alt: "Image 4", title: "Progress Visualization", text: "Visualize your progress with detailed statistics"},
    ];

    const heroDescription = !isLoggedIn 
        ? "Join us to start creating your personalized workout routines and track your progress."
        : undefined;

        const handleNewRoutineClick = () => {
            router.push(RoutesNavigation.CreateRoutine)
          };

          const handleYourRoutineClick = () => {
            router.push(RoutesNavigation.YouRoutine)
          };  

    
    return (
        
        <main className="w-full max-w-7xl mx-auto px-4  ">
            <RoutineHero
                desktopSrc={routineHero}
                mobileSrc={routineHeroMobile}
                bannerTitle="Routines"
                description={heroDescription}
                isLoggedIn={isLoggedIn}
            />

            {!isLoggedIn ? (
                <>
                    <section className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
                        <RoutineButton buttonText="New Routine" description="Start with a new training routine" onClick={handleNewRoutineClick}/>
                        <RoutineButton buttonText="Your Routines" description="Go to your routines" onClick={handleYourRoutineClick}/>
                        <RoutineButton buttonText="AI GYM" description="Generate your routine with our bot" />
                    </section>

                    <section className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <RoutineBox src={dailyChallenge} boxInfo="Daily Challenge" buttonText="Start Challenge" />
                        <RoutineBox src={yourProgress} boxInfo="Your Progress" buttonText="View Details" />
                    </section>
                </>
            ) : (
                <RoutineBenefits images={routineBenefits} />
            )}
        </main>
        
    );
}
