const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const http = require('http')

const routes = require('./routes')
const { setupWebsocket } = require('./websocket')

const app = express()
const server = http.Server(app)

const credentials = require('./credentials')

setupWebsocket(server)

mongoose.connect(credentials.mongodb, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})

app.use(cors())
app.use(express.json())
app.use(routes)

server.listen(3333)
