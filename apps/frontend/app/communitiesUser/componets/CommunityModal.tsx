import { Community } from "@/app/utils/Connections/connectionsCommunity";
import React from "react";
import Image from 'next/image';

type Props = {
  selectedCommunity: Community;
  handleCloseModal: () => void;
  handleSubscribe: () => void;
};

const CommunityModal: React.FC<Props> = ({ selectedCommunity, handleCloseModal, handleSubscribe }) => {
  return (
    <div className="fixed inset-0 flex justify-center items-center bg-gray-900 bg-opacity-50 z-50">
      <div className="bg-gray-800 p-6 rounded-md w-1/2">
        <button
          className="absolute top-2 right-2 text-white text-xl"
          onClick={handleCloseModal}
        >
          ×
        </button>
        <h2 className="text-xl font-semibold mb-4">{selectedCommunity.name}</h2>
        <Image
          src={selectedCommunity.imageUrl}
          alt={selectedCommunity.name}
          width={500} 
          height={300} 
          className="w-32 h-32 rounded-full object-cover mb-4"
        />
        <p className="mb-2">
          <strong>Cost:</strong> {selectedCommunity.cost}
        </p>
        <p className="mb-2">
          <strong>Type:</strong> {selectedCommunity.type}
        </p>
        <p className="mb-4">
          <strong>Description:</strong> {selectedCommunity.description}
        </p>
        <button
          className="w-full py-2 bg-red-500 text-white rounded hover:bg-red-600"
          onClick={handleSubscribe}
        >
          Subscribe
        </button>
      </div>
    </div>
  );
};

export default CommunityModal;
