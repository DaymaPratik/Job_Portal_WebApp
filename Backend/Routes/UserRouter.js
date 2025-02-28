const express=require("express");
const router=express.Router();
const {registerUserFunction,getAllContactUsFromListFunction,deleteFromContactUsFromListFunction,loginUserFunction,applyForThisJobFunction}=require('../Controllers/UserController');
router.post('/api/registerUser',registerUserFunction);
router.post('/api/loginUser',loginUserFunction)
router.post('/api/applyForJob/:jobid',applyForThisJobFunction)
router.get("/api/contactUsFromList",getAllContactUsFromListFunction)
router.get("/api/deleteFromContactUsFromList/:id",deleteFromContactUsFromListFunction)
module.exports=router;

