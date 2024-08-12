const { Router, response } = require("express");
const router = Router();
const userMiddleware = require("../middleware/user");
const { User, Course } = require("../db");

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

router.get('/courses', (req, res) => {
    Course.find({})
    .then((response)=>{
        res.json({
            courses:response
       })
    })});

router.post('/courses/:courseId', userMiddleware, (req, res) => {
    // Implement course purchase logic
    const courseId = req.params.courseId;
    const username= req.headers.username;

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
        username:req.headers.username
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