const app = require('express')();
const http = require('http').createServer(app);
const io = require('socket.io')(http);
const path = require('path');
const cors = require('cors');

const five = require('johnny-five');
const board = new five.Board();
let allMsg = ['Server msg'];

const debounce = (func, wait = 100, immediate = true) => {
  var timeout;
  return function() {
    var context = this,
      args = arguments;
    var later = function() {
      timeout = null;
      if (!immediate) func.apply(context, args);
    };
    var callNow = immediate && !timeout;
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
    if (callNow) func.apply(context, args);
  };
};

board.on('ready', function() {
  const potentiometer = new five.Sensor('A3');

  // potentiometer.on('change', () => {
  //   // console.log('  value  : ', potentiometer.value);
  //   // debounce(console.log('  value  : ', potentiometer.value));
  //   io.emit('All', potentiometer.value);
  // });

  const servo = new five.Servo(10);
  board.repl.inject({
    servo
  });

  servo.to(180);

  const led = new five.Led(13);
  // led.blink(500);
  led.toggle();

  io.on('connection', function(socket) {
    connections.push(socket);
    console.log(`${socket.id} connected`);
    io.emit('All', allMsg);

    socket.on('IOT_in', data => {
      // console.log(`${socket.id} said : ${data[0]}`);
      allMsg = data;
      console.log(allMsg);
      led.toggle();
      servo.to(data[0]);

      io.emit('All', allMsg);
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
