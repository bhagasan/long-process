import express from 'express';
import http from 'http';
import { Server } from 'socket.io';
import cors from 'cors';

const app = express();
app.use(cors());
const server = http.createServer(app);
const io = new Server(server, {
  cors: { origin: 'http://localhost:3000', methods: ['GET', 'POST'] },
});

app.use(express.json());

// REST endpoint to start process
app.post('/start-process', (req, res) => {
  let progress = 0;
  io.emit('process:start', { progress });

  const interval = setInterval(() => {
    progress += 10;
    io.emit('process:update', { progress });

    if (progress >= 100) {
      clearInterval(interval);
      io.emit('process:done', { message: 'Process completed!' });
    }
  }, 500);

  res.json({ status: 'started' });
});

server.listen(4000, () => console.log('✅ Backend running on http://localhost:4000'));
