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


      //let bUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
      let bUser = message.mentions.users.first();
      let bReason = args.slice(1).join(" ")
      if(!bUser) return message.channel.send("Can't find that user!");
      if(!bUser) return message.channel.send("Please mention someone to ban!");
      if(bReason.length < 1) return message.reply("Please provide a reason for this ban.")
      //let bReason = args.join(" ").slice(22);

      message.delete()
      message.channel.send(`Banned ${bUser} for ${bReason}. <@${message.author.id}>`)
      let banEmbed = new Discord.RichEmbed()
      .setDescription("**__DanBot - New Ban!__**")
      .setColor("#ff0011")
      .addField("ID:", `${Pcount[message.guild.id].BC}`)
      .addField("**User**", `${bUser}`, true)
      .addField("**Moderator**", `<@${message.author.id}>`, true)
      .addField("**Reason**", bReason)
      .setTimestamp(new Date);

      const uembed = new Discord.RichEmbed()
      .setTitle("**__DanBot Ban__**")
      .setColor("#ff0000")
      .setDescription(`You got banned from **${message.guild.name}**`)
      .addField("Moderator:", message.author.tag)
      .addField("Reason:", bReason)
      .setTimestamp(new Date);

if(!Pcount[message.guild.id]) Pcount[message.guild.id] = {
  KC: 0,
  BC: 0
}


      Pcount[message.guild.id].BC ++;
      Pcount.BC ++;
      fs.writeFile("./datajsons/Pcount.json", JSON.stringify(Pcount), (err) => {
         if (err) console.log(err)
       });

      let banChannel = message.guild.channels.find(`name`, `${settings.modLogChannel}`);
      var server = message.guild;
      if(!banChannel) return message.channel.send(`Cant find the channel: ${settings.modLogChannel}`);

      message.guild.member(bUser).send({embed: uembed})
      message.guild.member(bUser).ban(bReason);
      banChannel.send(banEmbed);

      return;
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
