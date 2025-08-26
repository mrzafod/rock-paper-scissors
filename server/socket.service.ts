// /imports/socket.ts
import { WebApp } from 'meteor/webapp';
import { Server } from 'socket.io';

let io: Server;

export function createSocketService() {
  io = new Server(WebApp.httpServer, {
    cors: {
      origin: '*',
    },
  });

  io.on('connection', (socket) => {
    console.log('[⚡] Client connected:', socket.id);
    socket.on('disconnect', () => {
      console.log('[x] Client disconnected:', socket.id);
    });
  });

  return io;
}

export function getSocketService() {
  return io;
}
