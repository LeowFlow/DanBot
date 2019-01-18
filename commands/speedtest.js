const moment = require("moment");
require("moment-duration-format");
const Discord = require('discord.js')
const speedTest = require('speedtest-net'); 
exports.run = async(client, message) => {
    let embed = new Discord.RichEmbed()
    .setColor(`RANDOM`)
    .addField(`Please wait...`, `This could take 20 - 40seconds`, true);
    let msg = await message.channel.send(embed)
    const speed = speedTest({maxTime: 5000, serverId: 16379});
    speed.on('data', async (data) => {
        embed.fields.pop()
            embed.addField(`Ping`, `${data.server.ping}`, true)
            embed.addField('Download Speed', `${data.speeds.download} Mbps`, true)
            embed.addField('Upload Speed', `${data.speeds.upload} Mbps`, true)
            embed.addField('ISP', `${data.client.isp}`, true)
            embed.addField('ISP Rating', `${data.client.isprating}`, true)
            embed.addField('Current server time', moment().format('MMMM Do YYYY [|] HH:mm'), true)
        msg.edit(embed);
    });
};
exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: [],
    permLevel: "User"
  };
  
  exports.help = {
    name: "speedtest",
    category: "Info Commands",
    description: "Internet speed test",
    usage: "speedtest"
  };