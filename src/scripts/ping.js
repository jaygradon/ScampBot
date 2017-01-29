const ping = {
  help: 'Ping Scamp!',
  listens: 'mention',
  match: '^(ping|poke|oi|hey)$',
  func: (msg, args) => {
    if (args[0] === 'ping') {
      msg.channel.sendMessage('Pong!');
    } else {
      msg.channel.sendFile('./assets/wolf_angry.gif', 'wolf_angry.gif').then(
        msg.channel.sendMessage('Grrr...')
      );
    }
  }
};

module.exports = ping;
