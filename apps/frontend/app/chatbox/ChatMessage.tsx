import React from "react";

type ChatMessageProps = {
  message: {
    text: string;
    isUser: boolean;
  };
};

const ChatMessage: React.FC<ChatMessageProps> = ({ message }) => {
  return (
    <div
      className={`flex ${message.isUser ? "justify-end" : "justify-start"} items-start`}
    >
      <div
        className={`max-w-xs p-3 rounded-lg ${
          message.isUser ? "bg-blue-600 text-white" : "bg-gray-700 text-gray-200"
        }`}
      >
        {message.text}
      </div>
    </div>
  );
};

export default ChatMessage;
