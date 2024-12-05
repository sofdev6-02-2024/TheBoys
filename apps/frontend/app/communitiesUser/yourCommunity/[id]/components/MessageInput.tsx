import { FaPaperPlane, FaUpload, FaTrash } from "react-icons/fa";
import Image from 'next/image';

type MessageInputProps = {
  newMessage: string;
  setNewMessage: (value: string) => void;
  handleSendMessage: () => void;
  handleImageChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  imageUrl: string | null;
  setImageUrl: (value: string | null) => void;
};

export const MessageInput = ({
  newMessage,
  setNewMessage,
  handleSendMessage,
  handleImageChange,
  imageUrl,
  setImageUrl,
}: MessageInputProps) => {
  return (
    <div className="mt-6 max-w-4xl mx-auto p-4 bg-[#202024] rounded-lg shadow-md mb-10">
      <textarea
        className="w-full p-2 border rounded-md text-white bg-[#3A3B43]"
        placeholder="Escribe tu mensaje..."
        value={newMessage}
        onChange={(e) => setNewMessage(e.target.value)}
      />
      {imageUrl && (
        <div className="mt-4 relative">
          <Image
            src={imageUrl}
            alt="Imagen cargada"
            width={500}
            height={300}
            className="w-40 h-40 object-cover rounded-md"
          />
   
          <button
            className="absolute top-2 left-40 bg-red-500 text-white rounded-full p-2 hover:bg-red-600"
            onClick={() => setImageUrl(null)}
            aria-label="Eliminar imagen"
          >
            <FaTrash />
          </button>
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
          <FaUpload className="mr-2" /> Upload image or gif
        </label>
      </div>
    </div>
  );
};

