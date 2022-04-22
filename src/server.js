const saveTickersInMemory = require("../src/services/saveTickersInMemory")
const verifyHeader = require('./Middlewares/verifyHeader')
const client = require('./routes/client')
const api = require('./routes/api')
const express = require('express')
const https = require('https')
const fs = require('fs')
const path = require('path')
require('dotenv').config()
const app = express()

app.use(express.json())

app.use('/api', verifyHeader.auth, api)
app.use('/', client)


https
  .createServer(
    {
      key: fs.readFileSync(path.resolve("src/ssl/private.key")),
      cert: fs.readFileSync(path.resolve("src/ssl/certificate.crt")),
    },
    app
  )
  .listen(process.env.PORT || 3000, () => {
    console.log("Servidor rodando");
    saveTickersInMemory.start()
    setInterval(() => {
        saveTickersInMemory = []
        saveTickersInMemory.start()
    }, 21600000);
  });