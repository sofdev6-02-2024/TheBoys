
"use client"; 

import Routines from "./Routines"


export default function Home() {

    return (
      <div className="min-h-screen bg-[#28292E] flex flex-col items-center">
        <div className="max-w-[1440px] w-full flex flex-col">

        <Routines/>
        </div>
      </div>
    );

}

