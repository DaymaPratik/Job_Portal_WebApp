const JobsListModel=require('../Models/jobsSchema')

const getJobsListFunction=async(req,res)=>{
    try {
        const jobsListArray=await JobsListModel.find({});
        // console.log(jobsListArray);
        res.json({
            succes:true,
            message:"success fully gettng all the list of jobs backend",
            jobsListArray
        })
        
    } catch (error) {
        console.log("Error gets jobs list");
        res.json({
            success:false,
            message:"Error getting jobs List"
        })
        
    }
}
const getJobDetailsFunction=async(req,res)=>{
    const {id}=req.params;
    try {
        const JobDetailsObject=await JobsListModel.findById(id);
        // console.log(JobDetailsObject);
        res.json({
            success:true,
            message:"Successfully getting job details by backend",
            JobDetailsObject:JobDetailsObject
        })
    } catch (error) {
        console.log("Error in backend while getting job details",error);
        res.json({
            success:false,
            message:"Error in backend while getting job details"
        })
    }
}

const createNewjobFunction=async(req,res)=>{
    const {job_id,tittle,company,location,remote,payscale,last_registration_date,required_stream,description}=req.body
    if(!(job_id && tittle && company && location  && payscale && last_registration_date && required_stream &&description)){
        return res.json({
            success:false,
            message:"All field required"
        })
    }
    try {
        const newlyAddedJobObject=await JobsListModel.create({
            job_id,
            tittle,
            company,
            location,
            remote,
            payscale,
            last_registration_date,
            required_stream,
            description
        }) 
        res.json({
            success:true,
            message:"Successfully added a new job in DB",
            newlyAddedJobObject
        })
        // console.log(newlyAddedJobObject);
        
    } catch (error) {
        console.log("Error in backend while creating a new job",error);
        res.json({
            success:false,
            message:"Error in backend while creating a new job"
        })
        
    }
}

const deleteAJobPostFunction=async(req,res)=>{
    const {id}=req.params;
    try {
        const deletedJobPost=await JobsListModel.findByIdAndDelete(id);
        console.log(deletedJobPost);
        res.json({
            succes:true,
            message:"Job Post deleted succesfully",
            deletedJobPost
        })
        
    } catch (error) {
        console.log("Error in deleting job post backend",error);
        
    }
}
module.exports={getJobsListFunction,getJobDetailsFunction,createNewjobFunction,
    deleteAJobPostFunction}