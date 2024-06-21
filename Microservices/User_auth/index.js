const connectToMongo = require('./db')
const express = require('express')
const cors = require('cors')
const https = require('https');
const fs = require('fs');

connectToMongo();

const app = express()
const port = 5001

app.use(cors())
app.use(express.json())

app.use('/api/auth',require('./routes/auth') )
app.use('/api/access',require('./routes/access') )
app.use('/api/moretokens',require('./routes/moretokens') )

app.use('/',(req,res)=>{
  return res.json({
    message:"Wecome to Docster user auth microservice"
  })
})
const httpsServer = https.createServer({
  key: fs.readFileSync('/etc/letsencrypt/live/docschat.in/privkey.pem'),
  cert: fs.readFileSync('/etc/letsencrypt/live/docschat.in/fullchain.pem'),
}, app);

httpsServer.listen(443, () => {
    console.log('HTTPS Server running on port 443');
});

app.listen(port, () => {
  console.log(`Docster listening on port http://localhost:${port}`)
})