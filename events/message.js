const fs = require("fs");
module.exports = async (client, message, guild) => { 
  require("../events/messageleaderboard")(client); 
  const sql = require('sqlite3');
  const db = new sql.Database('./database.db');
  if (message.author.bot) return;
  const settings = message.settings = client.getSettings(message.guild.id);
  const prefixMention = new RegExp(`^<@!?${client.user.id}>( |)$`);
  if (message.content.match(prefixMention)) {
    return message.reply(`My prefix on this server is \`${settings.prefix}\``);
  }
  if (message.content.indexOf(settings.prefix) !== 0) return;
  const args = message.content.slice(settings.prefix.length).trim().split(/ +/g);
  const command = args.shift().toLowerCase();
  if (message.guild && !message.member) await message.guild.fetchMember(message.author);
  const level = client.permlevel(message);
  const cmd = client.commands.get(command) || client.commands.get(client.aliases.get(command));
  if (!cmd) return;
  if (cmd && !message.guild && cmd.conf.guildOnly)
    return message.channel.send("This command is unavailable via private message. Please run this command in a guild.");

  if (level < client.levelCache[cmd.conf.permLevel]) {
    if (settings.systemNotice === "true") {
      return message.channel.send(`You do not have permission to use this command.`);
    } else {
      return;
    }
  }


  message.author.permLevel = level;

  message.flags = [];
  while (args[0] && args[0][0] === "-") {
    message.flags.push(args.shift().slice(1));
  }
  client.logger.cmd(`[CMD] ${client.config.permLevels.find(l => l.level === level).name} ${message.author.username} (Server: ${message.guild.name}) ran command ${cmd.help.name}`);
  cmd.run(client, message, args, level, db);
  let CRuns = JSON.parse(fs.readFileSync("./datajsons/commandruns.json", "utf8"));
      CRuns.total ++;
      fs.writeFile("./datajsons/commandruns.json", JSON.stringify(CRuns), (err) => {
        if (err) console.log(err)
      });


};