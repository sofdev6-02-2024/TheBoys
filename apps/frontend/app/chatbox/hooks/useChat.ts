import { useState } from "react";
import axios from "axios";

type ChatMessage = {
  text: string;
  isUser: boolean;
};

const useChat = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const sendMessage = async (message: string) => {
    try {
      setIsLoading(true);
      const response = await axios.post("/api/ai-service/chat", { message });
      setMessages((prevMessages) => [
        ...prevMessages,
        { text: message, isUser: true },
        { text: response.data.response, isUser: false },
      ]);
      setIsLoading(false);
      return response.data.response;
    } catch (error) {
      console.error("Error sending message:", error);
      setIsLoading(false);
      throw error;
    }
  };

  return { messages, sendMessage, isLoading };
};

export default useChat;
