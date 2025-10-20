const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const cors = require('cors');

const app = express();
app.use(cors());
const server = http.createServer(app);

const io = new Server(server, {
  cors: { origin: 'http://localhost:3000', methods: ['GET', 'POST'] },
});

app.use(express.json());

// store progress per client
const clientProgress = {}; // { [clientId]: progress }

app.post('/vm-create', (req, res) => {
  const { clientId } = req.body;
  if (!clientId) return res.status(400).json({ error: 'Missing clientId' });

  let progress = clientProgress[clientId] || 0;
  io.to(clientId).emit('process:start', { progress });

  const interval = setInterval(() => {
    progress += 10;
    clientProgress[clientId] = progress;

    io.to(clientId).emit('process:update', { progress });

    if (progress >= 100) {
      clearInterval(interval);
      io.to(clientId).emit('process:done', { message: 'Process completed!' });
    }
  }, 3000);

  res.json({ status: 'started', clientId });
});

// 🔹 Socket.io connection handler
io.on('connection', (socket) => {
  console.log('Client connected:', socket.id);

  socket.on('register', (clientId) => {
    socket.join(clientId);
    console.log(`Client registered: ${clientId}`);
  });

  socket.on('getProgress', (clientId) => {
    const progress = clientProgress[clientId] || 0;
    console.log(`Sending last progress for ${clientId}:`, progress);

    if (progress > 0 && progress < 100) {
      socket.emit('process:start', { progress });
    } else if (progress >= 100) {
      socket.emit('process:done', { message: 'Process completed!' });
    }
  });
});

server.listen(4000, () => console.log('✅ Backend running on http://localhost:4000'));
