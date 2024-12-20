import { Community } from "@/app/utils/Connections/connectionsCommunity";
import React from "react";
import Image from 'next/image';

type Props = {
  community: Community;
  onClick: () => void;
  buttonText?: string; 
  buttonStyle?: string; 
};

const CommunityCard: React.FC<Props> = ({ community, onClick, buttonText = "Get Info", buttonStyle = "bg-red-500 hover:bg-red-600" }) => {
    return (
        <div className="border-2 border-white p-4 rounded shadow-md flex flex-col items-center my-4">
          
          <h2  className="text-lg font-semibold">{community.users.length} members</h2> 
          <div className="flex items-center mb-4">
            <Image
              src={community.imageUrl}
              alt={community.name}
              width={500}
              height={300}
              className="w-16 h-16 rounded-full object-cover mr-4"
            />
            <h2 className="text-lg font-semibold">{community.name}</h2> 
          </div>
          <button
            className={`px-16 py-2 text-white rounded ${buttonStyle}`}
            onClick={onClick}
          >
            {buttonText}
          </button>
        </div>
      );
      
      
      
};

export default CommunityCard;
