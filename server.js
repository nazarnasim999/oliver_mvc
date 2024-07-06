// const express = require('express');
// const bodyParser = require('body-parser');
// const cors = require('cors');
// const sequelize = require('./config/database');
// const userRoutes = require('./routes/index');
// const session = require('express-session');
// const SequelizeStore = require('connect-session-sequelize')(session.Store);
// require('dotenv').config();
 
// const http = require('http');
// const { Server } = require('socket.io');

// const app = express();


// // app.use(cors());


// app.use(cors({
//     origin: 'http://localhost:3000', 
//     credentials: true,
//   }));







// app.use(bodyParser.json());



// const sessionStore = new SequelizeStore({
//     db: sequelize,
//   });
  

//   sessionStore.sync();
  

//   app.use(session({
//     secret: process.env.SESSION_SECRET, 
//     store: sessionStore,
//     resave: false,
//     saveUninitialized: true,
//     cookie: {
//         maxAge: 2 * 60 * 60 * 1000, // 2 hours
//         sameSite: 'None', // Ensure cookies are sent cross-site
//         secure: false, // Set to true if using HTTPS
//     },
// }));



// app.use('/api', userRoutes);


// const server = http.createServer(app);
// const io = new Server(server, {
//   cors: {
//     origin: 'http://localhost:3000', // Allow all origins for simplicity, adjust as needed
//   },
// });

// io.on('connection', (socket) => {
//   console.log('a user connected');

//   socket.on('disconnect', () => {
//     console.log('user disconnected');
//   });

//   socket.on('chat_message', (msg) => {
//     console.log('message: ' + msg);
//     io.emit('chat message', msg);
//   });
// });







// sequelize.sync()
//     .then(() => {
//         app.listen(5000, () => {
//             console.log('Server is running on http://localhost:5000');
//         });
//     })
//     .catch(err => console.error('Unable to connect to the database:', err));















// const express = require('express');
// const bodyParser = require('body-parser');
// const cors = require('cors');
// const sequelize = require('./config/database');
// const userRoutes = require('./routes/index');
// const session = require('express-session');
// const SequelizeStore = require('connect-session-sequelize')(session.Store);
// require('dotenv').config();
// const http = require('http');
// const { Server } = require('socket.io');

// const app = express();

// app.use(cors({
//   origin: 'http://localhost:3000',
//   credentials: true,
// }));

// app.use(bodyParser.json());

// const sessionStore = new SequelizeStore({
//   db: sequelize,
// });

// sessionStore.sync();

// app.use(session({
//   secret: process.env.SESSION_SECRET,
//   store: sessionStore,
//   resave: false,
//   saveUninitialized: true,
//   cookie: {
//     maxAge: 2 * 60 * 60 * 1000, // 2 hours
//     sameSite: 'None', // Ensure cookies are sent cross-site
//     secure: false, // Set to true if using HTTPS
//   },
// }));

// app.use('/api', userRoutes);

// const server = http.createServer(app);
// const io = new Server(server, {
//   cors: {
//     origin: 'http://localhost:3000', // Allow all origins for simplicity, adjust as needed
//   },
// });

// io.on('connection', (socket) => {
//   console.log('a user connected');

//   socket.on('disconnect', () => {
//     console.log('user disconnected');
//   });

//   socket.on('chat_message', (msg) => {
//     console.log('message: ' + msg);
//     io.emit('chat message', msg); // Emitting 'chat message' event to all connected clients
//   });
// });

// sequelize.sync()
//   .then(() => {
//     server.listen(5000, () => {
//       console.log('Server is running on http://localhost:5000');
//     });
//   })
//   .catch(err => console.error('Unable to connect to the database:', err));



















const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const sequelize = require('./config/database');
const userRoutes = require('./routes/index');
const session = require('express-session');
const SequelizeStore = require('connect-session-sequelize')(session.Store);

const { Op } = require('sequelize');

require('dotenv').config();
const http = require('http');
const { Server } = require('socket.io');
const Chat = require('./app/models/Chat');

const app = express();

app.use(cors({
  origin: 'https://7seasnetwork.appssols.com',
  credentials: true,
}));

app.use(bodyParser.json());

const sessionStore = new SequelizeStore({
  db: sequelize,
});

sessionStore.sync();

app.use(session({
  secret: process.env.SESSION_SECRET,
  store: sessionStore,
  resave: false,
  saveUninitialized: true,
  cookie: {
    maxAge: 2 * 60 * 60 * 1000, // 2 hours
    sameSite: 'None', // Ensure cookies are sent cross-site
    secure: false, // Set to true if using HTTPS
  },
}));

app.use('/api', userRoutes);

const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: 'https://7seasnetwork.appssols.com', // Allow all origins for simplicity, adjust as needed
  },
});

io.on('connection', (socket) => {
  console.log('a user connected');

  socket.on('disconnect', () => {
    console.log('user disconnected');
  });

  socket.on('chat_message', async (msg) => {
    console.log('messagets: ' + msg);

    try {
      // Save message to database
      const newChat = await Chat.create({
        Sender_Id: msg.Sender_Id,
        Reciever_Id: msg.Reciever_Id,
        message: msg.message,
      });

      // Emit the saved message to all connected clients
      io.emit('chat message', newChat);
    } catch (error) {
      console.error('Error saving chat message:', error);
    }
  });


  socket.on('get_previous_messages', async ({ sender, receiver }) => {

    console.log(sender,"sender",receiver,"reciver")


    try {
      const messages = await Chat.findAll({
        where: {
            [Op.or]: [
              { Sender_Id: sender, Reciever_Id: receiver },
              { Sender_Id: receiver, Reciever_Id: sender }
            ]
          },
          order: [['createdAt', 'ASC']]
        // order: [['createdAt', 'ASC']],  
      });
      // Emit messages back to the client

      console.log("messagesssss",messages)
      socket.emit('previous_messages', messages);
    } catch (error) {
      console.error('Error fetching previous messages:', error);
    }
  });


});

sequelize.sync()
  .then(() => {
    server.listen(5000, () => {
      console.log('Server is running on http://localhost:5000');
    });
  })
  .catch(err => console.error('Unable to connect to the database:', err));

