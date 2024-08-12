const { Router } = require("express");
const adminMiddleware = require("../middleware/admin");
const { Secret } = require("../Config");
const { Admin, Course } = require("../db");

const jwt = require('jsonwebtoken');


const router = Router();

// Admin Routes
router.post('/signup', (req, res) => {
    // Implement admin signup logic
    const username=req.body.username;
    const password=req.body.password;

    Admin.create({
        username:username,
        password:password
    }).then(()=>{

        res.json({
            msg:"Admin Created Succesfully" 
        })

    })
    .catch(()=>{
        res.status("403").json({
            msg:"Admin not Created"
        })
    })
});

router.post('/signin', async(req, res) => {
    // Implement admin signup logic
    const username=req.body.username;
    const password=req.body.password;

    const Validate= await Admin.find({
        username,
        password
    })

    if(Validate.length>0){
        const token = jwt.sign({
            username
        },Secret)
        
            res.json({token})
        
        }
        
    else{
        res.json("Incorrect Username & Password")
    }

    
});

router.post('/courses', adminMiddleware, (req, res) => {
    // Implement course creation logic
    const title = req.body.title;
    const description= req.body.description;
    const imageLink=req.body.imageLink;
    const price = req.body.price;

    Course.create({
        title,
        description,
        imageLink,
        price

    })
    .then((response)=>{
        res.json({
            msg:"Course Created Sucessfully",
            courseId:response._id

        })
    })
    .catch(()=>{
        res.send("403").json({
            msg:"Course not Created"
        })
    })
    
});

router.get('/courses', adminMiddleware, (req, res) => {
    // Implement fetching all courses logic
    Course.find({})
    .then((response)=>{
        res.json({
            courses:response
       })
    })
});

module.exports = router;