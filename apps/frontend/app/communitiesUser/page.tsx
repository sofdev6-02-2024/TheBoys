"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Community, fetchCommunities } from "../utils/Connections/connectionsCommunity";
import { useKeycloakProfile } from "@/app/Profile/hooks/useUserProfile";  // Importar el hook de perfil del usuario
import usePaymentConfirmation from "./usePaymentConfirmation";


const API_URL = "http://localhost:4444/communities"; // URL base de la API

function CommunitiesUser() {
  const { paymentConfirmed, confirmPayment } = usePaymentConfirmation();  // Usar el hook
  const [communities, setCommunities] = useState<Community[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [selectedCommunity, setSelectedCommunity] = useState<Community | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const router = useRouter();
  const { user } = useKeycloakProfile();  // Obtener el perfil del usuario
  const userId = user?.id;  // Obtener el ID del usuario

  useEffect(() => {
    const loadCommunities = async () => {
      try {
        const data = await fetchCommunities();
        setCommunities(data);
      } catch (err) {
        setError((err as Error).message);
      }
    };

    loadCommunities();
  }, []);

  useEffect(() => {
    // Este useEffect se activa cuando el pago ha sido confirmado
    if (paymentConfirmed && selectedCommunity && userId) {
      const communityData = {
        users: [userId],  // El ID del usuario a agregar
      };

      const updateCommunity = async () => {
        try {
          const response = await fetch(`${API_URL}/${selectedCommunity.id}/users`, {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(communityData),
          });

          if (response.ok) {
            console.log("El usuario fue agregado exitosamente a la comunidad.");
          } else {
            console.error("Error al agregar el usuario a la comunidad.");
            setError("Error al agregar el usuario a la comunidad.");
          }
        } catch (error) {
          console.error("Error al realizar la solicitud:", error);
          setError("Hubo un error al actualizar la comunidad.");
        }
      };

      updateCommunity();
    }
  }, [paymentConfirmed, selectedCommunity, userId]);  // Observa cuando el pago se confirme

  const handleGetInfo = (community: Community) => {
    setSelectedCommunity(community);
    setIsModalOpen(true);
  };

  const handleSubscribe = async () => {
    if (!selectedCommunity) return;

    const requestBody = {
      amount: selectedCommunity.cost,
      currency: "usd",
      name: selectedCommunity.name,
      description: selectedCommunity.description,
      image_url: selectedCommunity.imageUrl,
    };

    try {
      const response = await fetch("http://localhost:4444/payments/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestBody),
      });

      const textResponse = await response.text(); 

      console.log("Respuesta del servidor:", textResponse); 

      if (response.ok) {
        router.push(`http://localhost:3000/Payment/${textResponse}`);
        console.log("Suscrito exitosamente, redirigiendo al pago...");
      } else {
        console.error("Error al generar el pago:", textResponse);
        setError("Error al generar el pago.");
      }
    } catch (error) {
      console.error("Error al realizar la solicitud:", error);
      setError("Hubo un error al procesar la solicitud.");
    }

    setIsModalOpen(false); 
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <main className="flex flex-col items-center text-white">
      <h1 className="text-2xl font-bold mb-4">Communities</h1>
      
      {error ? (
        <p className="text-red-500">{error}</p>
      ) : communities.length === 0 ? (
        <p>Loading communities...</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 w-full max-w-6xl">
          {communities.map((community) => (
            <div 
              key={community.id} 
              className="bg-gray-800 p-4 rounded shadow-md flex flex-col items-center">
              
              <div className="flex items-center mb-4">
                <img 
                  src={community.imageUrl} 
                  alt={community.name} 
                  className="w-16 h-16 rounded-full object-cover mr-4" 
                />
                <h2 className="text-lg font-semibold">{community.name}</h2>
              </div>

              <button 
                className="px-16 py-2 bg-red-500 text-white rounded hover:bg-red-600"
                onClick={() => handleGetInfo(community)}
              >
                Get Info
              </button>
            </div>
          ))}
        </div>
      )}

      {isModalOpen && selectedCommunity && (
        <div className="fixed inset-0 flex justify-center items-center bg-gray-900 bg-opacity-50 z-50">
          <div className="bg-gray-800 p-6 rounded-md w-1/2">
            <button 
              className="absolute top-2 right-2 text-white text-xl" 
              onClick={handleCloseModal}
            >
              ×
            </button>
            <h2 className="text-xl font-semibold mb-4">{selectedCommunity.name}</h2>
            <img 
              src={selectedCommunity.imageUrl} 
              alt={selectedCommunity.name} 
              className="w-32 h-32 rounded-full object-cover mb-4" 
            />
            <p className="mb-2"><strong>Cost:</strong> {selectedCommunity.cost}</p>
            <p className="mb-2"><strong>Type:</strong> {selectedCommunity.type}</p>
            <p className="mb-4"><strong>Description:</strong> {selectedCommunity.description}</p>
            <button 
              className="w-full py-2 bg-red-500 text-white rounded hover:bg-red-600"
              onClick={handleSubscribe}
            >
              Subscribe
            </button>
          </div>
        </div>
      )}
    </main>
  );
}

export default CommunitiesUser;