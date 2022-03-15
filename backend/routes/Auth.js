const express = require('express');
const jwt = require('jsonwebtoken');

const firebase = require('../firebase-obj');

const db = require('../db');

const router = express.Router();

router.post('/login',(req,res)=>{

    firebase.auth().verifyIdToken(req.body.IDToken).then((decodedToken) => {
        db.User.findOne({
            $or: [
                { firebase_uid: decodedToken.uid, },
            ]
        }).then(async user => {
            if(!user){
                const newUser = { email: decodedToken.email, name: decodedToken.name, firebase_uid: decodedToken.uid,  };
                await db.User.create(newUser);
            }
            var payLoad = {
                _id: user._id,
                firebase_uid: user.firebase_uid,
            };
            var token = jwt.sign(payLoad, "TEST_SECRET", {
                expiresIn: 60*60*24
            });
            res.send({success:true, token:token });
            
        }).catch(error => {
            res.send({success:false, message:error.message});
        });
    })
    .catch((error) => {
        console.log(error);
    });
});

module.exports = router;