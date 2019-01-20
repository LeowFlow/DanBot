const fs = require("fs");
let mlb = JSON.parse(fs.readFileSync("./datajsons/messageleaderboard.json", "utf8"));
exports.run = async (client, message, args, level) => {
    message.channel.send("", {
      embed: new Discord.RichEmbed;
      .setTitle("This is the leaderboard command (W.I.P.)")
      .setDescription(mlb[message.author.id].msgs)
    });
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