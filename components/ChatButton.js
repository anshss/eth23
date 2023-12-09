import { useRouter } from 'next/router';
import jwt from 'jsonwebtoken';

const ChatButton = ({ sender, receiver }) => {
  const router = useRouter();

  const createChatroom = () => {
    // Create a token by signing the sender and receiver information
    const token = jwt.sign({ sender, receiver }, 'your-secret-key');
    console.log('token', token)
    // Navigate to the chatroom using the generated token
    router.push(`/chats/${token}`);
  };

  return (
    <button
      onClick={createChatroom}
      className="h-[40px] inline-flex items-center px-[6%] py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
    >
      Chat
    </button>
  );
};

export default ChatButton;
