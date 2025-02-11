
// module.exports.chatSockets = function (socketServer) {
  // Initialize socket.io with proper CORS settings
  // let io = require('socket.io')(socketServer);
  // io.sockets.on('connection', function(socket) {
  //   console.log('New connection received:', socket.id);
    /// Handle disconnection
    // socket.on('disconnect', function(){
    //   console.log('Socket disconnected: !');
    // });
    // Handle joining a chat room
    // socket.on('join_room', function(data){
    //   console.log('Joining request received:', data);
    //   socket.join(data.chatroom);
    //   io.in(data.chatroom).emit('user_joined', data);
    // });
    // Handle sending messages
    // socket.on('send_message', function(data){
    //   io.in(data.chatroom).emit('receive_message', data);
    // });
//   });
// };

const sqlite3 = require('sqlite3').verbose();
module.exports.chatSockets = function (socketServer) {
  let io = require('socket.io')(socketServer);
  io.sockets.on('connection', function (socket) {
    console.log('New connection received:', socket.id);
    socket.on('disconnect', function () {
      console.log('Socket disconnected!');
    });
    socket.on('join_room', function(data){
      console.log('joining request rec', data);
      socket.join(data.chatroom);
      io.in(data.chatroom).emit('user_joined', data);
    });

    //Change::detect send_message and broadcast to everyone in the room
    socket.on('send_message', function(data) {
      console.log('Message received:', data);
    
      // Emit the message to all users in the same chatroom
      io.in(data.chatroom).emit('receive_message', data);
    });
    
  });
};

