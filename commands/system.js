const Discord = require('discord.js');
var cpuStat = require('cpu-stat');
var memStat = require('mem-stat');
var netStat = require('net-stat');
var disk = require('diskusage');
const os = require('os')
exports.run = (client, message) => {
    disk.check('/', function(err, info) {
      disk.check('/root/NAS', function(err, NAS) {
        disk.check('/root/CodeStorage', function(err, CodeStorage) {
          disk.check('/root/CodeBackups', function(err, CodeBackups) {
        var cpu = os.loadavg();
        const embed = new Discord.RichEmbed()
        .setTimestamp()
        .setThumbnail(message.author.iconURL)
        .addField('------------------------------------------------------------------------------------', '**CPU** :')
        .addField('CPU Load:', `${Math.ceil(cpu[1] * 100) / 10 + "%"}`, true)
        .addField('CPU Cores:', `${cpuStat.totalCores()}`, true)
        .addField('CPU Type:', `Intel Xeon CPU E5645`, true)
        .addField('------------------------------------------------------------------------------------', '**RAM** :')
        .addField('Used Mem:', `${Math.round(memStat.total('MiB') - memStat.free('MiB')) + "MB"}`, true)
        .addField('Total Mem:', `${Math.round(memStat.total('GiB')) + "GB"}`, true)
        .addField('Used Percent:', `${Math.ceil(memStat.usedPercent() * 100) / 100 + "%"}`, true)
        .addField('------------------------------------------------------------------------------------', '**DISK** :')
        .addField('Disk Used:', `${Math.round(info.total / 1000000 / 1024) - Math.round(info.free / 1000000 / 1024) + "GB"}`, true)
        .addField('Disk Total:', `${Math.round(info.total / 1000000 / 1024) + "GB"}`, true)
        .addField('Drive:', `OS Boot - 40GB`, true)
        .addField('Disk Used:', `${Math.round(NAS.total / 1000000 / 1024) - Math.round(NAS.free / 1000000 / 1024) + "GB"}`, true)
        .addField('Disk Total:', `${Math.round(NAS.total / 1000000 / 1024) + "GB"}`, true)
        .addField('Drive:', `NAS - 923GB`, true)
        .addField('Disk Used:', `${Math.round(CodeStorage.total / 1000000 / 1024) - Math.round(CodeStorage.free / 1000000 / 1024) + "GB"}`, true)
        .addField('Disk Total:', `${Math.round(CodeStorage.total / 1000000 / 1024) + "GB"}`, true)
        .addField('Drive:', `Code Storage - 70GB`, true)
        .addField('Disk Used:', `${Math.round(CodeBackups.total / 1000000 / 1024) - Math.round(CodeBackups.free / 1000000 / 1024) + "GB"}`, true)
        .addField('Disk Total:', `${Math.round(CodeBackups.total / 1000000 / 1024) + "GB"}`, true)
        .addField('Drive:', `Code Backup - 154GB`, true)
        .addField('------------------------------------------------------------------------------------', '**NETWORK** :')
        .addField('Received Net:', `${Math.round(netStat.totalRx({ iface: 'eth0', units: 'GiB' })) + "GB"}`, true)
        .addField('Transmitted Net:', `${Math.round(netStat.totalTx({ iface: 'eth0', units: 'GiB' })) + "GB"}`, true)
        .addField('Connection Speed:', `1000 Mbit/s`, true)
        .setColor(6583245);
          message.channel.send({embed})
        .catch(console.error);
    }); 
  }); 
  }); 
  });
    var cpu = os.loadavg();
};

exports.conf = {
    enabled: true,
    guildOnly: true,
    aliases: [],
    permLevel: "User"
  };
  exports.help = {
    name: "system",
    category: "Info Commands",
    description: "Shows CPU, Disk, Net, Mem.",
    usage: "system"
  };
