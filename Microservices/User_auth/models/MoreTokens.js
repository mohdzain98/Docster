const mongoose = require('mongoose')
const {Schema } = mongoose;

const MoreTokens= new Schema({
    uid:{
        type:String,
        required:true
    },
    uname:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    text:{
        type:String,
        required:true
    }
})

const Moretokens = mongoose.model('moreToken',MoreTokens)
module.exports = Moretokens