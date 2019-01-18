const { version } = require("discord.js");
const moment = require("moment");
const os = require('os');
require("moment-duration-format");


function convertMS(ms) {
    var d, h, m, s;
    s = Math.floor(ms / 1000);
    m = Math.floor(s / 60);
    s = s % 60;
    h = Math.floor(m / 60);
    m = m % 60;
    d = Math.floor(h / 24);
    h = h % 24;
    return {
        d: d,
        h: h,
        m: m,
        s: s
    };
};

exports.run = (client, message, args, level) => {
const BanKick = require("../datajsons/Pcount.json")
const cpus = (require('os').cpus() || { length: 1 }).length
var cpu = os.loadavg();
let u = convertMS(client.uptime);
let uptime = u.d + " Days - " + u.h + " Hours - " + u.m + " Minutes - " + u.s + " Seconds"
  const duration = moment.duration(client.uptime).format(" D [days], H [hrs], m [mins], s [secs]");
  message.channel.send(`= STATISTICS =
• Mem Usage  :: ${Math.round(process.memoryUsage().rss / 1024 / 1024) + "MB"}
• CPU Usage  :: ${Math.ceil(cpu[1] * 100) / 10 + "%"}
• Uptime     :: ${uptime}
• Users      :: ${client.guilds.reduce((p, c) => p + c.memberCount, 0).toLocaleString()}
• Servers    :: ${client.guilds.size.toLocaleString()}
• Channels   :: ${client.channels.size.toLocaleString()}
• Discord.js :: v${version}
• Node       :: ${process.version}
• Ban Count  :: ${BanKick.BC}
• COMMAND OUTDATED  :: https://danbot.xyz/stats`, {code: "asciidoc"});

};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: "User"
};

exports.help = {
  name: "stats",
  category: "Info Commands",
  description: "Gives some useful bot statistics",
  usage: "stats"
};