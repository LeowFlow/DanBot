const { RichEmbed } = require('discord.js');

exports.run = async(client, message, args, db) => {

    if (args.length < 1) return message.channel.send("\:x: Invalid Arguments. `" + client.config.prefix + "ban <@User || ID>`");

    let guildMember = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]))
    let reason = args.slice(1).join(" ");
    let user = client.users.get(guildMember.id)

    let action;
    if (user.bot){
        action = 'Bot Ban'
    }else{
        action = 'User Ban'
    }

    db.run(`INSERT INTO actions(user, action, mod) VALUES(?, ?, ?)`, [user.tag, action, message.author.tag], function(err) {
        if (err) {
          return message.channel.send("\:warning: An unexpected database error occurred.")
        }
        guildMember.ban('Bot Ban.');
        message.channel.send(`\:white_check_mark: **${user.username}** has been banned. Check <#${client.config.modLogs}>!`) 
      const embed = new RichEmbed()
      .setTitle(action + " | Case #" + this.lastID)
      .setColor("#7ED321")
      .addField("User", user.tag, true)
      .addField("Moderator", message.author.tag, true)
      .addField("Reason", "`" + client.config.prefix + "reason " + this.lastID + " [Reason]`")
      client.channels.get(client.config.modLogs).send({embed}).then(m => 

        db.run(`UPDATE actions SET messageID = ? WHERE id = ?`, [m.id, this.lastID], function(err) {
          if (err) {
            return message.channel.send("\:warning: An unexpected database error occurred.")
          }
         
        })
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
            name: "ban",
            category: "Admin Commands",
            description: "Bans a user",
            usage: "ban @user reason"
          };
