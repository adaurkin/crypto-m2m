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

var stdin = process.openStdin();

roomName = 'm2m:Minsk:car-charging'

var room
state = 0
provider = ""

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

  // setInterval(() => room.broadcast('hey everyone!'), 2000)

  // room.on('message', (message) => console.log('message from ' + message.from + ': ' + message.data.toString()))
  room.on('message', (message) => onMessage(message))
})

// 2do: switch to JSON

function onMessage(message) {
  console.log('message from ' + message.from + ': ' + message.data.toString())
  peer = message.from
  provider = peer
}

stdin.addListener("data", function(d) {
  // note:  d is an object, and when converted to a string it will
  // end with a linefeed.  so we (rather crudely) account for that  
  // with toString() and then trim() 
  command = d.toString().trim()

  switch(command) {
    case "RequestForService":
      room.broadcast('RequestForService')
      break;
    case "Deal":
      room.sendTo(provider, 'Deal')
      break;
    case "Start":
      room.sendTo(provider, 'Start')
      break;
    case "Stop":
      room.sendTo(provider, 'Stop')
      break;
  }
});