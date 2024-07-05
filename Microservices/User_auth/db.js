const mongoose = require('mongoose')
require('dotenv').config()

const mongoUri = process.env.REACT_APP_MDB

const connectToMongo = async () =>{
    try{
        await mongoose.connect(mongoUri)
    }catch(error){
        console.log('not working')
    }
}
module.exports = connectToMongo;