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
let userSockets = {};

/*
  userSocket = {
    [clientId]: {
      [actionId]: {
        actionType: ...,
        progress: ...
      }
    }
  }

*/

app.use(express.json());

app.post('/vm-create', (req, res) => {
  const { clientId, actionType, actionId, itemLabel } = req.body;
  if (!clientId) return res.status(400).json({ error: 'Missing clientId' });

  // let progress = clientProgress[actionId] || 0;
  let progress = 0;
  io.to(clientId).emit('process:start', { progress, actionType, actionId, itemLabel });

  const interval = setInterval(() => {
    progress += 10;
    userSockets = {
      ...userSockets,
      [clientId]: {
        ...userSockets[clientId],
        [actionId]: {
          ...userSockets[clientId]?.[actionId],
          progress,
          actionType,
          itemLabel,
        },
      },
    };

    io.to(clientId).emit('process:update', { progress, actionType, actionId, itemLabel });

    if (progress >= 100) {
      clearInterval(interval);
      io.to(clientId).emit('process:done', {
        progress,
        actionType,
        actionId,
        itemLabel,
        message: 'Process completed!',
      });
    }
  }, 3000);

  res.json({ status: 'started', clientId });
});

// 🔹 Socket.io connection handler
io.on('connection', (socket) => {
  const email = socket.handshake.query.email;
  socket.join(email);
  if (email) {
    userSockets[email] = {};
    console.log(`✅ Connected: ${email} (${socket.id})`);
  }

  socket.on('register', (clientId) => {
    socket.join(clientId);
    console.log(`Client registered: ${clientId}`);
  });

  socket.on('getProgress', (clientId, actionId) => {
    const progress = userSockets[clientId][actionId]?.progress || 0;
    console.log(`Sending last progress for ${clientId}:`, progress);

    if (progress > 0 && progress < 100) {
      socket.emit('process:start', { progress, actionId });
    } else if (progress >= 100) {
      socket.emit('process:done', { actionId, message: 'Process completed!' });
    }
  });
});

server.listen(4000, () => console.log('✅ Backend running on http://localhost:4000'));
