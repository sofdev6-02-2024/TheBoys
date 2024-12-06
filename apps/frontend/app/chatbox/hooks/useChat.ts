import { useState } from "react";

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
      console.log("Sending message:", message); 

      const response = await fetch("http://localhost:4444/api/ai-service/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message }),
      });

      console.log("Fetch response status:", response.status);
      const textResponse = await response.text();
      console.log("Fetch raw response:", textResponse);

      if (!response.ok) {
        throw new Error(`Error HTTP: ${response.status}`);
      }

      let finalResponse;

      if (response.status === 201) {
        finalResponse = textResponse;
      } else {
        finalResponse = await response.json(); 
      }

      setMessages((prevMessages) => [
        ...prevMessages,
        { text: message, isUser: true },
        { text: typeof finalResponse === "string" ? finalResponse : finalResponse.response, isUser: false },
      ]);

      setIsLoading(false);
      return finalResponse;
    } catch (error) {
      console.error("Error sending message:", error);
      setIsLoading(false);
      throw error;
    }
  };

  return { messages, sendMessage, isLoading };
};

export default useChat;
