import Image from 'next/image';

type CommunityMessageBubbleProps = {
    message: string;
    imageUrl: string | null;
    userName: string;
    isOwnMessage: boolean;
  };
  
  export const CommunityMessageBubble = ({
    message,
    imageUrl,
    userName,
    isOwnMessage,
  }: CommunityMessageBubbleProps) => {
    return (
      <div className={`flex ${isOwnMessage ? "justify-end" : "justify-start"}`}>
        <div className="relative max-w-xs md:max-w-lg lg:max-w-2xl">
          
          <div
            className={`relative p-4 rounded-xl shadow-md ${
              isOwnMessage ? "bg-[#B9B945] text-black" : "bg-[#D9D9D9] text-black"
            }`}
          >
            <h3 className="font-semibold text-sm lg:text-base">{userName}</h3>
            
            {message && <p className="mt-1 text-sm lg:text-base">{message}</p>}
         
            {imageUrl && (
              <Image
                src={imageUrl}
                alt="Imagen del mensaje"
                width={500} 
                height={300}
                className="mt-2 rounded-md w-90 h-80"
              />
            )}
          </div>
   
          <div
            className={`absolute top-1/2 transform -translate-y-1/2 w-6 h-6 ${
              isOwnMessage ? "right-[-10px] bg-[#B9B945]" : "left-[-10px] bg-[#D9D9D9]"
            }`}
            style={{
              clipPath: "polygon(50% 0%, 0% 100%, 100% 100%)",
            }}
          ></div>
        </div>
      </div>
    );
  };
  