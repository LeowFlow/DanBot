const Discord = require("discord.js");
const meme = require('memejs');

module.exports.run = async (client, message, args) => {
    let searchMessage = await message.channel.send('Loading memes :D');
    meme(function(data) {
    const embed = new Discord.RichEmbed()
    .setTitle(data.title[0])
    .setColor("RANDOM")
    .setImage(data.url[0])
    searchMessage.edit({embed});
  })
}

exports.conf = {
    enabled: true,
    guildOnly: true,
    aliases: [],
    permLevel: "User"
  };
  exports.help = {
    name: "memes",
    category: "Fun Commands",
    description: "Memes. I don't know what else to put here :eyes:",
    usage: "memes"
  };