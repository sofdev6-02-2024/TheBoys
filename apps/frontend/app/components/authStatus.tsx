"use client";

import RoutesNavigation from "@/routes";
import { Session } from "next-auth";
import { useSession, signIn, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

interface CustomSession extends Session {
  error?: string;
}

interface AuthStatusProps {
  onClose: () => void;
}

async function keycloakSessionLogOut() {
  try {
    await fetch(`/api/auth/logout`, { method: "GET" });
  } catch (err) {
    console.error(err);
  }
}

export default function AuthStatus({ onClose }: AuthStatusProps) {
  const { data: session, status } = useSession();
  const customSession = session as CustomSession;
  const router = useRouter();

  useEffect(() => {
    if (status !== "loading" && customSession?.error === "RefreshAccessTokenError") {
      signOut({ callbackUrl: "/" });
      onClose();
    }
  }, [status, customSession, onClose]);

  if (status === "loading") {
    return (
      <div className="absolute top-20 right-10 bg-white text-black flex flex-col items-start py-2 px-4 rounded-sm shadow-md z-50 w-auto">
        <span>Loading...</span>
      </div>
    );
  }

  return (
    <div
    className={`fixed sm:top-20 right-10 bg-[#1E1E24] text-black flex flex-col items-start py-2 px-4 rounded-sm shadow-md z-50 w-[150px] ${
      session ? "bottom-16 sm:bottom-[800px] sm:translate-y-0" : "bottom-16 sm:bottom-[850px] sm:translate-y-0"
    }`}
  >
  {session ? (
        <>
          <button
            className="w-full text-left px-4 py-2 bg-[#33333D] text-white hover:bg-[#44444F] rounded my-1"
            onClick={() => {
              router.push(RoutesNavigation.Profile);
              onClose();
            }}
          >
            Profile
          </button>
          <button
            className=" w-full text-left px-4 py-2 bg-[#33333D] text-white hover:bg-[#44444F] rounded my-1"
            onClick={() => {
              keycloakSessionLogOut().then(() => {
                signOut({ callbackUrl: "/" });
                onClose();
              });
            }}
          >
            Log Out
          </button>
        </>
      ) : (
        <button
          className="w-full text-left px-4 py-2 bg-[#33333D] text-white hover:bg-[#44444F] rounded my-1"
          onClick={() => {
            signIn("keycloak");
            onClose();
          }}
        >
          Log In
        </button>
      )}
    </div>
  );
}
