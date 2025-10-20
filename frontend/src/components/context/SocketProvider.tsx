'use client';

import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { io, Socket } from 'socket.io-client';

type SocketContextValue = {
  socket: Socket;
  progress: number;
  setProgress: React.Dispatch<React.SetStateAction<number>>;
};

const SocketContext = createContext<SocketContextValue | null>(null);

type SocketProviderProps = {
  children: React.ReactNode;
};

export const SocketProvider: React.FC<SocketProviderProps> = ({ children }) => {
  const [progress, setProgress] = useState<number>(0);

  const socket = useMemo(
    () =>
      io('http://localhost:4000', {
        transports: ['websocket'], // avoid polling fallback
      }),
    [],
  );

  useEffect(() => {
    socket.connect();

    socket.on('connect', () => {
      console.log('✅ Connected:', socket.id);
    });

    socket.on('disconnect', () => {
      console.log('❌ Disconnected');
    });

    // example: listen for progress updates from backend
    socket.on('progress', (value: number) => {
      setProgress(value);
    });

    return () => {
      socket.disconnect();
    };
  }, [socket]);

  return <SocketContext.Provider value={{ socket, progress, setProgress }}>{children}</SocketContext.Provider>;
};

export const useSocket = () => {
  const context = useContext(SocketContext);
  if (!context) {
    throw new Error('useSocket must be used inside <SocketProvider>');
  }
  return context;
};
