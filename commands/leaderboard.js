const fs = require("fs");
exports.run = async (client, message, args, level) => {
  let mlb = JSON.parse(fs.readFileSync("./datajsons/messageleaderboard.json", "utf8"));
    message.channel.send({
		embed: {
			author: { name: `DanBot's Message LeaderBoard!` },
			description: `${mlb[message.author.username].msgs}`,
			color: 0xFFFFFF
		}
	});
    };
    
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