const UserModel = require('../models/user');
const UserResumeModel=require('../models/userResume');
const bcrypt = require('bcrypt');

exports.registerUser = (req, res, next) => {
    const firstName = req.body.first_name;
    const lastName = req.body.last_name;
    const userName = req.body.user_name;
    const password = req.body.user_password;
    const email = req.body.email;
    const contactNo = req.body.contact_no;
    const address= req.body.address;

    bcrypt.hash(password, 12).then(encryptedPassword => {
        const user = new UserModel({
            firstName: firstName,
            lastName: lastName,
            userName: userName,
            password: encryptedPassword,
            email: email,
            contactNo: contactNo,
            address:address
        });
        return user.save();
    }).then(user => {
        const userResume = new UserResumeModel({
            userId: user._id
        });
        userResume.save();
        return res.redirect('/home/' + user._id);
    }).catch(err => {
        console.log("Error: " + err);
        res.render('registration', {
            userId: undefined,
            message: 'Error occured in registering....Try Again'
        });
    });
};

exports.loginUser = (req, res, next) => {
    const userName = req.body.user_name;
    const password = req.body.user_password;
    let currentUser;

    UserModel.findOne({
        userName: userName
    }).then(user => {
        if (!user) {
            return res.render('login', {
                userId: undefined,
                message: 'Invalid username...Try Again'
            });
        }
        currentUser = user;
        return bcrypt.compare(password, user.password);
    }).then(isEqual => {
        if (!isEqual) {
            return res.render('login', {
                message: 'Wrong Password...Try Again',
                userId: undefined
            });
        }
        return res.redirect('/home/' + currentUser._id);
    }).catch(err => {
        console.log("Error: " + err);
        res.render('login', {
            message: 'Error occured in Logging in....Try Again',
            userId: undefined
        });
    });
};

exports.renderRegisterPage = (req, res, next) => {
    const userId = undefined;
    res.render('registration', {
        userId: userId
    });
};

exports.renderLoginPage = (req, res, next) => {
    const userId = undefined;
    res.render('login', {
        userId: userId
    });
};

exports.logoutUser = (req, res, next) => {
    return res.redirect('/home');
};

exports.renderResume=(req,res,next)=>{
    const userId = req.params.userId;
    UserResumeModel.findOne({userId:userId}).then(userResume=>{
        UserModel.findById(userId).then(user=>{
            return res.render('resume.ejs',{
                firstName:user.firstName,
                lastName:user.lastName,
                email:user.email,
                contactNo: user.contactNo,
                address:user.address,
                profileOverview : userResume.profileOverview,
                projects : userResume.projects,
                projectsDescription : userResume.projectsDescription,
                highlights : userResume.highlights,
                userId:userId
            });
        }).catch(err => {
            console.log('Error renderResume UserModel ' + err);
        });
    }).catch(err => {
        console.log('Error renderResume ' + err);
    });
};

exports.renderEditResumePage = (req, res, next) => {
    const userId=req.params.userId;
    let profileOverview;
    let projects;
    let projectsDescription;
    let highlights;
    UserResumeModel.findOne({userId:userId}).then(userResume=>{
        profileOverview=userResume.profileOverview;
        projects=userResume.projects;
        projectsDescription=userResume.projectsDescription;
        highlights=userResume.highlights;

        return res.render('editResume.ejs', {
            profileOverview: profileOverview,
            projects: projects,
            projectsDescription: projectsDescription,
            highlights: highlights,
            userId:userId
        });
    }).catch(err=>{
        console.log('Error renderEditResumePage '+err);
    });
};

exports.editResumePage = (req, res, next) => {
    const userId = req.params.userId;
    const profileOverview= req.body.profileOverview;
    const projects= req.body.projects;
    const projectsDescription = req.body.projectsDescription;
    const highlights = req.body.highlights;

    UserResumeModel.findOne({userId:userId}).then(userResume=>{
        userResume.profileOverview=profileOverview;
        userResume.projects=projects;
        userResume.projectsDescription=projectsDescription;
        userResume.highlights=highlights;
        return userResume.save();
    }).then(userResume=>{
        return res.redirect('/user/resume/'+userId);
    }).catch(err => {
        console.log('Error editResume ' + err);
    });
};

exports.rederResumeWithoutLogin=(req,res,next)=>{
    const userId = req.params.userId;
    UserResumeModel.findOne({
        userId: userId
    }).then(userResume => {
        UserModel.findById(userId).then(user => {
            return res.render('resume.ejs', {
                firstName: user.firstName,
                lastName: user.lastName,
                email: user.email,
                contactNo: user.contactNo,
                address: user.address,
                profileOverview: userResume.profileOverview,
                projects: userResume.projects,
                projectsDescription: userResume.projectsDescription,
                highlights: userResume.highlights,
                userId: userId
            });
        }).catch(err => {
            console.log('Error renderResume UserModel ' + err);
        });
    }).catch(err => {
        console.log('Error renderResume ' + err);
    });
};