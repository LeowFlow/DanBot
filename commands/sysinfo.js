const Discord = require('discord.js');
const si = require('systeminformation');
exports.run = (client, message) => {
    disk.check('/', function(err, info) {
        var cpu = os.loadavg();
        const embed = new Discord.RichEmbed()
        .setTimestamp()
        .setThumbnail(message.author.iconURL)
        .addField('CPU Load:', `${Math.ceil(cpu[1] * 100) / 10 + "%"}`, true)
        .setColor(6583245);
          message.channel.send({embed})
        .catch(console.error);
    }); 
    var cpu = os.loadavg();
};

exports.conf = {
    enabled: true,
    guildOnly: true,
    aliases: [],
    permLevel: "Bot Owner"
  };
  exports.help = {
    name: "sysinfo",
    category: "Info Commands",
    description: "Shows CPU, Disk, Net, Mem.",
    usage: "sysinfo"
  };
