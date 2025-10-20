'use client';
import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { io, Socket } from 'socket.io-client';

type SocketContextValue = {
  socket: Socket;
  progress: number;
  status: string;
  setProgress: React.Dispatch<React.SetStateAction<number>>;
};

const SocketContext = createContext<SocketContextValue | null>(null);

export const SocketProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [progress, setProgress] = useState<number>(0);
  const [status, setStatus] = useState('idle');

  // generate or reuse a client ID
  const clientId = useMemo(() => {
    if (typeof window !== 'undefined') {
      let id = localStorage.getItem('clientId');
      if (!id) {
        id = crypto.randomUUID();
        localStorage.setItem('clientId', id);
      }
      return id;
    }
    return null;
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

    socket.emit('register', clientId);

    socket.on('connect', () => console.log('✅ Connected'));
    socket.on('disconnect', () => console.log('❌ Disconnected'));

    socket.on('process:start', (data) => {
      setStatus('running');
      setProgress(data?.progress ?? 0);
    });

    socket.on('process:update', (data) => {
      setProgress(data.progress);
    });

    socket.on('process:done', () => {
      setStatus('done');
      setProgress(100);
    });

    socket.emit('getProgress', clientId);

    return () => {
      socket.disconnect();
    };
  }, [socket, clientId]);

  // useEffect(() => {
  //   socket.on('process:start', () => setStatus('running'));
  //   socket.on('process:update', (data) => setProgress(data.progress));
  //   socket.on('process:done', () => setStatus('done'));

  //   return () => {
  //     socket.off('process:start');
  //     socket.off('process:update');
  //     socket.off('process:done');
  //   };
  // }, [setProgress, socket, status]);

  return <SocketContext.Provider value={{ socket, progress, status, setProgress }}>{children}</SocketContext.Provider>;
};

export const useSocket = () => {
  const context = useContext(SocketContext);
  if (!context) throw new Error('useSocket must be used inside <SocketProvider>');
  return context;
};
