import React from "react";
import { useRouter } from "next/navigation"; 
import { Community } from "@/app/utils/Connections/connectionsCommunity";
import CommunityCard from "./CommunityCard";

type Props = {
  communities: Community[];
  userId: string;
  handleGetInfo: (community: Community) => void;
};

const CommunityList: React.FC<Props> = ({ communities, userId }) => {
  const router = useRouter(); 

  const handleEnterCommunity = (communityId: string) => {
    router.push(`/communitiesUser/yourCommunity/${communityId}`);
  };

  return (
    <section className="w-full max-w-6xl mb-8">
      <h2 className="text-xl font-bold mb-4">Your Communities</h2>
      {communities.some((community) =>
        // Verificar si el 'userId' está en la lista de 'community.users'
        community.users.includes(userId) 
      ) ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {communities
            .filter((community) =>
              // Filtrar solo las comunidades donde el 'userId' está presente en 'community.users'
              community.users.includes(userId)
            )
            .map((community) => (
              <CommunityCard
                key={community.id}
                community={community}
                buttonText="Enter"
                buttonStyle="bg-blue-500 hover:bg-blue-600"
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
