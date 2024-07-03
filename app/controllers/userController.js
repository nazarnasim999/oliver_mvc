const User = require('../models/User');
const bcrypt = require('bcrypt');

exports.getUsers = async (req, res) => {
    try {
        // const users = await User.findAll();
        const currentUser = req.user;
        const users = req.body
        res.json({currentUser , message:users});
    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }
};


exports.getprofile = async (req, res) => {
    const { id } = req.query;
  try {
    const user = await User.findOne({ where: { id } });
    if (user) {
      res.status(200).json(user);
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  } catch (error) {
    console.error('Error fetching user profile:', error);
    res.status(500).json({ message: 'An error occurred while fetching the profile' });
  }
};




exports.loginUser = async (req, res) => {
    const { email, password } = req.body;
    console.log('email', email)

    try {
       
        const user = await User.findOne({  where: { email } });

        if (!user) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        
        const isMatch = await bcrypt.compare(password, user.password);

        console.log(isMatch);

        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }


        req.session.user = {
            id: user.id,
            email: user.email,
           
        };

        console.log('usersssss', req.session)

       
        res.status(200).json({ user, message: 'Login successful' });
    } catch (error) {
        console.error(error);
        res.status(500).send('Server Error');
    }
};

exports.createUser = async (req, res) => {
    console.log(req.body);
    try {
        const { name, email, password, type } = req.body;

        
        const hashedPassword = await bcrypt.hash(password, 10); 

       
        const newUser = await User.create({ name, email, password: hashedPassword, type });

        res.status(201).json({
            user: newUser,
            message: 'successfully'
        });
    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }
}




exports.updateUser = async (req, res) => {
    try {
        const { userId } = req.body; 
        console.log('ddddd' , req.body)
       

        const { firstname, lastname, email,
            password, mobile,
            address, city,country,
            qualification, experience,
            
            about } = req.body; 


            console.log('idss', userId);

       
        const user = await User.findByPk(userId); 
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }


        const hashedPassword = await bcrypt.hash(password, 10); 

       
        user.firstname = firstname;
        user.lastname = lastname;

        user.email = email;
        user.mobile = mobile;
        user.address = address;
        user.city = city;
        user.country = country;
        user.qualification = qualification;
        user.experience = experience;
       
        user.about = about;




        user.password = hashedPassword;

        await user.save(); 

        res.json({ message: 'User updated successfully', user });
    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }
};