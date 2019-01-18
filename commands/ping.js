const Discord = require("discord.js");
const ping = require('node-http-ping')
var datetime = require('node-datetime');
exports.run = async (client, message, args, color) => {
  let start = message.channel.send(':ping_pong:').then(message => {
    message.delete();
    let API = (client.ping).toFixed(2)
    let embed = new Discord.RichEmbed()
    .setTitle(`:ping_pong: Pong!`)
    .setColor(color)
    .addField("Latency", (new Date().getTime() - message.createdTimestamp) + ' ms', true)
    .addField("API", `${API}ms`, true)
    message.channel.send(embed);
  });
};exports.conf = {
    enabled: true,
    guildOnly: true,
    aliases: [],
    permLevel: "User"
  };
  exports.help = {
    name: "ping",
    category: "Info Commands",
    description: "Ping in MS",
    usage: "ping"
  };
