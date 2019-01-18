const Discord = require('discord.js');
module.exports = async (client, member, channel, guild, message) => {
    const settings = client.getSettings(member.guild.id);
    if (settings.serverLogs !== "true") return;
    let logs = message.guild.channels.find(`name`, `${settings.serverLogsChannel}`);
    if (!logs) return;
    let botembed = new Discord.RichEmbed()
    .setColor(0x11B8D6)
    .setTimestamp()
    .setTitle('Message Deleted')
    .addField('User', `${message.author.tag} (<@${message.author.id}>)`)
    .addField('Message', message.content);

    await logs.send(botembed);
}