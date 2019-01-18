const Discord = require('discord.js');

exports.run = (client, message, args) => {
    let messagecount = parseInt(args.join(' '));
    if (!messagecount) {
        return message.reply('How many messages?');
    }
    if (messagecount > 100) {
        return message.reply(`Limit: Can only delete 100 messages at a time.`);
    }

    let ms;
    if (messagecount === 1) {
        ms = 2;
    } else {
        ms = messagecount;
    }
    message.channel.fetchMessages({limit: messagecount}).then(messages => message.channel.bulkDelete(ms))
  .catch(err => {
      console.error(err, message.channel.send('I cant delete message that are older than a week'));
  })
   message.delete(2000)
};

exports.conf = {
    enabled: true,
    guildOnly: true,
    aliases: [],
    permLevel: "Administrator"
  };
  
  exports.help = {
    name: "purge",
    category: "Admin Commands",
    description: "Purge for messages",
    usage: "purge number"
  };