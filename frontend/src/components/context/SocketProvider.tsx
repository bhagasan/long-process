'use client';
import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { io, Socket } from 'socket.io-client';

type SocketContextValue = {
  socket: Socket;
  progress: number;
  setProgress: React.Dispatch<React.SetStateAction<number>>;
};

const SocketContext = createContext<SocketContextValue | null>(null);

export const SocketProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [progress, setProgress] = useState<number>(0);

  // generate or reuse a client ID
  const clientId = useMemo(() => {
    let id = localStorage.getItem('clientId');
    if (!id) {
      id = crypto.randomUUID();
      localStorage.setItem('clientId', id);
    }
    return id;
  }, []);

  const socket = useMemo(
    () =>
      io('http://localhost:4000', {
        transports: ['websocket'],
        autoConnect: false,
      }),
    [],
  );

  useEffect(() => {
    socket.connect();

    socket.emit('register', clientId); // tell server who we are

    socket.on('connect', () => console.log('✅ Connected'));
    socket.on('disconnect', () => console.log('❌ Disconnected'));

    socket.on('progress', (value: number) => setProgress(value));

    // ask server for the last known progress
    socket.emit('getProgress', clientId);

    return () => {
      socket.disconnect();
    };
  }, [socket, clientId]);

  return <SocketContext.Provider value={{ socket, progress, setProgress }}>{children}</SocketContext.Provider>;
};

export const useSocket = () => {
  const context = useContext(SocketContext);
  if (!context) throw new Error('useSocket must be used inside <SocketProvider>');
  return context;
};
