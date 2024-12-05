import React from "react";
import { useRouter } from "next/navigation"; // Importa useRouter
import { Community } from "@/app/utils/Connections/connectionsCommunity";
import CommunityCard from "./CommunityCard";

type Props = {
  communities: Community[];
  userId: string;
  handleGetInfo: (community: Community) => void;
};

const CommunityList: React.FC<Props> = ({ communities, userId, handleGetInfo }) => {
  const router = useRouter(); // Usa el hook useRouter

  const handleEnterCommunity = (communityId: string) => {
    // Redirige al usuario a la ruta con el ID de la comunidad seleccionada
    router.push(`/communitiesUser/yourCommunity/${communityId}`);
  };

  return (
    <section className="w-full max-w-6xl mb-8">
      <h2 className="text-xl font-bold mb-4">Your Communities</h2>
      {communities.some((community) => community.users.includes(userId)) ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {communities
            .filter((community) => community.users.includes(userId))
            .map((community) => (
              <CommunityCard
                key={community.id}
                community={community}
                buttonText="Enter"
                buttonStyle="bg-blue-500 hover:bg-blue-600"
                onClick={() => handleEnterCommunity(community.id)} // Llama a handleEnterCommunity con el ID de la comunidad
              />
            ))}
        </div>
      ) : (
        <p className="text-center text-gray-400">No tienes comunidades todavía.</p>
      )}
    </section>
  );
};

export default CommunityList;
