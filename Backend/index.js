const express=require('express');
const cors=require('cors');
const mongoose=require('mongoose');
const app=express();
const JobsRouter=require("./Routes/getJobListRouter")
const UserAuthRouter=require('./Routes/UserRouter');

app.use(cors({
     origin: 'https://job-portal-web-app-pratik-daymas-projects.vercel.app',
    credentials: true,
    methods: 'POST,GET',
}));
app.use(express.json());



app.use(JobsRouter);
app.use(UserAuthRouter)
app.listen(4000,()=>{
    console.log("App is listening at prot 4000");
})
mongoose.connect('mongodb+srv://pratikdayma45:LzJlylhbT6B09Fqd@cluster0.cpq5ooo.mongodb.net/Jobs_WebPortal_Database')
.then(()=>{console.log("DB Connected Successfully");
})
.catch((error)=>{console.log("Error connection Db",error);
})



// Frontend URL Vercel:https://job-portal-web-app-pratik-daymas-projects.vercel.app
// Frontend Local URL:http://localhost:5173
// BackendURL Render:https://job-portal-webapp-5wai.onrender.com
// Backend Local URL:http://localhost:400
// Mongo Cluster URL:mongodb+srv://pratikdayma45:LzJlylhbT6B09Fqd@cluster0.cpq5ooo.mongodb.net/Jobs_WebPortal_Database
// MONGO LOCAL URL:mongodb://localhost:27017/Jobs_WebPortal_Database

