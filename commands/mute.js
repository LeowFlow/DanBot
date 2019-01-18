const Discord = require("discord.js");
const ms = require("ms");

module.exports.run = async (client, message, args) => {
    const settings = message.settings;
    const defaults = client.config.defaultSettings;
    const overrides = client.settings.get(message.guild.id);
    if (!client.settings.has(message.guild.id)) client.settings.set(message.guild.id, {});


  //!tempmute @user 1s/m/h/d

  let tomute = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
  if(!tomute) return message.reply(`To mute a user ${settings.prefix}mute @user TIMEs/m/h/d Reason`)
  let muterole = message.guild.roles.find(`name`, "muted");
  if(!muterole){
    try{
      muterole = await message.guild.createRole({
        name: "muted",
        color: "#000000",
        permissions:[]
      })
      message.guild.channels.forEach(async (channel, id) => {
        await channel.overwritePermissions(muterole, {
          SEND_MESSAGES: false,
          ADD_REACTIONS: false
        });
      });
    }catch(e){
      console.log(e.stack);
    }
  }
  let mutetime = args[1];
  if(!mutetime) return message.reply("You didn't specify a time!");
  let reason = args[2];
  if(!reason) return message.reply("You didn't specify a reason!")

  await(tomute.addRole(muterole.id));

  message.delete()
  message.channel.send(`Muted <@${tomute.id}> for ${ms(ms(mutetime))}. <@${message.author.id}>`)
  let muteEmbed = new Discord.RichEmbed()
  .setDescription("**__DanBot Mute__**")
  .setColor("#ffbf00")
  .addField("**User**", `<@${tomute.id}>`, true)
  .addField("**Moderator**", `<@${message.author.id}>`, true)
  .addField("**Reason**", `${reason}`, true)
  .addField("**Time**", `${ms(ms(mutetime))}`, true)
  .setTimestamp(new Date);

  let muteChannel = message.guild.channels.find(`name`, `${settings.modLogChannel}`);
  var server = message.guild;
  if(!muteChannel) return message.channel.send(`Cant find the channel: ${settings.modLogChannel}`);

  muteChannel.send(muteEmbed);

  setTimeout(function(){
    tomute.removeRole(muterole.id);
    let unmuteEmbed = new Discord.RichEmbed()
    .setDescription("**__DanBot Unmute__**")
    .setColor("#8db600")
    .addField("**User**", `<@${tomute.id}>`, true)
    .addField("**Moderator**", `<@${message.author.id}>`, true)
    .addField("**Reason**", `Time is up.`)
    .setTimestamp(new Date);
    let muteChannel = message.guild.channels.find(`name`, `${settings.modLogChannel}`);
    var server = message.guild;
    if(!muteChannel) return message.channel.send(`Cant find the channel: ${settings.modLogChannel}`);
    muteChannel.send(unmuteEmbed);
  }, ms(mutetime));
}
exports.conf = {
    enabled: true,
    guildOnly: true,
    aliases: [],
    permLevel: "Administrator"
  };
  
  exports.help = {
    name: "mute",
    category: "Admin Commands",
    description: "Mutes a user",
    usage: "mute @user time reason"
  };