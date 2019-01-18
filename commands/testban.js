const { RichEmbed } = require('discord.js');
const sql = require('sqlite3').verbose();
const db = new sql.Database('./database.db');
exports.run = async(client, message, args) => {
    const settings = message.settings;
    const defaults = client.config.defaultSettings;
    const overrides = client.settings.get(message.guild.id);
    if (!client.settings.has(message.guild.id)) client.settings.set(message.guild.id, {});

    if (args.length < 1) return message.channel.send("\:x: Invalid Arguments. `" + settings.prefix + "ban <@User || ID>`");

    let guildMember = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]))
    let reason = args.slice(1).join(" ");
    let user = client.users.get(guildMember.id)

    let action;
    if (user.bot){
        action = 'Bot Ban'
    }else{
        action = 'User Ban'
    }

    db.run(`INSERT INTO actions(user, mod) VALUES(?, ?, ?)`, [user.tag, message.author.tag], function(err) {
        if (err) {
          return message.channel.send("\:warning: An unexpected database error occurred.")
        }
        guildMember.ban('Bot Ban.');
        message.channel.send(`\:white_check_mark: **${user.username}** has been banned. Check <#${settings.modLogChannel}>!`) 
      const embed = new RichEmbed()
      .setTitle("Ban | Case #" + this.lastID)
      .setColor("#7ED321")
      .addField("User", user.tag, true)
      .addField("Moderator", message.author.tag, true)
      .addField("Reason", "`" + settings.prefix + "reason " + this.lastID + " [Reason]`")
      let banChannel = message.guild.channels.find(`name`, `${settings.modLogChannel}`);
      banChannel.send(embed);

        db.run(`UPDATE actions SET messageID = ? WHERE id = ?`, [m.id, this.lastID], function(err) {
          if (err) {
            return message.channel.send("\:warning: An unexpected database error occurred.")
          }
         
        }
    )
})

}
exports.conf = {
    enabled: true,
    guildOnly: true,
    aliases: [],
    permLevel: "Administrator"
  };
  
  exports.help = {
    name: "testban",
    category: "Admin Commands",
    description: "Bans a user",
    usage: "testban @user reason"
  };