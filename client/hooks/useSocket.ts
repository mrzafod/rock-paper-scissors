import { useEffect, useState } from 'react';
import { io, Socket } from 'socket.io-client';

export const useSocket = () => {
  const [socket, setSocket] = useState<Socket | null>(null);

  useEffect(() => {
    const s = io('http://localhost:3000');
    setSocket(s);
    s.on('connect', () => console.log('Connected to socket.io:', s.id));

    return () => void s.disconnect();
  }, []);

  return socket;
};
