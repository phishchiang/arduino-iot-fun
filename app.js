const app = require('express')();
const http = require('http').createServer(app);
const io = require('socket.io')(http);
const path = require('path');
const cors = require('cors');

app.use(cors());

users = [];
connections = [];

app.get('/client', (req, res) => {
  res.sendFile(path.resolve(__dirname, 'client', 'index.html'));
});

io.on('connection', function(socket) {
  connections.push(socket);
  console.log(`${socket.id} connected`);
  socket.on('chat message', function(data) {
    console.log('message: ' + data);
    io.emit('All', data);
  });

  socket.on('disconnect', () => {
    console.log(`${socket.id} is gone`);
  });
});

http.listen(5000, function() {
  console.log('listening on *:5000');
});
