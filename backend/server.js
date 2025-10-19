import express from 'express';
import http from 'http';
import { Server } from 'socket.io';
import cors from 'cors';

const app = express();
app.use(cors());
const server = http.createServer(app);
const io = new Server(server, { cors: { origin: '*' } });

app.post('/start-process', (req, res) => {
  io.emit('process:start');
  // simulate long process
  let progress = 0;
  const interval = setInterval(() => {
    progress += 10;
    io.emit('process:update', progress);
    if (progress >= 100) {
      clearInterval(interval);
      io.emit('process:done');
    }
  }, 500);

  res.send({ status: 'started' });
});

server.listen(4000, () => console.log('Backend running on 4000'));
