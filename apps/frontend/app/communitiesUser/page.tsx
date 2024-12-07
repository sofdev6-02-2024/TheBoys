"use client";

import React, { useState, useEffect } from "react";
import { useKeycloakProfile } from "@/app/Profile/hooks/useUserProfile";
import { generatePayment } from "../utils/Connections/communityService";
import CommunityCard from "./componets/CommunityCard";
import CommunityModal from "./componets/CommunityModal";
import { useCommunities } from "./hooks/useCommunities";
import { Community, fetchCommunities } from "../utils/Connections/connectionsCommunity";
import { useRouter } from "next/navigation";
import CommunityList from "./componets/CommunityList";

const CommunitiesUser = () => {
  const router = useRouter();
  const { user } = useKeycloakProfile();
  const userId = user?.id;

  const {error, isLoading, setError } = useCommunities(userId);
  const [filteredCommunities, setFilteredCommunities] = useState<Community[]>([]);
  const [selectedCommunity, setSelectedCommunity] = useState<Community | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isFiltering, setIsFiltering] = useState(false); 

  useEffect(() => {
    const loadFilteredCommunities = async () => {
      if (!userId) return;
  
      try {
        const updatedCommunities = await fetchCommunities(); 
        const filtered = updatedCommunities.filter((community) =>
          !community.users.includes(userId) 
        );
        setFilteredCommunities(filtered); 
      } catch (err) {
        setError("Error when loading communities.");
      } finally {
        setIsFiltering(false);
      }
    };
  
    setIsFiltering(true);
    const delay = setTimeout(() => {
      loadFilteredCommunities();
    }, 1000);
  
    return () => clearTimeout(delay);
  }, [userId, fetchCommunities]);
  

  const handleGetInfo = (community: Community) => {
    setSelectedCommunity(community);
    setIsModalOpen(true);
  };

  const handleSubscribe = async () => {
    if (!selectedCommunity) return;

    localStorage.setItem("selectedCommunity", JSON.stringify(selectedCommunity));

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

  const ErrorMessage: React.FC<{ message: string }> = ({ message }) => (
    <p className="text-red-500">{message}</p>
  );

  const LoadingMessage = () => (
    <p>Loading communities...</p>
  );

  const FilteringMessage = () => (
    <p>Loading communities...</p>
  );

  return (
    <main className="flex flex-col items-center text-white">
      <h1 className="text-2xl font-bold mb-4">Communities</h1>

      {error ? (
        <ErrorMessage message={error} />
      ) : isLoading ? (
        <LoadingMessage />
      ) : (
        <>
          <CommunityList
            userId={userId!}
            handleGetInfo={handleGetInfo}
          />

          <section className="w-full max-w-6xl">
            <h2 className="text-xl font-bold mb-4">Other Communities</h2>

            {isFiltering ? (
              <FilteringMessage /> 
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {filteredCommunities.map((community) => (
                  <CommunityCard
                    key={community.id}
                    community={community}
                    onClick={() => handleGetInfo(community)}
                  />
                ))}
              </div>
            )}
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
};

export default CommunitiesUser;
