// class ChatEngine {
//     constructor(chatBoxId, userEmail) {
//         this.chatBox = $(`#${chatBoxId}`);
//         this.userEmail = userEmail;

// const { isObject } = require("util");

//         // Initialize the socket with WebSocket and polling transports
//         this.socket = io('http://localhost:5000', {
//             transports: ['websocket', 'polling'],
//             withCredentials: true
//         });

//         if (this.userEmail) {
//             this.connectionHandler();
//         }
//     }

//     connectionHandler() {
//         let self = this;

//         // Listen for successful connection
//         this.socket.on('connect', function () {
//             console.log('Connection established using sockets:', self.socket.id);

//             // Emit join room event
//             self.socket.emit('join_room', {
//                 user_email: self.userEmail,
//                 chatroom: 'codeial'
//             });

//             self.socket.on('user_joined', function (data) {
//                 console.log('A user joined the chat room:', data);
//             });
//         });

//         // Handle sending messages
//         $('#send-message').click(function () {
//             let msg = $('#chat-message-input').val().trim();
//             if (msg) {
//                 self.socket.emit('send_message', {
//                     message: msg,
//                     user_email: self.userEmail,
//                     chatroom: 'codeial'
//                 });
//                 $('#chat-message-input').val(''); // Clear input after sending
//             }
//         });

//         // Handle receiving messages
//         self.socket.on('receive_message', function (data) {
//             console.log('Message received:', data.message);
//             let newMessage = $('<li>');
//             let messageType = data.user_email === self.userEmail ? 'self-message' : 'other-message';

//             newMessage.append($('<span>', {
//                 'html': data.message
//             }));

//             newMessage.append($('<sub>', {
//                 'html': data.user_email
//             }));

//             newMessage.addClass(messageType);
//             $('#chat-messages-list').append(newMessage);
//         });
//     }
// }

// class ChatEngine {
//     constructor(chatBoxId, userEmail) {
//         this.chatBox = $(`#${chatBoxId}`);
//         this.userEmail = userEmail;

//         // Initialize the socket connection
//         this.socket = io('http://localhost:5000', {
//             transports: ['websocket', 'polling'],
//             withCredentials: true
//         });

//         if (this.userEmail) {
//             this.connectionHandler();
//         }
//     }

//     connectionHandler() {
//         let self = this;

//         // Listen for successful connection
//         this.socket.on('connect', function () {
//             console.log('Connection established with socket ID:', self.socket.id);

//             // Join a chat room
//             self.socket.emit('join_room', {
//                 user_email: self.userEmail,
//                 chatroom: 'codeial'
//             });

//             // Notify when another user joins
//             self.socket.on('user_joined', function (data) {
//                 console.log('A user joined the chat room:', data);
//             });
//         });

//         // Handle connection errors
//         this.socket.on('connect_error', (error) => {
//             console.error('Socket connection error:', error);
//         });

//         // Handle disconnection
//         this.socket.on('disconnect', () => {
//             console.warn('Socket disconnected.');
//         });

//         // Handle sending messages
//         $('#send-message').click(function () {
//             let msg = $('#chat-message-input').val().trim();
//             if (msg) {
//                 self.socket.emit('send_message', {
//                     message: msg,
//                     user_email: self.userEmail,
//                     chatroom: 'codeial'
//                 });
//                 $('#chat-message-input').val(''); // Clear input field
//             }
//         });

//         // Handle receiving messages
//         this.socket.on('receive_message', function (data) {
//             self.displayMessage(data);
//         });
//     }

//     displayMessage(data) {
//         let newMessage = $('<li>');
//         let messageType = data.user_email === this.userEmail ? 'self-message' : 'other-message';

//         newMessage.append($('<span>', {
//             'html': data.message
//         }));

//         newMessage.append($('<sub>', {
//             'html': data.user_email
//         }));

//         newMessage.addClass(messageType);
//         $('#chat-messages-list').append(newMessage);
//     }
// }

// class ChatEngine{
//     constructor(chatBoxId, userEmail){
//         this.chatBox = $(`#${chatBoxId}`);
//         this.userEmail = userEmail;

//         this.socket = io.connect('http://localhost:5000');

//         if (this.userEmail){
//             this.connectionHandler();
//         }

//     }


//     connectionHandler(){
//         let self = this;

//         this.socket.on('connect', function(){
//             console.log('connection established using sockets...!');


//             self.socket.emit('join_room', {
//                 user_email: self.userEmail,
//                 chatroom: 'codeial'
//             });

//             self.socket.on('user_joined', function(data){
//                 console.log('a user joined!', data);
//             })


//         });

//         // CHANGE :: send a message on clicking the send message button
//         $('#send-message').click(function(){
//             let msg = $('#chat-message-input').val();

//             if (msg != ''){
//                 self.socket.emit('send_message', {
//                     message: msg,
//                     user_email: self.userEmail,
//                     chatroom: 'codeial'
//                 });
//             }
//         });

//         self.socket.on('receive_message', function(data){
//             console.log('message received', data.message);


//             let newMessage = $('<li>');

//             let messageType = 'other-message';

//             if (data.user_email == self.userEmail){
//                 messageType = 'self-message';
//             }

//             newMessage.append($('<span>', {
//                 'html': data.message
//             }));

//             newMessage.append($('<sub>', {
//                 'html': data.user_email
//             }));

//             newMessage.addClass(messageType);

//             $('#chat-messages-list').append(newMessage);
//         })
//     }
// }

class ChatEngine {
    constructor(chatBoxId, userEmail) {
      this.chatBox = $(`#${chatBoxId}`);
      this.userEmail = userEmail;
      // Connect to the server using the socket.io CDN import
      this.socket = io('http://localhost:5000');
      if (this.userEmail) {
        this.connectionHandler();
      }
    }
    connectionHandler() {
    let self = this;
    this.socket.on('connect', function () {
        console.log('Connection established using sockets...!!');
        self.socket.emit('join_room', {
            user_email : self.userEmail, 
            chatroom: 'codeial'  
    });
    self.socket.on('user_joined', function(data){
        console.log('a user joined', data);
    })
      });
      // change :: send a message on clicking the send message button
      $('#send-message').click(function(){
        let msg = $('#chat-message-input').val();
        if(msg != '')
        {
            self.socket.emit('send_message', {
                message: msg, 
                user_email: self.userEmail, 
                chatroom: 'codeial'
            });
        }
      });
      self.socket.on('receive_message', function(data){
        console.log('message received', data.message);
        let newMessage = $('<li>');
        let messageType = 'other-message';
        if(data.user_email == self.userEmail){
            messageType = 'self-message';
        }
        newMessage.append('<span>', {
            'html': data.message 
        });
        newMessage.append('<sub', {
            'html': data.user_email 
        });
        newMessage.addClass(messageType);
        $('#chat-message-list').append(newMessage);
      })
    }
  }
  
