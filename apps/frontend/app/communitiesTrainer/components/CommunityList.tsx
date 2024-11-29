import { FaTrash, FaEdit } from "react-icons/fa";
import { Community } from "../../utils/Connections/connectionsCommunity";

type CommunityListProps = {
  communities: Community[];
  onEdit: (community: Community) => void;
  onDelete: (id: string) => Promise<void>; 
  isLoading: boolean; 
};

const CommunityList = ({ communities, onEdit, onDelete, isLoading }: CommunityListProps) => {
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
                    onClick={() => onDelete(community.id)}
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
    </div>
  );
};

export default CommunityList;
