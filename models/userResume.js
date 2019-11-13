const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userResume=new Schema({
    profileOverview:{
        type:String,
        default:"Profile Overview"
    },
    projects:{
        type:Array
    },
    projectsDescription:{
        type:Array
    },
    highlights:{
        type:String
    }
});

module.exports=mongoose.model("UserResumeModel",userResume);