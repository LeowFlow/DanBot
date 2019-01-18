exports.run = async (client, message, args, level) => {
    await message.reply("Bot is restarting. :wave:");
    client.commands.forEach( async cmd => {
      await client.unloadCommand(cmd);
    });
    process.exit(1);
  };
  
  exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: [],
    permLevel: "Bot Admin"
  };
  
  exports.help = {
    name: "restart",
    category: "Bot Staff Commands",
    description: "Restarts the bot",
    usage: "restart"
  };