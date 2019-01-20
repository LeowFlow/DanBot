module.exports = (client, member) => {
    const settings = client.getSettings(member.guild.id);
    if (settings.welcomeEnabled !== "true") return;
    const welcomeMessage = settings.welcomeMessage.replace("{{user}}", member.user.username)
    .replace("{{amount}}", member.guild.memberCount)
.replace("{{guild}}", member.guild.name)
    member.guild.channels.find(c => c.name === settings.welcomeChannel).send(welcomeMessage).catch(console.error);


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
    bot.channels.get("536398920348073994").send(guildEmbed);


  }; 