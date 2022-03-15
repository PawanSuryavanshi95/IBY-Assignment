const jwt = require('jsonwebtoken');

function authenticate(req, res, next){
    const token = req.headers['authorization'];

    //console.log(token);

    if(token){
        jwt.verify(token, "TEST_SECRET", (err, user)=>{
            if(err) return res.send({success:false, message: `Invalid Token`});
            req.user = user;
            next();
        });
    }
    else return res.send({success:false, message: `Empty Token`});
}

module.exports = authenticate;