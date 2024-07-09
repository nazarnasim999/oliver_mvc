const Job = require('../models/Job');
const AppliedJob = require('../models/AppliedJob');
// const { sequelize } = require('../models');

const {Op} = require('sequelize');
const sequelize = require('../../config/database');
const Interviewschedule = require('../models/Interviewschedule');




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


exports.Applyjob = async (req, res) => {
    try {
        const { userId } = req.body; 
        const { jobId } = req.body; 

        console.log('ddddd' , req.body)
       

        const { fullname, email, phonenumber,
            
            } = req.body; 


            console.log('idss', userId);

       
        const job = await new AppliedJob; 
       


       
        job.fullname = fullname;
        job.email = email;

        job.phonenumber = phonenumber;
        job.user_id = userId;
        job.job_id = jobId;
       
     

        await job.save(); 

        res.json({ message: 'Successfully', job });
    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }
};




// exports.getApplication = async (req, res) => {
//     try {
//         const jobs = await AppliedJob.findAll();
//         // const appliedJobs = await AppliedJob.findAll({
//         //     include: [
//         //         {
//         //             model: Job,
//         //             required: true
//         //         }
//         //     ]
//         // });
       
      
//         res.json({jobs});
//     } catch (err) {
//         console.error(err);
//         res.status(500).send('Server Error');
//     }
// };




exports.getApplication = async (req, res) => {
    const { id } = req.query;
    try {
        const jobs = await sequelize.query(`
            SELECT jobs.*
            FROM jobs
            JOIN appliedjobs ON jobs.id = appliedjobs.job_id
            WHERE appliedjobs.user_id = :userId;
        `, {
            replacements: { userId: id },
            type: sequelize.QueryTypes.SELECT
        });
        
        res.json({ jobs });
    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }
};



exports.getPitch = async (req, res) => {
    const { id } = req.query;

    console.log('achivee' , id)
    try {
        const jobs = await sequelize.query(`
            


            SELECT jobs.*, appliedjobs.*
            FROM jobs
            JOIN appliedjobs ON jobs.id = appliedjobs.job_id
            WHERE jobs.instructor_id = :instructorId;
        `, {
            replacements: { instructorId: id },
            type: sequelize.QueryTypes.SELECT
        });
        
        res.json({ jobs });
    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }
};


exports.shortlist = async (req, res) => {
    const { id } = req.query;
    const { user_id } = req.query;

    console.log('id' , id)
    try {
        const job = await Job.findByPk(id);
        job.shortlisted = 1;
        job.applied = 0;
        await job.save(); 
        const jobs = await sequelize.query(`
            


            SELECT jobs.*, appliedjobs.*
            FROM jobs
            JOIN appliedjobs ON jobs.id = appliedjobs.job_id
            WHERE jobs.instructor_id = :instructorId;
        `, {
            replacements: { instructorId: user_id },
            type: sequelize.QueryTypes.SELECT
        });  

        res.json({jobs});
    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }
};




exports.Rejected = async (req, res) => {
    const { id } = req.query;
    const { user_id } = req.query;

    console.log('id' , id)
    try {
        const job = await Job.findByPk(id);
        job.rejected = 1;
        job.applied = 0;
        await job.save(); 
        const jobs = await sequelize.query(`
            


            SELECT jobs.*, appliedjobs.*
            FROM jobs
            JOIN appliedjobs ON jobs.id = appliedjobs.job_id
            WHERE jobs.instructor_id = :instructorId;
        `, {
            replacements: { instructorId: user_id },
            type: sequelize.QueryTypes.SELECT
        });  

        res.json({jobs});
    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }
};




exports.createschedule = async (req, res) => {
    const { userId } = req.body; 
        const { jobId } = req.body; 

        console.log('ddddd' , req.body)
       

        const { interviewDate, interviewTime
            
            } = req.body; 


            console.log('idss', userId);

       
        const job = await new Interviewschedule; 
       


       
        job.date = interviewDate;
        job.time = interviewTime;

      
        job.job_id = jobId;
       
     

        await job.save(); 

   
    try {
        const job = await Job.findByPk(jobId);
        job.shortlisted = 0;
        job.applied = 0;
        job.completed = 1;

        await job.save(); 
        const jobs = await sequelize.query(`
            


            SELECT jobs.*, appliedjobs.*
            FROM jobs
            JOIN appliedjobs ON jobs.id = appliedjobs.job_id
            WHERE jobs.instructor_id = :instructorId;
        `, {
            replacements: { instructorId: userId },
            type: sequelize.QueryTypes.SELECT
        });  

        res.json({message: 'Successfully', jobs});
    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }
};



exports.updatejobdetails= async (req,res)=>{

try {

    const {stack,description,location,type,job,budget}= req.body
        console.log(stack,description,location,type,job,budget,"updatejob")


        const update = await Job.findByPk(job.id)

        console.log(update,"popop")
        update.title=stack;
        update.description=description;
        update.location=location;
        update.budget=budget;
        update.type=type

        update.save()

        res.json({
            message:true
        })


} catch (error) {
    console.log(error)
}

}




exports.deletejobdetails= async (req,res)=>{

    try {
    
        const {job}= req.body
            console.log(job.id,"updatejob")
    
    
            const update = await Job.destroy({where:{id:job.id}})
    
            console.log(update,"popop")
            
            
    
            res.json({
                message:true
            })
    
    
    } catch (error) {
        console.log(error)
    }
    
    }