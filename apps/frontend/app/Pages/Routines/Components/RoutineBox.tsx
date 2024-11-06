"use client";

import Image, { StaticImageData } from "next/image";

interface RoutineBoxProps {
    src: StaticImageData;
    boxInfo: string;
    buttonText: string;
}

export const RoutineBox = ({src, boxInfo, buttonText}: RoutineBoxProps) => {
    return (
        <article 
            className="relative h-80 rounded-lg overflow-hidden group" 
            aria-labelledby="routine-title"
        >
            <figure className="w-full h-full">
                <Image 
                    src={src}
                    alt="Routine Box"
                    fill
                    className="object-cover"
                    aria-hidden="true"
                />
                <figcaption className="absolute inset-0 p-6 flex flex-col justify-between">
                    <h2 
                        id="routine-title" 
                        className="text-2xl font-bold text-white"
                    >
                        {boxInfo}
                    </h2>
                    <nav aria-label="Routine Action">
                        <button 
                            className="bg-red-500 text-white px-6 py-2 rounded-lg hover:bg-red-600 transition-colors absolute bottom-4 left-1/2 transform -translate-x-1/2"
                            type="button"
                        >
                            {buttonText}
                        </button>
                    </nav>
                </figcaption>
            </figure>
        </article>
    );
};

export default RoutineBox;
