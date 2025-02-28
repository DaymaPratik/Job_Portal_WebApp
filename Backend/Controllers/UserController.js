const {UserAuthModel,NormalUserContactFormModel}=require('../Models/UserModel');
const bcryptjs=require('bcryptjs');


const registerUserFunction=async(req,res)=>{
    const {username,password}=req.body;
    if (!(username && password)) {
        return res.status(200).json({ success: false, message: "All fields required" });
    }
    try {
        const existingAdmin = await UserAuthModel.findOne({username});
        if(existingAdmin) {
            return res.status(403).json({ message: 'Admin already registered. Please login.' });
        }
        const hashedPassword = await bcryptjs.hash(password, 10);
        const newlyCreatedAdmin = await UserAuthModel.create({ username, password: hashedPassword });
        console.log(newlyCreatedAdmin);
        res.json({ 
            succes:true,
            message: 'Admin registered successfully',
            newlyCreatedAdmin 
       });
    } catch (error) {
        console.log("Error in backend while registration user",error);
        res.json({
            success:false,
            message:"Error in backend while registration user",
        })
        
    }
}
const loginUserFunction=async(req,res)=>{
    console.log(req.body);
    const {username,password}=req.body;
    if (!(username && password)) {
        return res.json({ 
            success: false,
             message: "All fields required"
         });
    }
    try {
       
    const doesAdminExists = await UserAuthModel.findOne({ username });
    if (!doesAdminExists) {
        return res.status(400).json({ message: 'Invalid credentials' });
    }
    
    const isPassCorrect = await bcryptjs.compare(password, doesAdminExists.password);
    if (!isPassCorrect) {
        return res.status(400).json({ message: 'Invalid credentials' });
    }
    res.json({
        success:true,
        message:"User logged in succesfully in backend"
    })
    } catch (error) {
        console.log("Error in backend while login user",error);
        
    }
}
const applyForThisJobFunction=async(req,res)=>{
    let {name,education,skills,email,phone}=req.body;
    const {jobid}=req.params;
    console.log(jobid);
    console.log(req.body);
    
    try {
        const newlyAppliedJobObject=await NormalUserContactFormModel.create(
            {name,education,skills,email,phone,jobid}
        ); 
        console.log(newlyAppliedJobObject);
        res.json({
            success:true,
            message:"Successfully applied for a job",
            newlyAppliedJobObject
        })
    } catch (error) {
        console.log("Error while applying job backend",error);
        res.json({
            success:false,
            message:"Error while applying job backend"
        })
        
    }
}


const getAllContactUsFromListFunction=async(req,res)=>{
    try {
        const arrayOfAllJobRequests =await NormalUserContactFormModel.find({});
        res.json({
            succes:true,
            message:"successfully getting all the list of jobs request from contact form details backend",
            arrayOfAllJobRequests
        })
    } catch (error) {
        console.log("Error while getting all job requests list",error);
        res.json({
            success:false,
            message:"Error while getting all job requests list"
        })
    }
}


const deleteFromContactUsFromListFunction=async(req,res)=>{
    const {id}=req.params;
    try {
        const deletedApplicantDetails=await NormalUserContactFormModel.findByIdAndDelete(id);
        console.log(deletedApplicantDetails);
        res.json({
            succes:true,
            message:"Job Post deleted succesfully",
            deletedApplicantDetails
        })
        
    } catch (error) {
        console.log("Error in deleting applicants details post backend",error);
        
    }
}



module.exports={registerUserFunction,deleteFromContactUsFromListFunction,loginUserFunction,applyForThisJobFunction,getAllContactUsFromListFunction}