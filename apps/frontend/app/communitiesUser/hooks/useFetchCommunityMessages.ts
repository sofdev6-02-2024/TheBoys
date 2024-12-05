import { useEffect, useState } from "react";
import { MessageHistoryService } from "@/app/utils/Connections/messageHistoryService";

type Message = {
  userId: string | undefined;
  id: string;
  userName: string;
  message: string;
  createdAt: string;
};

export const useFetchCommunityMessages = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const id = window.location.pathname.split("/").pop(); 

    if (!id) return; 

    const fetchMessages = async () => {
      try {
        const fetchedMessages = await MessageHistoryService.fetchCommunityMessages(id);
        setMessages(fetchedMessages);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchMessages();
  }, []);

  return { messages, setMessages, loading };
};
