"use client";

import Image, { StaticImageData } from "next/image";

interface RoutineHeroProps {
    desktopSrc: StaticImageData;
    mobileSrc: StaticImageData;
    bannerTitle: string;
    description?: string;
    isLoggedIn: boolean;
}

export const RoutineHero = ({ 
    desktopSrc, 
    mobileSrc, 
    bannerTitle, 
    description, 
    isLoggedIn 
}: RoutineHeroProps) => {
    return (
        <section 
            className={`relative w-full mb-8 bg-black md:rounded-lg md:overflow-hidden ${!isLoggedIn ? 'hidden md:block' : ''}`}
            aria-labelledby="hero-title"
        >
            {/* Mobile Image */}
            <figure className="md:hidden relative h-[404px] w-screen -mx-4">
                <Image 
                    src={mobileSrc}
                    alt="Fitness Hero Mobile"
                    fill
                    className="object-cover"
                    aria-hidden="true"
                />
                <div className="absolute inset-0 bg-black/40" />
            </figure>

            {/* Desktop Image */}
            <figure className="hidden md:block relative h-[404px] w-full">
                <div className="absolute inset-0 flex justify-end">
                    <Image 
                        src={desktopSrc}
                        alt="Fitness Hero Desktop"
                        fill
                        className="object-contain object-right-bottom"
                        aria-hidden="true"
                    />
                </div>
            </figure>

            {/* Content Overlay */}
            <div className="absolute inset-0 z-10">
                <div className="h-full flex flex-col justify-end pb-8">
                    <h1 
                        id="hero-title"
                        className="text-5xl md:text-6xl font-bold text-white px-8 mb-2"
                    >
                        {bannerTitle}
                    </h1>
                    {!isLoggedIn && description && ( 
                        <p 
                            className="text-lg md:text-xl text-white px-8"
                            aria-describedby="hero-title"
                        >
                            {description}
                        </p>
                    )}
                </div>
            </div>
        </section>
    );
};

export default RoutineHero;
