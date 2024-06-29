const mongoose = require('mongoose')
const {Schema } = mongoose;
require('mongoose-long')(mongoose);
var Long = mongoose.Schema.Types.Long;

const UserSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    email:{
        type:String,
        required: true,
        unique: true
    },
    password:{
        type:String,
        required:true
    },
    currentToken:{
        cToken:{
            type:Long,
            required:true
        },
        gToken:{
            type:Long,
            required:true
        }
    },
    maxToken:{
        type:Long,
        default:5000
    }
})
const User = mongoose.model('user',UserSchema);
module.exports = User