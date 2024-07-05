const Job = require('../models/Job');



exports.getJobs = async (req, res) => {
    try {
        const jobs = await Job.findAll();   
      
        res.json({jobs});
    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }
};



exports.instructorjob = async (req, res) => {
    const { instructor_id } = req.query;
    console.log('instructor_id', instructor_id)
  try {
    const user = await Job.findAll({ where: { instructor_id } });
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


exports.SaveJob = async (req, res) => {
    try {
        const { userId } = req.body; 
        console.log('ddddd' , req.body)
       

        const { jobDescription, jobTitle, jobType,
            location, salaryRange,
            } = req.body; 


            console.log('idss', userId);

       
        const job = await new Job; 
       


       
        job.title = jobTitle;
        job.description = jobDescription;

        job.location = location;
        job.type = jobType;
        job.budget = salaryRange;
        job.instructor_id = userId;
     




        

        await job.save(); 

        res.json({ message: 'Successfully', job });
    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }
};

