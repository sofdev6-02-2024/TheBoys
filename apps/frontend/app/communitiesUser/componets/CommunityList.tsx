import React, { useState, useEffect } from "react";
import { Community, fetchCommunities } from "@/app/utils/Connections/connectionsCommunity";
import CommunityCard from "./CommunityCard";
import { useRouter } from "next/navigation"; 

type Props = {
  userId: string;
  handleGetInfo: (community: Community) => void;
};

const CommunityList: React.FC<Props> = ({ userId, handleGetInfo }) => {
  const [filteredCommunities, setFilteredCommunities] = useState<Community[]>([]);
  const [isLoading, setIsLoading] = useState(true); 
  const [error, setError] = useState<string | null>(null); 
  const router = useRouter(); 

  useEffect(() => {
    const loadCommunities = async () => {
      setIsLoading(true);
      try {

        const communities = await fetchCommunities();
        const userCommunities = communities.filter((community) =>
          community.users.includes(userId)
        );
        setFilteredCommunities(userCommunities);
      } catch (err) {
        setError("Error when loading communities.");
      } finally {
        setIsLoading(false);
      }
    };

    loadCommunities();
  }, [userId]);

  const handleEnterCommunity = (communityId: string) => {
    router.push(`/communitiesUser/yourCommunity/${communityId}`);
  };

  return (
    <section className="w-full max-w-6xl mb-8">
      <h2 className="text-xl font-bold mb-4">Your Communities</h2>
      {isLoading ? (
        <p className="text-center text-gray-400">Loading your communities...</p>
      ) : error ? (
        <p className="text-center text-red-500">{error}</p> 
      ) : filteredCommunities.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredCommunities.map((community) => (
            <CommunityCard
              key={community.id}
              community={community}
              buttonText="Enter"
              buttonStyle="bg-[#7E7E2D] hover:bg-[#9D9D38]"
              onClick={() => handleEnterCommunity(community.id)}

            />
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-400">You have no communities yet.</p>
      )}
    </section>
  );
};

export default CommunityList;
