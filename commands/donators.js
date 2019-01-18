const Discord = require('discord.js');
exports.run = (client, message) => {
        const embed = new Discord.RichEmbed()
        .setTimestamp()
        .setThumbnail(message.author.iconURL)
        .addField('**Donators**', `Danielpmc - 1.00$`, true)
        .setColor(6583245);
          message.channel.send({embed})
        .catch(console.error);
};
exports.conf = {
    enabled: true,
    guildOnly: true,
    aliases: [],
    permLevel: "User"
  };
  exports.help = {
    name: "donators",
    category: "Info Commands",
    description: "Shows all donators.",
    usage: "donators"
  };