
interface NotificationProps {
    message: string;
    type: "success" | "error";
  }
  
  const Notification: React.FC<NotificationProps> = ({ message, type }) => (
    <div
      className={`fixed bottom-16 right-1 transform -translate-x-1/2 py-2 px-4 rounded shadow-lg z-50 ${
        type === "success" ? "bg-green-600" : "bg-red-600"
      } text-white`}
    >
      {message}
    </div>
  );
  
  export default Notification;
  