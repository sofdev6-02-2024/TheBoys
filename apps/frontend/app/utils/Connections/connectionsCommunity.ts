
const API_URL = "http://localhost:4444/communities";


  
  export interface CreateCommunity {
    name: string;
    description: string;
    type: string;
    cost: number;
    trainerId: string;
    imageUrl: string;
  }

  export interface Community extends CreateCommunity {
    id: string;
  }

  export const fetchCommunities = async (): Promise<Community[]> => {
    try {
      const response = await fetch(API_URL);
      if (response.ok) {
        return await response.json();
      } else {
        throw new Error("Failed to fetch communities");
      }
    } catch (error) {
      throw new Error("Error fetching communities");
    }
  };


export const createCommunity = async (communityData: CreateCommunity): Promise<Community> => {
  try {
    const response = await fetch(API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(communityData),
    });

    if (response.ok) {
      return await response.json();
    } else {
      throw new Error("Failed to create community");
    }
  } catch (error) {
    throw new Error("Error creating community");
  }
};

export const updateCommunity = async (
    communityId: string,
    communityData: Community
  ): Promise<Community> => {
    try {
      const response = await fetch(`${API_URL}/${communityId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(communityData),
      });
  
      if (response.ok) {
        return await response.json();
      } else {
        throw new Error("Failed to update community");
      }
    } catch (error) {
      throw new Error("Error updating community");
    }
  };

export const deleteCommunity = async (communityId: string): Promise<void> => {
  try {
    const response = await fetch(`${API_URL}/${communityId}`, {
      method: "DELETE",
    });

    if (!response.ok) {
      throw new Error("Failed to delete community");
    }
  } catch (error) {
    throw new Error("Error deleting community");
  }
};
