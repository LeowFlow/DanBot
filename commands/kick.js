const Discord = require("discord.js")
const sql = require('sqlite3');
const fs = require('fs');

//New Ban Stuff With Random Case IDs!
let Pcount = JSON.parse(fs.readFileSync("./datajsons/Pcount.json", "utf8"));
module.exports.run = async (client, message, args) => {
      const settings = message.settings;
      const defaults = client.config.defaultSettings;
      const overrides = client.settings.get(message.guild.id);
      if (!client.settings.has(message.guild.id)) client.settings.set(message.guild.id, {});


      //let kUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
      let kUser = message.mentions.users.first();
      let kReason = args.slice(1).join(" ")
      if(!kUser) return message.channel.send("Can't find that user!");
      if(!kUser) return message.channel.send("Please mention someone to ban!");
      if(kReason.length < 1) return message.reply("Please provide a reason for this ban.")
      //let kReason = args.join(" ").slice(22);

      message.delete()
      message.channel.send(`Kicked ${kUser} for ${kReason}. <@${message.author.id}>`)
      let kickEmbed = new Discord.RichEmbed()
      .setDescription("**__DanBot Kick__**")
      .setColor("#ff0011")
      .addField("ID:", `${Pcount[message.guild.id].KC}`)
      .addField("**User**", `${kUser}`, true)
      .addField("**Moderator**", `<@${message.author.id}>`, true)
      .addField("**Reason**", kReason)
      .setTimestamp(new Date);

      const uembed = new Discord.RichEmbed()
      .setTitle("**__DanBot Kick__**")
      .setColor("#ff0000")
      .setDescription(`You got kicked from **${message.guild.name}**`)
      .addField("Moderator:", message.author.tag)
      .addField("Reason:", kReason)
      .setTimestamp(new Date);

if(!Pcount[message.guild.id]) Pcount[message.guild.id] = {
  KC: 0,
  BC: 0
}


      Pcount[message.guild.id].KC ++;
      Pcount.KC ++;
      fs.writeFile("./datajsons/Pcount.json", JSON.stringify(Pcount), (err) => {
         if (err) console.log(err)
       });

      let kickChannel = message.guild.channels.find(`name`, `${settings.modLogChannel}`);
      var server = message.guild;
      if(!kickChannel) return message.channel.send(`Cant find the channel: ${settings.modLogChannel}`);

      message.guild.member(kUser).send({embed: uembed})
      message.guild.member(kUser).kick(kReason);
      kickChannel.send(kickEmbed);

      return;
      }
      exports.conf = {
            enabled: true,
            guildOnly: true,
            aliases: [],
            permLevel: "Moderator"
          };
          
          exports.help = {
            name: "kick",
            category: "Admin Commands",
            description: "Kicks a user",
            usage: "kick @user reason"
          };