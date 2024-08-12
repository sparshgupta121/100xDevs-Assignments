const { Router, response } = require("express");
const adminMiddleware = require("../middleware/admin");
const { Admin, Course } = require("../db");


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

router.post('/courses', adminMiddleware, (req, res) => {
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
    
    // Implement course creation logic
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