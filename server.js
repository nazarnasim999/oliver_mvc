const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const sequelize = require('./config/database');
const userRoutes = require('./routes/index');
const session = require('express-session');
const SequelizeStore = require('connect-session-sequelize')(session.Store);
require('dotenv').config();

const app = express();


app.use(cors());
app.use(bodyParser.json());



const sessionStore = new SequelizeStore({
    db: sequelize,
  });
  

  sessionStore.sync();
  

  app.use(session({
    secret: process.env.SESSION_SECRET, 
    store: sessionStore,
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: 2 * 60 * 60 * 1000, 
    },
  }));


app.use('/api', userRoutes);


sequelize.sync()
    .then(() => {
        app.listen(5000, () => {
            console.log('Server is running on http://localhost:5000');
        });
    })
    .catch(err => console.error('Unable to connect to the database:', err));
