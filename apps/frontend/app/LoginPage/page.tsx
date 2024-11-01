"use client";

import Image from "next/image";
import logo from "../Images/logo.png";
import { useState } from "react";

export default function LoginPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch("/api/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ email, password }),
            });

            if (response.ok) {
                console.log("Inicio de sesión exitoso");
            } else {
                console.error("Error en el inicio de sesión");
            }
        } catch (error) {
            console.error("Error de conexión", error);
        }
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-[#28292E] px-4">
            <div className="flex flex-col items-center p-5 rounded-lg w-full max-w-xs md:max-w-md lg:max-w-lg">
                <div className="flex flex-col items-center mb-5">
                    <p className="text-2xl font-bold text-[#FEFFFF] text-[36px]">
                        BODY BOOST
                    </p>
                    <Image src={logo} alt="Logo" width={70} height={70} className="mt-3" />
                </div>
                <form className="flex flex-col w-full max-w-[295px] md:max-w-[470px]" onSubmit={handleSubmit}>
                    <label className="text-[#FEFFFF] mb-2 text-left text-[12px]">Email:</label>
                    <input 
                        type="text"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="p-2 border border-[#BDBDBD] rounded-lg bg-[#28292E] w-full h-[50px] text-white"
                    />
                    <label className="text-[#FEFFFF] mt-7 mb-2 text-left text-[12px]">Password:</label>
                    <input 
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="p-2 border border-[#BDBDBD] rounded-lg bg-[#28292E] w-full h-[50px] text-white"
                    />
                    <button type="submit" className="bg-[#BA474A] text-white text-[24px] p-2 mt-7 rounded-lg w-full h-[48px]">
                        Login
                    </button>
                </form>
            </div>
        </div>
    );
}
