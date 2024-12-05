import { FaPaperPlane } from "react-icons/fa";

type MessageInputProps = {
  newMessage: string;
  setNewMessage: (value: string) => void;
  handleSendMessage: () => void;
  handleImageChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  imageUrl: string | null;
};

export const MessageInput = ({
  newMessage,
  setNewMessage,
  handleSendMessage,
  handleImageChange,
  imageUrl,
}: MessageInputProps) => {
  return (
    <div className="mt-6 max-w-4xl mx-auto p-4 bg-gray-200 rounded-lg shadow-md">
      <textarea
        className="w-full p-2 border rounded-md text-black"
        placeholder="Escribe tu mensaje..."
        value={newMessage}
        onChange={(e) => setNewMessage(e.target.value)}
      />
      {imageUrl && (
        <div className="mt-2">
          <img
            src={imageUrl}
            alt="Imagen cargada"
            className="w-40 h-40 object-cover rounded-md"
          />
        </div>
      )}
      <div className="flex mt-3 items-center">
        <button
          className="px-4 py-2 bg-blue-500 text-white rounded-md flex items-center mr-2"
          onClick={handleSendMessage}
        >
          <FaPaperPlane className="mr-2" /> Send message
        </button>
        <input
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          className="hidden"
          id="image-upload"
        />
        <label
          htmlFor="image-upload"
          className="cursor-pointer px-4 py-2 bg-gray-500 text-white rounded-md flex items-center"
        >
          Upload image
        </label>
      </div>
    </div>
  );
};
