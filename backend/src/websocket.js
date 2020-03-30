const socketio = require('socket.io')

let io

exports.setupWebsocket = server => {
    io = socketio(server)
    
    io.on('connection', socket => {
        socket.on('post', () => {
            socket.broadcast.emit('updatePosts')
        })

        socket.on('like', () => {
            socket.broadcast.emit('updatePosts')
        })
    })
}