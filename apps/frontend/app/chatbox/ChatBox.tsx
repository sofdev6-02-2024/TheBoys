'use client'

import React, { useState, useEffect } from "react";
import ChatMessage from "./ChatMessage";
import useChat from "./hooks/useChat";
import { FaRobot } from "react-icons/fa";

const Chatbox: React.FC = () => {
  const { sendMessage, isLoading } = useChat();
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [isChatOpen, setIsChatOpen] = useState(false); // Estado para controlar el chatbox

  const handleSend = async () => {
    if (input.trim() === "") return;
    await sendMessage(input);
    setInput("");
  };

  useEffect(() => {
    const fetchInitialMessages = async () => {
      try {
        const initialMessages = await sendMessage("/chat/initial");
        setMessages(initialMessages);
      } catch (error) {
        console.error("Error fetching initial messages:", error);
      }
    };
    if (isChatOpen) fetchInitialMessages(); // Solo cargar mensajes si el chat está abierto
  }, [sendMessage, isChatOpen]);

  return (
    <>
      {/* Botón circular para abrir el chatbox */}
      {!isChatOpen && (
        <button
          className="fixed bottom-5 right-5 bg-blue-600 text-white p-4 rounded-full shadow-lg hover:bg-blue-700 focus:outline-none"
          onClick={() => setIsChatOpen(true)}
        >
          <FaRobot size={24} />
        </button>
      )}

      {/* Chatbox */}
      {isChatOpen && (
        <div className="fixed bottom-5 right-5 w-80 bg-gray-800 text-white rounded-lg shadow-lg flex flex-col">
          {/* Header */}
          <div className="p-4 border-b border-gray-700 text-lg font-semibold flex justify-between items-center">
            <span>BodyBoost ChatBox</span>
            <button
              className="text-gray-400 hover:text-white focus:outline-none"
              onClick={() => setIsChatOpen(false)}
            >
              ✖
            </button>
          </div>

          {/* Mensajes */}
          <div className="flex-1 overflow-y-auto p-4 space-y-2">
            {messages.map((message, index) => (
              <ChatMessage key={index} message={message} />
            ))}
            {isLoading && <p className="text-sm text-gray-400">Loading...</p>}
          </div>

          {/* Input */}
          <div className="p-2 border-t border-gray-700 flex">
            <input
              type="text"
              className="flex-1 bg-gray-700 text-white p-2 rounded-lg focus:outline-none"
              placeholder="Chat..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSend()}
            />
            <button
              className="ml-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg"
              onClick={handleSend}
              disabled={isLoading}
            >
              Send
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default Chatbox;
