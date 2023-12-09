import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import jwt from 'jsonwebtoken';

const ChatRoom = () => {
  const router = useRouter();
  const { token } = router.query;

  const [sender, setSender] = useState(null);
  const [receiver, setReceiver] = useState(null);

  useEffect(() => {
    if (token) {
      // Decode the token to get sender and receiver information
      try {
        const decodedToken = jwt.verify(token, 'your-secret-key');
        const { sender, receiver } = decodedToken;
        setSender(sender);
        setReceiver(receiver);
      } catch (error: any) {
        // Handle token verification error
        console.error('Error decoding token:', error.message);
      }
    }
  }, [token]);

  if (!sender || !receiver) {
    // Handle loading state or invalid token
    return <p>Loading...</p>;
  }

  return (
    <div>
      <h1>Chat Room</h1>
      <p>Sender: {sender}</p>
      <p>Receiver: {receiver}</p>
    </div>
  );
};

export default ChatRoom;
