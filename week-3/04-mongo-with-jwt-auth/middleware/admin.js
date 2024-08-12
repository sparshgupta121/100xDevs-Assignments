// Middleware for handling auth
const jwt = require('jsonwebtoken');
const {Secret} = require('../Config');

function adminMiddleware(req, res, next) {
  
    const token = req.headers.authorisation;
    const words = token.split(" ");
    const jwttoken = words[1];

    const decodedValue = jwt.verify(jwttoken,Secret)

    if(decodedValue.username){
        next()
    }
    else{
        res.json({
            msg:"Not Authorized to access"
        })
    }
}

module.exports = adminMiddleware;