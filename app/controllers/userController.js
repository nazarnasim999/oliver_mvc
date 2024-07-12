const User = require('../models/User');
const bcrypt = require('bcryptjs');
const uuid = require('uuid');
const AppliedJob = require('../models/AppliedJob');
const Job = require('../models/Job');

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

        const user_Id= uuid.v4()
       
        const newUser = await User.create({ name, email, password: hashedPassword, type, uuid:user_Id });

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


            console.log('update_user', req.body);

       
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






exports.update_users_doc = async (req, res) => {
    try {
        const { id , resume_url,documentone_url, documenttwo_url} = req.body; 

        
        console.log('update_users_doc' , req.body)
       

        


            


            console.log('update_user', req.body);

       
        // const user = await User.findOne({uuid:id}); 
        const user = await User.findOne({ where: { uuid: id }}); 


        console.log('userss', user);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
       
        user.resume_url = resume_url;

        user.documenttwo_url = documenttwo_url;

        user.documentone_url = documentone_url;

        




        

        await user.save(); 

        res.json({ message: 'User updated successfully', user });
    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }
};


// exports.get_instructor_job_requests = async (req, res) => {
//     try {
//         const { id } = req.params;

//         console.log("ppppppppppppppppppppppppppppppppp")

//         // Fetch jobs related to the instructor ID
//         const user = await Job.findAll({ where: { instructor_id: id } });

//         // Check if user exists
//         if (!user || user.length === 0) {
//             return res.status(404).json({ message: 'User not found' });
//         }

//         console.log("TS", user, "INSTRUCTOR_ID");
//         const Applied_Jobs_Arr = [];

//         user.forEach(async element => {
//             console.log(element.id)

//             const applied_jobs= await AppliedJob.findOne({job_id:element.id})
//             Applied_Jobs_Arr.push(applied_jobs)
//             console.log(applied_jobs,"pp")
//         });

//         // const Applied_Jobs_Arr = [];

//         // // Retrieve AppliedJob objects associated with each job ID
//         // const jobPromises = user.map(async (element) => {
//         //     console.log(element.id, "TwertS");
//         //     const job = await AppliedJob.findOne({ job_id: element.id });
//         //     console.log("mmm", job.email, "pop");
//         //     return job ? job.toJSON() : null; // Ensure you handle cases where job might be null
//         // });

//         // // Wait for all promises to resolve
//         // const jobs = await Promise.all(jobPromises);

//         // // Filter out null values in case some jobs are not found
//         // Applied_Jobs_Arr.push(...jobs.filter(job => job !== null));

//         // console.log(Applied_Jobs_Arr);
//         // console.log(Applied_Jobs_Arr, "APPLIED JOB");
        
            
//             res.json({ message: 'User updated successfully', Applied_Jobs_Arr });

//     } catch (err) {
//         console.error(err);
//         res.status(500).send('Server Error');
//     }
// };



 







exports.get_instructor_job_requests = async (req, res) => {
    try {
        const { id } = req.params;

        // Fetch jobs related to the instructor ID
        const jobs = await Job.findAll({ where: { instructor_id: id } });

        // Check if jobs exist
        if (!jobs || jobs.length === 0) {
            return res.status(404).json({ message: 'No jobs found for this instructor' });
        }

        console.log("Jobs related to instructor:", jobs);

        const Applied_Jobs_Arr = [];

        // Fetch applied jobs for each job asynchronously
        for (let i = 0; i < jobs.length; i++) {
            const job = jobs[i];
            const applied_job = await AppliedJob.findOne({ where: { job_id: job.id } });
            Applied_Jobs_Arr.push(applied_job);
            console.log("Applied Job for job ID", job.id, ":", applied_job);
        }

        console.log("Applied Jobs Array:", Applied_Jobs_Arr);

        res.json({ message: 'User updated successfully', Applied_Jobs_Arr });
    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }
};


// ts




// exports.get_instructor_job_requests = async (req, res) => {
//     try {
//         const { id } = req.params; 

        
//         console.log('update_users_doc_TS' , id)
       

        


            


//             // console.log('update_user', req.body);

       
//         const user = await Job.findAll({instructor_id:id}); 
//         if (!user) {
//             return res.status(404).json({ message: 'User not found' });
//         }
       
//         console.log("TS",user,"INSTRUCTOR_ID")
//         const Applied_Jobs_Arr=[]

//         // user.forEach(async element => {
            
//         //     console.log(element.id,"TwertS")

//         //     const job= await AppliedJob.findOne({job_id:element.id})

//         //     console.log("mmm",job,"pop")
            
//         //     Applied_Jobs_Arr.push(job.email)

            
//         // });
        

//         const jobPromises = user.map(async (element) => {
//             console.log(element.id, "TwertS");
//             const job = await AppliedJob.findOne({ job_id: element.id });
//             console.log("mmm", job.email, "pop");
//             return job ? job : null; // Ensure you handle cases where job might be null
//         });
    
//         // Wait for all promises to resolve
//         const jobs = await Promise.all(jobPromises);
    
//         // Filter out null values in case some jobs are not found
//         Applied_Jobs_Arr.push(...jobs.filter(email => email !== null));
    
//         console.log(Applied_Jobs_Arr);



//         console.log(Applied_Jobs_Arr,"APPLIED JOB")
        




        

     

//         res.json({ message: 'User updated successfully', Applied_Jobs_Arr });
//     } catch (err) {
//         console.error(err);
//         res.status(500).send('Server Error');
//     }
// };