const ping = {
  help: 'Send a Pong!',
  listens: 'mention',
  match: /^(ping)$/,
  func: (msg, args) => {
    msg.channel.sendMessage('Pong!');
  }
};

module.exports = ping;
