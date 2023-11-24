const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
            name:String,
            email:{
                type:String,
                lowercase:true
            },
            pass:String,
            booked_period:Array,
});



const userModel = mongoose.model('user',userSchema);

module.exports = userModel;