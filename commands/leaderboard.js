const fs = require("fs");
exports.run = async (client, message, args, level) => {
  let coins = JSON.parse(fs.readFileSync("./datajsons/coins.json", "utf8"));
  let Coinss = coins[message.author.id].coins;
  const { currency } = message.client;
      const client = message.client
      
      return message.channel.send({
            embed: {
                color: 3447003,
                title: "```\n== Top Five Global Users ==\n```",
                //   title: "test\nsa",
                description: currency.sort((a, b) => b.balance - a.balance)
                    .filter(user => client.users.has(user.user_id))
                    .first(5)
                    .map((user, position) => `(${position + 1}) ${(client.users.get(user.user_id).tag)}: ${user.coins}`)
                    .join('\n'),

            }
        })

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