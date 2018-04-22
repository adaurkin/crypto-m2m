const Room = require('ipfs-pubsub-room')
const IPFS = require('ipfs')
const ipfs = new IPFS({
  EXPERIMENTAL: {
    pubsub: true
  },
  config: {
    Addresses: {
      Swarm: [
        '/dns4/ws-star.discovery.libp2p.io/tcp/443/wss/p2p-websocket-star'
      ]
    }
  }
})

var greenLed
var redLed
var blueLed

onRPi = true
// onRPi = false
if (onRPi) {
  var Gpio = require('onoff').Gpio
  // components connected to the RPi
  greenLed = new Gpio(14, 'out')
  redLed = new Gpio(15, 'out')
  blueLed = new Gpio(18, 'out')
}

roomName = 'm2m:Minsk:car-charging'

stateAvailable = 0
stateBooked = 1
stateBusy = 2

var clientId = ""
offer = '{type: "offer", price: 1, currency: "ETH", place: [1,2]}'

state = stateAvailable

var room
// IPFS node is ready, so we can start using ipfs-pubsub-room
ipfs.on('ready', () => {
  room = Room(ipfs, roomName)

  room.on('peer joined', (peer) => {
    console.log('Peer joined the room', peer)
  })

  room.on('peer left', (peer) => {
    console.log('Peer left...', peer)
  })

  // now started to listen to room
  room.on('subscribed', () => {
    console.log('Now connected!')
    room.broadcast('hey everyone!')
  })

  // temp
  room.on('peer joined', (peer) => room.sendTo(peer, 'Welcome ' + peer + '!'))

  // 2do: check message JSON for messages from a (potential) client
  // room.on('message', (message) => console.log('message from ' + message.from + ': ' + message.data.toString()))
  room.on('message', (message) => onMessage(message))
})

function onMessage(message) {
  command = message.data.toString()
  peer = message.from

  switch(command) {
    case "RequestForService":
      if (state == stateAvailable) {
        room.sendTo(peer, offer)
      }
      break;
    case "Deal":
      if (state == stateAvailable) {
        setState(stateBooked)
        room.sendTo(peer, '{result: "ok"}')
      }
      break;
    case "Start":
      if ((peer == clientId) && (state == stateBooked)) {
        setState(stateBusy)
        room.sendTo(peer, '{result: "ok"}')
      }
      break;
    case "Stop":
      if ((peer == clientId) && (state == stateBusy)) {
        setState(stateAvailable)
        room.sendTo(peer, '{result: "ok"}')
      }
      break;
  }
}

function setState(newState) {
  switch(newState) {
    case stateAvailable:
      greenLed = 1
      redLed = 0
      blueLed = 0
      break;
    case stateBooked:
      greenLed = 0
      redLed = 1
      blueLed = 0
      break;
    case stateBusy:
      greenLed = 1
      redLed = 1
      blueLed = 1
      // request payment on interval?
      // setInterval(() => setState(stateBooked), 2000)
  }
  state = newState
}