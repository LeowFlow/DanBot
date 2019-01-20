const fs = require("fs");
exports.run = async (client, message, args, level) => {
  let coins = JSON.parse(fs.readFileSync("./datajsons/coins.json", "utf8"));
  let Coinss = coins[message.author.id].coins;
    message.author.send({
		embed: {
			author: { name: `DanBot's Message LeaderBoard!` },
			description: `${mlb[message.author.id].coins}`,
			color: 0xFFFFFF
		}
	});
    };
    
    exports.conf = {
      enabled: true,
      guildOnly: false,
      aliases: [],
      permLevel: "Bot Admin"
    };
    
    exports.help = {
      name: "leaderboard",
      category: "Bot Staff Commands",
      description: "IDK DAN DO THAT",
      usage: "leaderboard"
    };