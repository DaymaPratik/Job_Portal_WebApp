const express=require('express');
const router=express.Router();
const {getJobsListFunction,
    deleteAJobPostFunction,
    createNewjobFunction,
    getJobDetailsFunction}=require("../Controllers/jobsController")
router.get("/api/getJobList",getJobsListFunction);
router.post("/api/admin/creatNewJob",createNewjobFunction);
router.get("/api/getJobDetails/:id",getJobDetailsFunction);
router.get("/api/deleteJobPost/:id",deleteAJobPostFunction)
module.exports=router;
