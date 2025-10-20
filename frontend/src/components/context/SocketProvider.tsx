'use client';

import React, { createContext, useContext, useEffect, useMemo } from 'react';
import { io, Socket } from 'socket.io-client';

const SocketContext = createContext<Socket | null>(null);

type SocketProviderProps = {
  children: React.ReactNode;
};

export const SocketProvider: React.FC<SocketProviderProps> = ({ children }) => {
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

    return () => {
      socket.disconnect();
    };
  }, [socket]);

  return <SocketContext.Provider value={socket}>{children}</SocketContext.Provider>;
};

export const useSocket = () => {
  const socket = useContext(SocketContext);
  if (!socket) {
    throw new Error('useSocket must be used inside <SocketProvider>');
  }
  return socket;
};
