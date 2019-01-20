const fs = require("fs");
const Discord = require("discord.js");
let mlb = JSON.parse(fs.readFileSync("./datajsons/messageleaderboard.json", "utf8"));
let msgss = mlb[message.author.id].msgs;
exports.run = async (client, message, args, level) => {
    message.channel.send("", {
      embed: new Discord.RichEmbed()
      .setTitle("LeaderBoard-W.I.P.")
      .setDescription(msgss)
    })
  }
    exports.conf = {
      enabled: true,
      guildOnly: false,
      aliases: [],
      permLevel: "User"
    };
    
    exports.help = {
      name: "leaderboard",
      category: "Bot Staff Commands",
      description: "IDK DAN DO THAT",
      usage: "leaderboard"
    };