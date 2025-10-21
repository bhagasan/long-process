'use client';
import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { io, Socket } from 'socket.io-client';

type SocketContextValue = {
  socket: Socket;
  progress: number;
  status: string;
  dataQueue: any;
  setStatus: React.Dispatch<React.SetStateAction<string>>;
  setProgress: React.Dispatch<React.SetStateAction<number>>;
  setDataQueue: React.Dispatch<React.SetStateAction<any>>;
};

const SocketContext = createContext<SocketContextValue | null>(null);

export const SocketProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [progress, setProgress] = useState<number>(0);
  const [dataQueue, setDataQueue] = useState<any>({});
  const [status, setStatus] = useState('idle');
  const clientId = 'admin@admin.com';

  // generate or reuse a client ID
  // const clientId = useMemo(() => {
  //   if (typeof window !== 'undefined') {
  //     let id = localStorage.getItem('clientId');
  //     if (!id) {
  //       // id = crypto.randomUUID();
  //       id = email;
  //       localStorage.setItem('clientId', id);
  //     }
  //     return id;
  //   }
  //   return null;
  // }, []);

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

    // socket.emit('register', clientId);

    socket.on('connect', () => console.log('✅ Connected'));
    socket.on('disconnect', () => console.log('❌ Disconnected'));

    socket.on('process:start', (data) => {
      const { progress, actionType, actionId, itemLabel } = data;
      console.log('start', { actionId, actionType, progress, itemLabel });
      setStatus('running');
      setDataQueue(data);
      setProgress(data?.progress ?? 0);
    });

    socket.on('process:update', (data) => {
      const { progress, actionType, actionId, itemLabel } = data;
      console.log('update', { actionId, actionType, progress, itemLabel });
      setDataQueue(data);
      setProgress(data.progress);
    });

    socket.on('process:done', (data) => {
      const { actionType, actionId, message, itemLabel } = data;
      console.log('done', { actionId, actionType, itemLabel, message });
      setStatus('done');
      setDataQueue(data);
      setProgress(100);
    });

    // check on going progress (if any)
    socket.emit('get:process', { clientId });
    socket.on('process:list', (data) => {
      setDataQueue(data);
      console.log(data);
    });

    return () => {
      socket.disconnect();
      socket.off('process:start');
      socket.off('process:update');
      socket.off('process:done');
      socket.off('process:list');
    };
  }, [socket]);

  return (
    <SocketContext.Provider value={{ socket, progress, status, setProgress, setStatus, dataQueue, setDataQueue }}>
      {children}
    </SocketContext.Provider>
  );
};

export const useSocket = () => {
  const context = useContext(SocketContext);
  if (!context) throw new Error('useSocket must be used inside <SocketProvider>');
  return context;
};
