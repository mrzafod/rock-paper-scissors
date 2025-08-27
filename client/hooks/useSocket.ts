import { Meteor } from 'meteor/meteor';
import { useEffect, useState } from 'react';
import { io, Socket } from 'socket.io-client';

export const useSocket = () => {
  const [socket, setSocket] = useState<Socket | null>(null);

  useEffect(() => {
    const instance = io(Meteor.absoluteUrl());
    setSocket(instance);
    instance.on('connect', () =>
      console.log('Connected to server:', instance.id)
    );

    return () => void instance.disconnect();
  }, []);

  return socket;
};
