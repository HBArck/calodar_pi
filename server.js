const api = require('./api')
const http = require('http')


/**
 * Get port from environment and store in Express.
 */
//const { port = 3000 } = config
port= 3000;
api.set('port', port)

/**
 * Create HTTP server.
 */
const server = http.createServer(api)

const io = require('socket.io')(server, {
  // path: '/test',
  // serveClient: false,
  // below are engine.IO options
  pingInterval: 10000,
  pingTimeout: 50000,
  cookie: false,
  transports: ['websocket', 'polling'],
  cors: {
    //origin: (process.env.NODE_ENV ==='development' ) ? "http://18.184.253.145:9019" : process.env.NODE_ENV === 'production' ? 'http://pcupbiz.info/' : 'localhost:4200' ,
    methods: ["GET", "POST"],
    credentials: true
  }
})


io.on("connection", (socket) => {
  console.dir(socket);
  console.log('new user connection:' + socket.id);
  socket.join('app');
});

io.listen(3306);
/*
setInterval(()=> {
  io.emit('start scan')
  io.emit('new message');
}, 3000);
var gpio = require('rpi-gpio');

gpio.on('change', function(channel, value) {
  console.log('Channel ' + channel + ' value is now ' + value);
  io.emit('PIN changed');
});
gpio.setup(17, gpio.DIR_IN, gpio.EDGE_BOTH);
*/

let isButtonPress = false;
const Gpio = require('onoff').Gpio;
const button1 = new Gpio(11, 'in', 'both');
const button2 = new Gpio(17, 'in', 'both');

button1.watch((err, value) => {
  if (!isButtonPress && value) {
    isButtonPress = true;
    console.log('Button1 value is now ' + value);
    io.emit('start scan');
    setTimeout(() => {
      isButtonPress = false;
    }, 1000);
  }
});

button2.watch((err, value) => {
  if (!isButtonPress && value) {
    isButtonPress = true;
    console.log('Button2 value is now ' + value);
    io.emit('start scan');
    setTimeout(() => {
      isButtonPress = false;
    }, 1000);
  }
});

//import { usb, getDeviceList } from 'usb';
const { getDeviceList, bindings, webusb} = require('usb/dist/usb');
const usb = require('usb/dist/usb');
const WebUSBDevice  = require('usb/dist/webusb/');

const devices = getDeviceList();

// console.dir(devices)
usb.on('attach', function (device) {
  console.dir(device)
})
/*
(async () => {
  // Returns first matching device
  const webUsb = new WebUSBDevice.WebUSB()
  const device = await webUsb.requestDevice({
    filters: [{}]
  })

  if (device) {
    console.log(device); // WebUSB device
  }
})();
*/
