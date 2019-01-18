exports.run = async (client, message, args, level) => {
    let mlb = JSON.parse(fs.readFileSync("./datajsons/messageleaderboard.json", "utf8"));

    };
    
    exports.conf = {
      enabled: true,
      guildOnly: false,
      aliases: [],
      permLevel: "Bot Admin"
    };
    
    exports.help = {
      name: "eval",
      category: "Bot Staff Commands",
      description: "Runs what ever i want it to",
      usage: "eval [...code]"
    };