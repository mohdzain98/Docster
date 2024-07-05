const mongoose = require('mongoose')
const {Schema } = mongoose;


const LikeSchema = new Schema({
    count:{
        type:Number,
        default:0
    }
})

const Like = mongoose.model('like',LikeSchema);
module.exports = Like