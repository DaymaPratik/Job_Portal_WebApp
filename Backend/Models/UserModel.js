const mongoose=require('mongoose');
const UserSchema=new mongoose.Schema({
    username:{
        type:String,
    },
    password:{
        type:String,
    }
})

const ContactUserSchema=new mongoose.Schema({
    name:{
        type:String,
    },
    email:{
        type:String,
    },
    phone:{
        type:String,
    },
    education:{
        type:String,
    },
    skills:{
        type:String,
    },
    jobid:{
        type:String,
    },
   
})
const UserAuthModel=mongoose.model('UserAuthModelCollection',UserSchema);
const NormalUserContactFormModel=mongoose.model('NormalUserContactFormMCollection',ContactUserSchema)
module.exports={UserAuthModel,NormalUserContactFormModel}