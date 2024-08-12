const { Router } = require("express");
const router = Router();
const userMiddleware = require("../middleware/user");
const { Secret } = require("../Config");
const jwt = require("jsonwebtoken");
const {User,Course} = require("../db");


// User Routes
router.post('/signup', (req, res) => {
    // Implement user signup logic

    const username=req.body.username;
    const password=req.body.password;

    User.create({
        username,
        password
    })
    .then(()=>{
        res.json({
            msg:"User Created Succesfully"
        })
    })
    .catch(()=>{
        res.json({
            msg:"Unable to create user"
        })
    })


});

router.post('/signin', async(req, res) => {
    // Implement admin signup logic
    const username=req.body.username;
    const password=req.body.password;

    User.find({
        username:username,
        password:password
    }).then((response)=>{

        if(response.length>0){
            const token = jwt.sign({
                username
            },Secret)
            
                res.json({
                    token
                })
            
        }
    
        else{
            res.json("Incorrect Username & Password")
        }

    })
    

});

router.get('/courses', (req, res) => {
    // Implement listing all courses logic
    Course.find({})
    .then((response)=>{
        res.json({
            courses:response
       })
    })
});

router.post('/courses/:courseId', userMiddleware, (req, res) => {
    // Implement course purchase logic
    const courseId = req.params.courseId;
    const username= req.username;

    User.updateOne({
        username:username
    },{"$push":{
        purchasedCourses:courseId
    }})
    .then(()=>{
        res.json({
            msg:"Course Purchased Succesfully"
        })
    })
});

router.get('/purchasedCourses', userMiddleware, (req, res) => {
    // Implement fetching purchased courses logic
    User.findOne({
        username:req.username
    })
    .then((response)=>{        
        Course.find({
            _id:{
                "$in":response.purchasedCourses
            }
        })

        .then((PurchasedCourses)=>{
            res.json({
                PurchasedCourses
            })
        })
        
    })
});

module.exports = router