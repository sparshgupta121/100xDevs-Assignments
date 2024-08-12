const { User } = require("../db")

function userMiddleware(req, res, next) {
    // Middleware for handling auth     
    const username=req.headers.username
    const password=req.headers.password

    User.findOne({
        username:username,
        password:password
    })
    .then((value)=>{
        if(value){
            next()
        }
        else{
            res.status(403).json({
                msg:"You don't have access to this feature"
            })
        }
    })

}


module.exports = userMiddleware;