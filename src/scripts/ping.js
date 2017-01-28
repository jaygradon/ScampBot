const ping = {
  help: 'Poke Scamp!',
  listens: 'mention',
  match: '^(ping|poke|oi|hey)$',
  func: (msg, args) => {
    if (args[0] === 'ping') {
      msg.channel.sendMessage('Pong!');
    } else {
      const numResponses = 3;
      const response = Math.floor(Math.random() * (numResponses + 1)) + 1;
      switch (response) {
        case 1: {
          msg.channel.sendFile('./assets/dogs_confused.gif', 'dogs_confused.gif').then(
            msg.channel.sendMessage('...what?')
          );
          break;
        }
        case 2: {
          msg.channel.sendFile('./assets/cat_scared.gif', 'cat_scared.gif').then(
            msg.channel.sendMessage('Aieee! Ahem... Yeah?')
          );
          break;
        }
        case 3: {
          msg.channel.sendFile('./assets/wolf_angry.gif', 'wolf_angry.gif').then(
            msg.channel.sendMessage('Grrr...')
          );
          break;
        }
      }
    }
  }
};

module.exports = ping;
