import Image from "next/image";
import logo from "../Images/logo.png";

export default function LoginPage() {

    return (
        
        <div className="flex flex-col items-center justify-center h-screen bg-[#28292E]">
            <div className="flex flex-col items-center justify-center bg-white p-10 rounded-lg shadow-lg">
                <Image src={logo} alt="Logz" width={100} height={100} />
                <h1 className="text-3xl font-bold text-gray-800">Login</h1>
                <form className="flex flex-col w-64">
                    <input type="text" placeholder="Email" className="p-2 mt-2 border border-gray-300 rounded-lg" />
                    <input type="password" placeholder="Password" className="p-2 mt-2 border border-gray-300 rounded-lg" />
                    <button type="submit" className="bg-blue-500 text-white p-2 mt-2 rounded-lg">Login</button>
                </form>
            </div>
        </div>
    );
}
