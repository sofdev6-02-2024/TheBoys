"use client"; 

import Header from "../Header/NavBarDisplay";
import { AuthProvider, useAuth } from "../AuthContextType"; 

export default function Home() {
  return (
    <AuthProvider>
      <MainContent />
    </AuthProvider>
  );
}

function MainContent() {
  const { isLoggedIn, handleLogin, handleLogout } = useAuth(); 

  return (
    <div className="min-h-screen bg-[#28292E] flex flex-col items-center">
      <div className="max-w-[1440px] w-full flex flex-col">
        {isLoggedIn && <Header />
          
        } 
        <button onClick={handleLogout}>Cerrar Sesión</button>
        <main className="flex-grow">
          {!isLoggedIn && <button onClick={handleLogin}>Iniciar Sesión</button>}
        </main>
      </div>
    </div>
  );
}
