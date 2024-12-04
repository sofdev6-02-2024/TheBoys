"use client";

import React, { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { Community, fetchCommunities } from "../utils/Connections/connectionsCommunity";
import { useKeycloakProfile } from "@/app/Profile/hooks/useUserProfile";
import usePaymentConfirmation from "./usePaymentConfirmation";
import { updateCommunity, generatePayment } from "../utils/Connections/communityService";
import CommunityCard from "./componets/CommunityCard";
import CommunityList from "./componets/CommunityList";
import CommunityModal from "./componets/CommunityModal";
import LoadingMessage from "./componets/LoadingMessage";


function CommunitiesUser() {
  const { getPaymentStatus, resetPaymentConfirmation } = usePaymentConfirmation();
  const [communities, setCommunities] = useState<Community[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [selectedCommunity, setSelectedCommunity] = useState<Community | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const router = useRouter();
  const { user } = useKeycloakProfile();
  const userId = user?.id;
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadCommunities = async () => {
      try {
        setIsLoading(true);
        const data = await fetchCommunities();
        setCommunities(data);
      } catch (err) {
        setError((err as Error).message);
      } finally {
        setIsLoading(false); 
      }
    };

    loadCommunities();
  }, []);

  useEffect(() => {
    if (getPaymentStatus()) {
      const communityFromStorage = localStorage.getItem('selectedCommunity');
      const community = communityFromStorage ? JSON.parse(communityFromStorage) : null;
  
      console.log(getPaymentStatus());
      console.log(communityFromStorage);
      console.log(community);
  
      if (community && userId) {
        const handleUpdateCommunity = async () => {
          try {
            await updateCommunity(community.id, userId);
            resetPaymentConfirmation();
            localStorage.removeItem('selectedCommunity');
            console.log("Comunidad actualizada correctamente.");
          } catch (err) {
            // Maneja el error si algo sale mal
            setError((err as Error).message);
          }
        };
  
        handleUpdateCommunity();
      }
    }
  }, [getPaymentStatus(), userId]);
  
  
  const handleGetInfo = (community: Community) => {
    setSelectedCommunity(community);
    setIsModalOpen(true);
  };

  const handleSubscribe = async () => {
    if (!selectedCommunity) return;
  
    // Guarda la comunidad seleccionada en localStorage antes de redirigir
    localStorage.setItem('selectedCommunity', JSON.stringify(selectedCommunity));
  
    const requestBody = {
      amount: selectedCommunity.cost,
      currency: "usd",
      name: selectedCommunity.name,
      description: selectedCommunity.description,
      image_url: selectedCommunity.imageUrl,
    };
  
    try {
      const paymentUrl = await generatePayment(requestBody);
      router.push(`http://localhost:3000/Payment/${paymentUrl}`);
      console.log("Suscrito exitosamente, redirigiendo al pago...");
    } catch (err) {
      setError((err as Error).message);
    }
  
    setIsModalOpen(false);
  };
  

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  type Props = {
    message: string;
  };
  
  const ErrorMessage: React.FC<Props> = ({ message }) => (
    <p className="text-red-500">{message}</p>
  );

  return (
    <main className="flex flex-col items-center text-white">
      <h1 className="text-2xl font-bold mb-4">Communities</h1>

      {error ? (
        <ErrorMessage message={error} />
      ) : isLoading ? (  // Condición para mostrar el mensaje de carga
        <LoadingMessage />
      ) : (
        <>
          <CommunityList
            communities={communities}
            userId={userId!}
            handleGetInfo={handleGetInfo}
          
          />

          <section className="w-full max-w-6xl">
            <h2 className="text-xl font-bold mb-4">Other Communities</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {communities
                .filter((community) => !community.users.includes(userId))
                .map((community) => (
                  <CommunityCard
                    key={community.id}
                    community={community}
                    onClick={() => handleGetInfo(community)}
                  />
                ))}
            </div>
          </section>
        </>
      )}

      {isModalOpen && selectedCommunity && (
        <CommunityModal
          selectedCommunity={selectedCommunity}
          handleCloseModal={handleCloseModal}
          handleSubscribe={handleSubscribe}
        />
      )}
    </main>
  );
}


export default CommunitiesUser;
