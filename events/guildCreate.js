module.exports = (client, guild) => {
    client.logger.cmd(`[GUILD JOIN] ${guild.name} (${guild.id}) added the bot. Owner: ${guild.owner.user.tag} (${guild.owner.user.id})`);
    let Servericon = guild.iconURL;
    let guildEmbed = new Discord.RichEmbed()
    .setTitle("New Server!!!")
    .setColor("#53f23e")
    .setThumbnail(Servericon)
    .addField("__**Name:**__", `${guild.name}`)
    .addField("__**Owner:**__", `${guild.owner} [${guild.owner.user.tag}]`)
    .addField("__**Members:**__", `${guild.memberCount}`)
    .addField("__**Total Members (All Servers):**__", `${bot.guilds.size} servers`)
    .setFooter(`ID: ${guild.id}`)
    .setTimestamp();
    client.guilds.get("476731541167407106").bot.channels.get("536398920348073994").send(guildEmbed);

  };