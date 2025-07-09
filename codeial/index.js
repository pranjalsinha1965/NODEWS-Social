// const express = require('express');
// const cookieParser = require('cookie-parser');
// const app = express();
// const port = 7862;
// const expressLayouts = require('express-ejs-layouts');
// const db = require('./config/mongoose');

// // used for session cookie
// const session = require('express-session');
// const passport = require('passport');
// const passportLocal = require('./config/passport-local-strategy');
// const passportJWT = require('./config/passport-jwt-strategy');
// const passportGoogle = require('./config/passport-google-oauth2-strategy');

// const MongoStore = require('connect-mongo');
// const sassMiddleware = require('node-sass-middleware');
// const flash = require('connect-flash');
// const customMware = require('./config/middleware');

// // setup the chat server to be used with socket.io
// const chatServer = require('http').Server(app);
// const chatSockets = require('./config/chat_sockets').chatSockets(chatServer);
// chatServer.listen(5000);
// console.log('chat server is listening on port 5000');
// const path = require('path');
// app.use(sassMiddleware({
//     src: './assets/scss',
//     dest: './assets/css',
//     debug: true,
//     outputStyle: 'extended',
//     prefix: '/css'
// }));
// app.use(express.urlencoded({ extended: true }));

// app.use(cookieParser());

// app.use(express.static('./assets'));
// // make the uploads path available to the browser
// app.use('/uploads', express.static(__dirname + '/uploads'));
// app.use(expressLayouts);
// // extract style and scripts from sub pages into the layout
// app.set('layout extractStyles', true);
// app.set('layout extractScripts', true);

// // set up the view engine
// app.set('view engine', 'ejs');
// app.set('views', './views');

// // mongo store is used to store the session cookie in the db
// app.use(session({
//     name: 'codeial',
//     // TODO change the secret before deployment in production mode
//     secret: 'blahsomething',
//     saveUninitialized: false,
//     resave: false,
//     cookie: {
//         maxAge: (1000 * 60 * 100)
//     },
//     store: new MongoStore(
//         {
//             mongooseConnection: db,
//             autoRemove: 'disabled'
        
//         },
//         function(err){
//             console.log(err ||  'connect-mongodb setup ok');
//         }
//     )
// }));

// app.use(passport.initialize());
// app.use(passport.session());
// app.use(passport.setAuthenticatedUser);

// app.use(flash());
// app.use(customMware.setFlash);

// // use express router
// app.use('/', require('./routes'));

// app.listen(port, function(err){
//     if (err){
//         console.log(`Error in running the server: ${err}`);
//     }
//     console.log(`Server is running on port: ${port}`);
// });

// const express = require('express');
// const cookieParser = require('cookie-parser');
// const app = express();
// const port = 7862;
// const expressLayouts = require('express-ejs-layouts');
// const db = require('./config/mongoose');

// used for session cookie
// const session = require('express-session');
// const passport = require('passport');
// const passportLocal = require('./config/passport-local-strategy');
// const passportJWT = require('./config/passport-jwt-strategy');
// const passportGoogle = require('./config/passport-google-oauth2-strategy');

// const MongoStore = require('connect-mongo');
// const sassMiddleware = require('node-sass-middleware');
// const flash = require('connect-flash');
// const customMware = require('./config/middleware');

// // setup the chat server to be used with socket.io
// const chatServer = require('http').Server(app);
// const chatSockets = require('./config/chat_sockets').chatSockets(chatServer);
// chatServer.listen(5000);
// console.log('chat server is listening on port 5000');

// const path = require('path');

// app.use(sassMiddleware({
//     src: './assets/scss',
//     dest: './assets/css',
//     debug: true,
//     outputStyle: 'extended',
//     prefix: '/css'
// }));

// app.use(express.urlencoded({ extended: true }));

// app.use(cookieParser());

// app.use(express.static('./assets'));
// // make the uploads path available to the browser
// app.use('/uploads', express.static(__dirname + '/uploads'));

// app.use(expressLayouts);
// // extract style and scripts from sub pages into the layout
// app.set('layout extractStyles', true);
// app.set('layout extractScripts', true);

// // set up the view engine
// app.set('view engine', 'ejs');
// app.set('views', './views');

// // mongo store is used to store the session cookie in the db
// app.use(session({
//     name: 'codeial',
//     // TODO: change the secret before deployment in production mode
//     secret: 'blahsomething',
//     saveUninitialized: false,
//     resave: false,
//     cookie: {
//         maxAge: (1000 * 60 * 100)
//     },
//     store: MongoStore.create({
//         mongoUrl: 'mongodb://localhost:27017/codeial_development',
//         autoRemove: 'disabled'
//     })
// }));

// app.use(passport.initialize());
// app.use(passport.session());
// app.use(passport.setAuthenticatedUser);

// app.use(flash());
// app.use(customMware.setFlash);

// // use express router
// app.use('/', require('./routes'));

// app.listen(port, function(err){
//     if (err){
//         console.log(`Error in running the server: ${err}`);
//     }
//     console.log(`Server is running on port: ${port}`);
// });

const express = require('express');
const cookieParser = require('cookie-parser');
const app = express();
const port = 7862;
const path = require('path');

const expressLayouts = require('express-ejs-layouts');
const db = require('./config/mongoose');

// Session & Auth
const session = require('express-session');
const passport = require('passport');
const passportLocal = require('./config/passport-local-strategy');
const passportJWT = require('./config/passport-jwt-strategy');
const passportGoogle = require('./config/passport-google-oauth2-strategy');

const MongoStore = require('connect-mongo');
const sassMiddleware = require('node-sass-middleware');
const flash = require('connect-flash');
const customMware = require('./config/middleware');

// Chat server setup with socket.io
const chatServer = require('http').Server(app);
const chatSockets = require('./config/chat_sockets').chatSockets(chatServer);
chatServer.listen(5000);
console.log('🔊 Chat server is listening on port 5000');

// SCSS to CSS conversion middleware
app.use(sassMiddleware({
  src: './assets/scss',
  dest: './assets/css',
  debug: true,
  outputStyle: 'extended',
  prefix: '/css'
}));

app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static('./assets'));

// Serve uploaded files
app.use('/uploads', express.static(__dirname + '/uploads'));

// Use layouts
app.use(expressLayouts);
app.set('layout extractStyles', true);
app.set('layout extractScripts', true);

// Set EJS view engine
app.set('view engine', 'ejs');
app.set('views', './views');

// Session configuration
app.use(session({
  name: 'codeial',
  secret: 'blahsomething', // TODO: change for production
  saveUninitialized: false,
  resave: false,
  cookie: {
    maxAge: 1000 * 60 * 100 // 100 minutes
  },
  store: MongoStore.create({
    mongoUrl: 'mongodb://localhost:27017/codeial_development',
    autoRemove: 'disabled'
  })
}));

// Initialize Passport and session
app.use(passport.initialize());
app.use(passport.session());
app.use(passport.setAuthenticatedUser);

// Flash messaging
app.use(flash());
app.use(customMware.setFlash);

// Use routes
app.use('/', require('./routes'));

// Start express server
app.listen(port, function (err) {
  if (err) {
    console.log(`❌ Error in running the server: ${err}`);
  } else {
    console.log(`✅ Server is running on port: ${port}`);
  }
});
