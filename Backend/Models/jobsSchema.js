const mongoose=require('mongoose');
const JobsSchema=new mongoose.Schema({
    job_id:{
        type:String
    },
    tittle:{
        type:String
    },
    company:{
        type:String
    },
    location:{
        type:String
    },
    remote:{
        type:Boolean
    },
    payscale:{
        type:String
    },
    last_registration_date:{
        type:String
    },
    required_stream:{
        type:String
    },
    description:{
        type:String
    }
})
const JobsListModel=mongoose.model("Job_List_Collection",JobsSchema);
module.exports=JobsListModel
