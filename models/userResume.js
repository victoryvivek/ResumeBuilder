const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userResume=new Schema({
    userId:{
        type:String,
        required:true
    },
    profileOverview:{
        type:String,
        default:"Profile Overview"
    },
    projects:{
        type:Array
    },
    projectDescriptions:{
        type:Array
    },
    highlights:{
        type:String
    },
    companyNames:{
        type:Array
    },
    companyDescriptions:{
        type:Array
    },
    githubLink:{
        type:String
    }
});

module.exports=mongoose.model("UserResumeModel",userResume);