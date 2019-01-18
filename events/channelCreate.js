const Discord = require('discord.js');
module.exports = async (client, member, channel, guild) => {
    const settings = client.getSettings(member.guild.id);
    if (settings.serverLogs !== "true") return;
    let logs = guild.channel.find(c => c.name === settings.serverLogsChannel);
    if (!logs) return;
    let botembed = new Discord.RichEmbed()
        .setColor("#FF000")
        .setAuthor('Channel Created', guild.iconURL)
        .setFooter(`ID: ${channel.id}`)
        .setTimestamp()
        .setDescription(`_ _►Name<#${channel.id}> (**${channel.name}**) \n ►Type **${channel.type}**`)
    await logs.send(botembed);
}