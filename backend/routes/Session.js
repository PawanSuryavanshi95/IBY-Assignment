const express = require('express');
const db = require('../db');

const router = express.Router();

router.post('/create',(req,res)=>{

    const newSession = {
        name: req.body.name,
        user: req.user._id,
    };

    db.Session.create(newSession).then(session => {
        console.log(session);
        res.send({success:true, message:'Session Created!', session:session._id });
    }).catch(e => {
        res.send({success:false, message:e.message});
    });

});

router.post('/send-data',(req,res)=>{

    db.Session.findById(req.body.session).then(session => {

        var temp = session.history;
        temp = temp.concat(req.body.data);

        db.Session.updateOne({_id:session._id}, { history:temp }).then(session2 => {
            console.log('done')
            res.send({success:true, message:'Data sent!' });
        }).catch(e => {
            res.send({success:false, message:e.message });
        });
    })

});

router.post('/get-data',(req,res)=>{

    db.Session.find({user:req.user._id}).then(session => {
        const data = [];
        let i = -1;

        session.forEach( sess => {
            data.push({
                "angry": [],
                "disgust": [],
                "fear": [],
                "happy": [],
                "neutral": [],
                "sad": [],
                "surprise": [],
                "labels": [],
                "dominant": {
                    "angry": 0,
                    "disgust": 0,
                    "fear": 0,
                    "happy": 0,
                    "neutral": 0,
                    "sad": 0,
                    "surprise": 0,
                },
                name:sess.name,
            });

            i = i + 1;
            var j = 1;

            sess.history.forEach( prediction => {
                data[i]['angry'].push(prediction['emotion']['angry']);
                data[i]['disgust'].push(prediction['emotion']['disgust']);
                data[i]['fear'].push(prediction['emotion']['fear']);
                data[i]['happy'].push(prediction['emotion']['happy']);
                data[i]['neutral'].push(prediction['emotion']['neutral']);
                data[i]['sad'].push(prediction['emotion']['sad']);
                data[i]['surprise'].push(prediction['emotion']['surprise']);
                data[i]['labels'].push(j);
                
                const dom = session[3].history[0]['dominant_emotion'];

                data[i]['dominant'][dom] = data[i]['dominant'][dom] + 1; 
                j = j + 1;
            });
        });

        res.send({success:true, message:'Data retreived !', session:data });
    }).catch(e => {
        res.send({success:false, message:e.message });
    })

});

module.exports = router;