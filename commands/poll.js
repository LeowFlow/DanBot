//Imports
const Discord = require('discord.js');
//-----------------------------------------
exports.run = async (client, message, args) => {

//Defines the settings for guilds
const settings = message.settings;
//-----------------------------------------
  if (args == 0) return message.channel.send("Please provide a poll topic.")
  let embed = new Discord.RichEmbed()
  .setTitle(`Poll by ${message.author.username}`)
  .setColor("#ffff00")
  .setDescription(`${args}`.split(',').join(' '));

//Finds the channel that the guild owner has set using !settings
  let pollChannel2 = message.guild.channels.find(`name`, `${settings.pollChannel}`);
  if(!pollChannel2) return message.channel.send(`Cant find ${settings.pollChannel}`);
//-----------------------------------------
  return pollChannel2.send(embed).then(message.delete())
  .then(function (message, str) {
       message.react("✅")
       message.react("⛔")
     }).catch(function() {
  });
};

//Exports for help command and config
exports.conf = {
    enabled: true,
    guildOnly: true,
    aliases: [],
    permLevel: "User"
  };
  exports.help = {
    name: "poll",
    category: "Fun Commands",
    description: "Start a poll",
    usage: "poll"
  };