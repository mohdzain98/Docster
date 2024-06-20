const connectToMongo = require('./db')
const express = require('express')
const cors = require('cors')

connectToMongo();

const app = express()
const port = 5001

const corsOptions = {
  origin: 'https://docschat.in',
  optionsSuccessStatus: 200
};

app.use(cors(corsOptions));
// app.use(cors())
app.use(express.json())

app.use('/api/auth',require('./routes/auth') )
app.use('/api/access',require('./routes/access') )
app.use('/api/moretokens',require('./routes/moretokens') )

app.use('/',(req,res)=>{
  return res.json({
    message:"Wecome to Docster User Auth Microservice"
  })
})

app.listen(port, () => {
  console.log('Backend running on http://139.59.1.84:5001/');
});