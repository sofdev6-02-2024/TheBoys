import { useState } from "react";
import { FaTrash, FaEdit } from "react-icons/fa";
import { Community } from "../../utils/Connections/connectionsCommunity";

type CommunityListProps = {
  communities: Community[];
  onEdit: (community: Community) => void;
  onDelete: (id: string) => Promise<void>;
  isLoading: boolean;
};

const CommunityList = ({ communities, onEdit, onDelete, isLoading }: CommunityListProps) => {
  const [isConfirmOpen, setIsConfirmOpen] = useState(false); 
  const [communityToDelete, setCommunityToDelete] = useState<string | null>(null);

  const handleDeleteClick = (id: string) => {
    setCommunityToDelete(id);
    setIsConfirmOpen(true); 
  };

  const handleConfirmDelete = async () => {
    if (communityToDelete) {
      await onDelete(communityToDelete); 
    }
    setIsConfirmOpen(false); 
    setCommunityToDelete(null);
  };

  const handleCancelDelete = () => {
    setIsConfirmOpen(false); 
    setCommunityToDelete(null);
  };

  return (
    <div className="w-full mt-6">
      {isLoading ? (
        <p className="text-center text-lg font-semibold">Loading communities...</p>
      ) : (
        <div className="space-y-4">
          {communities.length === 0 ? (
            <p className="text-center">No communities found</p>
          ) : (
            communities.map((community) => (
              <div
                key={community.id}
                className="flex items-center justify-between p-4 border-2 border-black rounded-lg"
              >
                <div className="flex items-center space-x-4">
                  <img
                    src={community.imageUrl}
                    alt={community.name}
                    className="w-20 h-20 rounded-full object-cover"
                  />
                  <p className="text-lg font-medium">{community.name}</p>
                </div>
                <div className="flex space-x-4">
                  <FaTrash
                    className="text-red-500 cursor-pointer w-10 h-10"
                    onClick={() => handleDeleteClick(community.id)}
                  />
                  <FaEdit
                    className="text-yellow-500 cursor-pointer w-10 h-10"
                    onClick={() => onEdit(community)}
                  />
                </div>
              </div>
            ))
          )}
        </div>
      )}

 
{isConfirmOpen && (
  <div className="fixed inset-0 flex items-center justify-center bg-[#28292E] bg-opacity-50">
    <div className="bg-[#28292E] p-6 rounded-lg shadow-lg text-center space-y-4 border-4 border-black">
      <p className="text-lg font-semibold text-white">Are you sure you want to delete this community?</p>
      <div className="flex justify-center space-x-4">
        <button
          className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-700"
          onClick={handleConfirmDelete}
        >
          Yes, Delete
        </button>
        <button
          className="px-4 py-2 bg-gray-300 text-black rounded-lg hover:bg-gray-400"
          onClick={handleCancelDelete}
        >
          Cancel
        </button>
      </div>
    </div>
  </div>
)}

    </div>
  );
};

export default CommunityList;
