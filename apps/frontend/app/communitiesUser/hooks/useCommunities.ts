import { Community, fetchCommunities, updateCommunity } from "@/app/utils/Connections/connectionsCommunity";
import { useState, useEffect } from "react";
import usePaymentConfirmation from "./usePaymentConfirmation";

export function useCommunities(userId: string | undefined) {
  const { getPaymentStatus, resetPaymentConfirmation } = usePaymentConfirmation();
  const [communities, setCommunities] = useState<Community[]>([]);
  const [error, setError] = useState<string | null>(null);
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
      if (typeof window !== "undefined") {
        const communityFromStorage = localStorage.getItem("selectedCommunity");
        const community = communityFromStorage ? JSON.parse(communityFromStorage) : null;
    
        if (community && userId) {
          const handleUpdateCommunity = async () => {
            try {
              const updatedCommunity: Community = {
                ...community, 
                users: [...community.users, userId], 
              };
    
              await updateCommunity(community.id, updatedCommunity);
              resetPaymentConfirmation();
              localStorage.removeItem("selectedCommunity");
              console.log("Comunidad actualizada correctamente.");
            } catch (err) {
              setError((err as Error).message);
            }
          };
    
          handleUpdateCommunity();
        }
      }
    }
  }, [getPaymentStatus, userId, resetPaymentConfirmation]); 

  return { communities, error, isLoading, setError };
}
