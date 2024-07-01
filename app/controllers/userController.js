const User = require('../models/User');
const bcrypt = require('bcrypt');

exports.getUsers = async (req, res) => {
    try {
        const users = await User.findAll();
        res.json(users);
    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }
};



exports.loginUser = async (req, res) => {
    const { email, password } = req.body;
    console.log('email', email)

    try {
        // Check if the user exists
        const user = await User.findOne({  where: { email } });

        if (!user) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        // Compare the password provided with the hashed password in the database
        const isMatch = await bcrypt.compare(password, user.password);

        console.log(isMatch);

        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        // Passwords match, create a session or token, and respond with success
        res.status(200).json({ user, message: 'Login successful' });
    } catch (error) {
        console.error(error);
        res.status(500).send('Server Error');
    }
};

exports.createUser = async (req, res) => {
    console.log(req.body);
    try {
        const { name, email, password } = req.body;

        // Hashing the password
        const hashedPassword = await bcrypt.hash(password, 10); // 10 is the salt rounds

        // Create a new user with hashed password
        const newUser = await User.create({ name, email, password: hashedPassword });

        res.status(201).json({
            user: newUser,
            message: 'successfully'
        });
    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }
}