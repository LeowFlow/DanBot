const Discord = require("discord.js")
const client = new Discord.Client();
const activities_list = [
    "Need help? !help", 
    "Any Bugs or problems? DM: 𝓭𝓪𝓷𝓲𝓮𝓵𝓹𝓶𝓬#0666",
    "Tons of new updates coming!",
    "Need To Change Prefix? !settings"
    ];
    const moment = require("moment");
module.exports = async client => {
    client.appInfo = await client.fetchApplication();
    setInterval( async () => {
      client.appInfo = await client.fetchApplication();
    }, 60000);
    require("../modules/dashboard")(client); 
    const timestamp = `[${moment().format("YYYY-MM-DD HH:mm:ss")}]:`;
    console.log(`${timestamp} ${client.user.tag}, ${client.guilds.reduce((p, c) => p + c.memberCount, 0)} users, in ${client.channels.size} channels of ${client.guilds.size} servers.`);
    //client.user.setUsername('Danbot')
    setInterval(() => {
      const index = Math.floor(Math.random() * (activities_list.length - 1) + 1); 
      client.user.setActivity(activities_list[index]); 
  }, 10000);
};
