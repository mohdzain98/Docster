const mongoose = require('mongoose')
const {Schema } = mongoose;


const AccessSchema = new Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'user'
    },
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique: true
    }
})

const Access = mongoose.model('access',AccessSchema);
module.exports = Access