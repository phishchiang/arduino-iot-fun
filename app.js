const app = require('express')();
const http = require('http').createServer(app);
const io = require('socket.io')(http);
const path = require('path');
const cors = require('cors');

const five = require('johnny-five');
const board = new five.Board();

board.on('ready', function() {
  const led = new five.Led(13);
  // led.blink(500);
  led.toggle();

  io.on('connection', function(socket) {
    connections.push(socket);
    console.log(`${socket.id} connected`);

    socket.on('IOT_in', data => {
      // console.log(`${socket.id} said : ${data[0]}`);
      console.log(data);
      led.toggle();

      io.emit('All', data);
    });

    socket.on('disconnect', () => {
      console.log(`${socket.id} is gone`);
    });
  });
});

app.use(cors());

users = [];
connections = [];

app.get('/client', (req, res) => {
  res.sendFile(path.resolve(__dirname, 'client', 'index.html'));
});

http.listen(5000, function() {
  console.log('listening on *:5000');
});
