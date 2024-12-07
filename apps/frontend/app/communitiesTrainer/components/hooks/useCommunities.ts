import { useState, useEffect } from "react";
import { useKeycloakProfile } from "@/app/Profile/hooks/useUserProfile";
import { uploadImage } from "@/app/utils/cloudinary";
import { toast } from "sonner";
import {CreateCommunity,fetchCommunities,Community,updateCommunity,createCommunity,deleteCommunity,} from "@/app/utils/Connections/connectionsCommunity";

export function useCommunities() {
  const { user } = useKeycloakProfile();
  const [userId, setUserId] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true); 
  const [formData, setFormData] = useState<CreateCommunity>({
    name: "",
    description: "",
    type: "",
    cost: 0,
    trainerId: "",
    imageUrl: "",
  });
  const [imageUrl, setImageUrl] = useState(
    "https://image.cdn2.seaart.me/2024-01-13/cmh2vode878c73d6137g/f962d4474adced8aa8e6d547f2634fef5ca0a115_high.webp"
  );
  const [communities, setCommunities] = useState<Community[]>([]);
  const [filteredCommunities, setFilteredCommunities] = useState<Community[]>([]);
  const [isEditing, setIsEditing] = useState(false);
  const [selectedCommunityId, setSelectedCommunityId] = useState<string | null>(null);


  useEffect(() => {
    if (user && user.id) {
      setUserId(user.id);
    }
  }, [user]);


  useEffect(() => {
    const fetchUserCommunities = async () => {
      try {
        setIsLoading(true); 
        const communitiesData = await fetchCommunities();
        setCommunities(communitiesData);
      } catch (error) {
        toast.error("Error fetching communities");
      } finally {
        setIsLoading(false); 
      }
    };

    if (userId) {
      fetchUserCommunities();
    }
  }, [userId]);

  useEffect(() => {
    if (userId && communities.length > 0) {
      const userCommunities = communities.filter(
        (community) => community.trainerId === userId
      );
      setFilteredCommunities(userCommunities);
    }
  }, [communities, userId]);

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      const url = await uploadImage(file);
      if (url) {
        setImageUrl(url);
        toast.success("Image uploaded successfully!");
      } else {
        toast.error("Image upload failed");
      }
    } catch (error) {
      toast.error("Error uploading image");
    } 
  };

  const handleConfirm = async () => {
    if (!formData.name || !formData.description || !formData.type) {
      toast.error("All fields must be filled!");
      return;
    }

    if (isNaN(Number(formData.cost)) || Number(formData.cost) < 0) {
      toast.error("Cost must be a positive number or zero.");
      return;
    }

    const communityData: CreateCommunity = {
      ...formData,
      cost: Number(formData.cost),
      trainerId: userId!,
      imageUrl,
    };

    try {
      setIsLoading(true);
      let response: Community;

      if (isEditing && selectedCommunityId) {
        response = await updateCommunity(selectedCommunityId, {
          ...communityData,
          id: selectedCommunityId,
          users: []
        });
        toast.success("Community updated successfully!");
      } else {
        response = await createCommunity(communityData);
        toast.success("Community created successfully!");
      }

      setCommunities(await fetchCommunities()); 
      setFilteredCommunities((prev) =>
        prev.map((community) => (community.id === response.id ? response : community))
      );
      setIsModalOpen(false);
      resetForm();
    } catch (error) {
      toast.error("Failed to process community");
    } finally {
      setIsLoading(false); 
    }
  };

  const handleEditCommunity = (community: Community) => {
    setFormData({
      name: community.name,
      description: community.description,
      type: community.type,
      cost: community.cost,
      trainerId: community.trainerId,
      imageUrl: community.imageUrl,
    });
    setImageUrl(community.imageUrl || imageUrl);
    setIsEditing(true);
    setSelectedCommunityId(community.id);
    setIsModalOpen(true);
  };


  const handleDeleteCommunity = async (communityId: string) => {
    try {
      setIsLoading(true); 
      await deleteCommunity(communityId);
      toast.success("Community deleted successfully!");
      setCommunities((prev) => prev.filter((community) => community.id !== communityId));
      setFilteredCommunities((prev) =>
        prev.filter((community) => community.id !== communityId)
      );
    } catch (error) {
      toast.error("Error deleting community");
    } finally {
      setIsLoading(false); 
    }
  };

  const resetForm = () => {
    setFormData({
      name: "",
      description: "",
      type: "",
      cost: 0,
      trainerId: "",
      imageUrl: "",
    });
    setImageUrl(
      "https://image.cdn2.seaart.me/2024-01-13/cmh2vode878c73d6137g/f962d4474adced8aa8e6d547f2634fef5ca0a115_high.webp"
    );
    setIsEditing(false);
    setSelectedCommunityId(null);
  };

  return {
    userId,
    isModalOpen,
    setIsModalOpen,
    isLoading,
    formData,
    setFormData,
    imageUrl,
    setImageUrl,
    communities,
    filteredCommunities,
    isEditing,
    selectedCommunityId,
    handleImageUpload,
    handleConfirm,
    handleEditCommunity,
    handleDeleteCommunity,
  };
}
