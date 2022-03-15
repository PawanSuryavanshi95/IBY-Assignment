var mongoose = require('mongoose');

const sessionSchema = new mongoose.Schema({
    name: { type:String, required:true },
    date: { type:Date, default:Date.now },
    history: [{
        emotion:{
            angry: { type:Number , required:true },
            disgust: { type:Number , required:true },
            fear: { type:Number , required:true },
            happy: { type:Number , required:true },
            neutral: { type:Number , required:true },
            sad: { type:Number , required:true },
            surprise: { type:Number , required:true },
        },
        dominant_emotion: { type:String, required:true },
    }],
    
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
});

const sessionModel = mongoose.model('Session',sessionSchema);

module.exports = sessionModel;