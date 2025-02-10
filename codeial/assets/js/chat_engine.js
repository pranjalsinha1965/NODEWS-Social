class ChatEngine {
    constructor(chatBoxId, userEmail) {
        this.chatBox = $(`#${chatBoxId}`);
        this.userEmail = userEmail;

        // Initialize the socket with WebSocket and polling transports
        this.socket = io('http://localhost:5000', {
            transports: ['websocket', 'polling'],
            withCredentials: true
        });

        if (this.userEmail) {
            this.connectionHandler();
        }
    }

    connectionHandler() {
        let self = this;

        // Listen for successful connection
        this.socket.on('connect', function () {
            console.log('Connection established using sockets:', self.socket.id);

            // Emit join room event
            self.socket.emit('join_room', {
                user_email: self.userEmail,
                chatroom: 'codeial'
            });

            self.socket.on('user_joined', function (data) {
                console.log('A user joined the chat room:', data);
            });
        });

        // Handle sending messages
        $('#send-message').click(function () {
            let msg = $('#chat-message-input').val().trim();
            if (msg) {
                self.socket.emit('send_message', {
                    message: msg,
                    user_email: self.userEmail,
                    chatroom: 'codeial'
                });
                $('#chat-message-input').val(''); // Clear input after sending
            }
        });

        // Handle receiving messages
        self.socket.on('receive_message', function (data) {
            console.log('Message received:', data.message);
            let newMessage = $('<li>');
            let messageType = data.user_email === self.userEmail ? 'self-message' : 'other-message';

            newMessage.append($('<span>', {
                'html': data.message
            }));

            newMessage.append($('<sub>', {
                'html': data.user_email
            }));

            newMessage.addClass(messageType);
            $('#chat-messages-list').append(newMessage);
        });
    }
}
