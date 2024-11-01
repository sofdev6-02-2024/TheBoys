"use client"; 

import { createContext, useContext, useState, ReactNode } from 'react';

interface AuthContextType {
  isLoggedIn: boolean;
  handleLogin: () => void;
  handleLogout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [isLoggedIn, setIsLoggedIn] = useState(true);

  const handleLogin = () => {
    setIsLoggedIn(true);
    document.cookie = "isLoggedIn=true; path=/";
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    document.cookie = "isLoggedIn=; max-age=0; path=/";
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, handleLogin ,handleLogout}}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
