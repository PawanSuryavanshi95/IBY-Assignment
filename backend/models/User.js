var mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    firebase_uid: { type:String, required:true, unique:true },
    email: { type:String, required:true, unique:true },
    name: { type:String, required:true },
    
    sessions:[{ type: mongoose.Schema.Types.ObjectId, ref: 'Sessions' }],
});

const userModel = mongoose.model('User',userSchema);

module.exports = userModel;