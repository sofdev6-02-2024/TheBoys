"use client";

import React, { useState, useEffect } from "react";
import { useKeycloakProfile } from "@/app/Profile/hooks/useUserProfile"; 
import { uploadImage } from "@/app/utils/cloudinary"; 
import { MessageHistoryService } from "@/app/utils/Connections/messageHistoryService";
import { fetchCommunities } from "@/app/utils/Connections/connectionsCommunity"; 
import { MessageInput } from "./components/MessageInput";
import { MessageList } from "./components/MessageList";
import { useFetchCommunityMessages } from "../../hooks/useFetchCommunityMessages";

const CommunityMessages = () => {
  const [newMessage, setNewMessage] = useState("");
  const [imageUrl, setImageUrl] = useState<string | null>(null); 
  const [communityName, setCommunityName] = useState<string>(""); 
  const { user } = useKeycloakProfile(); 
  const { messages, setMessages, loading } = useFetchCommunityMessages(); 

  useEffect(() => {
    const fetchCommunityName = async () => {
      const communityId = window.location.pathname.split("/").pop(); 
      if (!communityId) return;

      try {
        const communities = await fetchCommunities();
        const currentCommunity = communities.find(
          (community) => community.id === communityId
        );
      
        if (currentCommunity) {
          setCommunityName(currentCommunity.name); 
        } else {
          setCommunityName("Community not found");
        }
      
      } catch (error) {
        console.error("Error fetching community name:", error);
        setCommunityName("Error loading community");
      }
    };

    fetchCommunityName();
  }, []);

  const handleSendMessage = async () => {
    if (!newMessage && !imageUrl) return; 

    const communityId = window.location.pathname.split("/").pop();
    if (!communityId || !user) return; 

    try {

      const communities = await fetchCommunities();
      const currentCommunity = communities.find(
        (community) => community.id === communityId
      );
  
      if (!currentCommunity) {
        console.error("Community not found");
        return;
      }
  
      const isTrainer = currentCommunity.trainerId === user.id; 
  
      const finalMessage = newMessage + (imageUrl ? ` ${imageUrl}` : "");

      await MessageHistoryService.sendMessage({
        userName: isTrainer ? `trainer: ${user.firstName}` : user.firstName,
        userId: user.id,
        communityId,
        message: finalMessage,
      });

      setMessages([
        ...messages,
        {
          id: `${Date.now()}`, 
          userName: isTrainer ? `trainer: ${user.firstName}` : user.firstName,
          message: finalMessage,
          createdAt: new Date().toISOString(),
          userId: user.id,
        },
      ]);
      setNewMessage(""); 
      setImageUrl(null); 
    } catch (error) {
      console.error(error);
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      uploadImage(file).then((url) => {
        if (url) {
          setImageUrl(url); 
        }
      });
    }
  };

  if (loading) {
    return <p className="text-center text-gray-500">Loading messages...</p>;
  }

  const sortedMessages = [...messages].sort((a, b) => {
    return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
  });

  const Header = () => {
    return (
      <h1 className="text-xl lg:text-3xl font-bold text-center w-full">
        Community Messages {communityName && ` - ${communityName}`}
      </h1>
    );
  };

  return (
    <section className="px-10 lg:px-8 mx-4">
      <Header />
      <MessageList messages={sortedMessages} currentUserId={user?.id} />
      <MessageInput
        newMessage={newMessage}
        setNewMessage={setNewMessage}
        handleSendMessage={handleSendMessage}
        handleImageChange={handleImageChange}
        imageUrl={imageUrl}
        setImageUrl={setImageUrl}
      />
    </section>
  );
};

export default CommunityMessages;
