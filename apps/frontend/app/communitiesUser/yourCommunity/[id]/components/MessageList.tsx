import { CommunityMessageBubble } from "./CommunityMessageBubble";

type Message = {
  userId: string | undefined;
  id: string;
  userName: string;
  message: string;
  createdAt: string;
};

type MessageListProps = {
  messages: Message[];
  currentUserId: string | undefined;
};

export const MessageList = ({ messages, currentUserId }: MessageListProps) => {
  if (messages.length === 0) {
    return <p className="text-center text-gray-500">No messages yet.</p>;
  }


  const sortedMessages = [...messages].sort(
    (a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
  );

  return (
    <div className="p-6 space-y-6 max-w-4xl mx-auto">
      {sortedMessages.map((msg) => {
        const imageUrlRegex = /https:\/\/res\.cloudinary\.com\/.*\.(jpg|jpeg|png|gif|webp)$/;
        const match = msg.message.match(imageUrlRegex);
        const imageUrl = match ? match[0] : null;
        const textMessage = imageUrl
          ? msg.message.replace(imageUrl, "").trim()
          : msg.message;

        return (
          <CommunityMessageBubble
            key={msg.id}
            message={textMessage}
            imageUrl={imageUrl}
            userName={msg.userName}
            isOwnMessage={msg.userId === currentUserId}
          />
        );
      })}
    </div>
  );
};
