exports.run = async (client, message, args, level) => {
  const execSync = require('child_process').execSync;
    const code = args.join(" ");
    try {
      const evaled = eval(code);
      const clean = await client.clean(client, evaled);
      const say = message.channel.send()
      message.delete();
      message.channel.send(`\`\`\`js\n${clean}\n\`\`\``);
    } catch (err) {
      message.channel.send(`\`ERROR\` \`\`\`xl\n${await client.clean(client, err)}\n\`\`\``);
    }
  }; 
  
  exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: [],
    permLevel: "Bot Owner"
  };
  
  exports.help = {
    name: "eval",
    category: "Bot Staff Commands",
    description: "Runs what ever i want it to",
    usage: "eval [...code]"
  };