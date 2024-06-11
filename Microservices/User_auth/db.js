const mongoose = require('mongoose')
require('dotenv').config()

// const mongoUri = process.env.REACT_APP_DB
const mongoUri = "mongodb://localhost:27017/Docster"

const connectToMongo = async () =>{
    try{
        await mongoose.connect(mongoUri)
        console.log('mongo connected')
    }catch(error){
        console.log('error'+error)
    }
}
module.exports = connectToMongo;