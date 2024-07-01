const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const sequelize = require('./config/database');
const userRoutes = require('./routes/index');

const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Routes
app.use('/api', userRoutes);

// Connect to database and start server
sequelize.sync()
    .then(() => {
        app.listen(5000, () => {
            console.log('Server is running on http://localhost:5000');
        });
    })
    .catch(err => console.error('Unable to connect to the database:', err));
