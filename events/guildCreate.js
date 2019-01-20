const Discord = require('discord.js');
module.exports = (client, guild) => {
    client.logger.cmd(`[GUILD JOIN] ${guild.name} (${guild.id}) added the bot. Owner: ${guild.owner.user.tag} (${guild.owner.user.id})`);
    
    let Servericon = guild.iconURL;
    let guildEmbed = new Discord.RichEmbed()
    .setTitle("New Server!!!")
    .setColor("#53f23e")
    .setThumbnail(Servericon)
    .addField("__**Name:**__", `${guild.name}`)
    .addField("__**Owner:**__", `${guild.owner}`)
    .addField("__**Members:**__", `${guild.memberCount}`)
    .addField("__**Total Members:**__", `${client.guilds.reduce((p, c) => p + c.memberCount, 0)}`)
    .addField("__**Total Guilds:**__", `${client.guilds.size}`)
    .setFooter(`The Guilds ID: ${guild.id}`)
    .setTimestamp();
    client.channels.get("536398920348073994").send(guildEmbed);

  };