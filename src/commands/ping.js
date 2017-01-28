const ping = {
  help: 'Send a Pong!',
  func: (msg, args) => {
    msg.channel.sendMessage('Pong!');
  }
};

module.exports = ping;
