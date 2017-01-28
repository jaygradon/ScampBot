const ping = {
  help: 'Send a Pong!',
  chatter: 'respond',
  match: 'ping',
  func: (msg, args) => {
    msg.channel.sendMessage('Pong!');
  }
};

module.exports = ping;
