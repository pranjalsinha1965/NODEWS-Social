const socketio = require('socket.io');

module.exports.chatSockets = function (socketServer) {
  // Initialize socket.io with proper CORS settings
  const io = socketio(socketServer, {
    cors: {
      origin: "*", // Allow connections from any origin for development purposes
    },
  });

  io.on('connection', (socket) => {
    console.log('New connection received:', socket.id);

    // Handle disconnection
    socket.on('disconnect', () => {
      console.log('Socket disconnected:', socket.id);
    });

    // Handle joining a chat room
    socket.on('join_room', (data) => {
      console.log('Joining request received:', data);
      socket.join(data.chatroom);
      io.in(data.chatroom).emit('user_joined', data);
    });

    // Handle sending messages
    socket.on('send_message', (data) => {
      io.in(data.chatroom).emit('receive_message', data);
    });
  });
};
