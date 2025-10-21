'use client';
import React, { createContext, useContext, useEffect, useMemo } from 'react';
import { io, Socket } from 'socket.io-client';

type SocketContextValue = {
  clientId: string;
  socket: Socket;
};

const SocketContext = createContext<SocketContextValue | null>(null);

export const SocketProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const clientId = 'admin@admin.com';
  const socket = useMemo(
    () =>
      io('http://localhost:4000', {
        transports: ['websocket'],
        autoConnect: false,
        query: { clientId },
      }),
    [],
  );

  useEffect(() => {
    if (!socket.connected) socket.connect();

    socket.on('connect', () => console.log('✅ Connected'));
    socket.on('disconnect', () => console.log('❌ Disconnected'));

    return () => {
      socket.disconnect();
      socket.off('connect');
    };
  }, [socket]);

  return <SocketContext.Provider value={{ socket, clientId }}>{children}</SocketContext.Provider>;
};

export const useSocket = () => {
  const context = useContext(SocketContext);
  if (!context) throw new Error('useSocket must be used inside <SocketProvider>');
  return context;
};
