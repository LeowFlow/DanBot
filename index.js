const Discord = require("discord.js");
const { promisify } = require("util");
const readdir = promisify(require("fs").readdir);
const Enmap = require("enmap");
const client = new Discord.Client();
const fs = require('fs');
client.config = require("../config.js");
client.logger = require("./modules/Logger");
require("./modules/functions.js")(client);
client.commands = new Enmap();
client.aliases = new Enmap();
client.settings = new Enmap({name: "settings"});
//Case Numbers
const sql = require("sqlite3")
const db = new sql.Database('./database.db');

client.on("message", async message => {
  let mlb = JSON.parse(fs.readFileSync("./datajsons/messageleaderboard.json", "utf8"));
  // Note for Dan: mlb = messageleaderboard this line ^^ will import the leaderboard 
  if(!mlb[message.author.id]){//this will give us the name, if u want to use the name and the id in the leaderboard(dashboard) msg me ill have to change that line.
     return mlb[message.author.id] ={
          msgs: 1                  //this will start the message cout for this user *ik ur dumb :P so msg = messages*
      }
  }
  mlb[message.author.id].msgs ++;
  fs.writeFile("./datajsons/messageleaderboard.json", JSON.stringify(mlb), (err) => {
   if (err) console.log(err)
 });
})

//Loads Commands
const init = async () => {
  const cmdFiles = await readdir("./commands/");
  const cmdlength = cmdFiles.length;
  client.logger.log(`Loading a total of ${cmdFiles.length} commands.`);
  cmdFiles.forEach(f => {
    if (!f.endsWith(".js")) return;
    const response = client.loadCommand(f);
    if (response) console.log(response);
  });
//Loads Events
  const evtFiles = await readdir("./events/");
  client.logger.log(`Loading a total of ${evtFiles.length} events.`);
  evtFiles.forEach(file => {
    const eventName = file.split(".")[0];
    client.logger.log(`Loading Event: ${eventName}`);
    const event = require(`./events/${file}`);
    client.on(eventName, event.bind(null, client));
  });
//Sets Perm Levels
  client.levelCache = {};
  for (let i = 0; i < client.config.permLevels.length; i++) {
    const thisLevel = client.config.permLevels[i];
    client.levelCache[thisLevel.name] = thisLevel.level;
  }

//Logs In With Token
  client.login(client.config.token);
};
init();