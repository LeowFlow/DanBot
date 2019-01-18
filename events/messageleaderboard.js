const fs = require("fs");
module.exports = async (client, message, guild) => {
let mlb = JSON.parse(fs.readFileSync("./datajsons/messageleaderboard.json", "utf8"));
   // Note for Dan: mlb = messageleaderboard this line ^^ will import the leaderboard 
   if(!mlb[message.author.username]){//this will give us the name, if u want to use the name and the id in the leaderboard(dashboard) msg me ill have to change that line.
      return mlb[message.author.username] ={
           ID: message.author.id,   //this will get the userID
           msgs: 1                  //this will start the message cout for this user *ik ur dumb :P so msg = messages*
       }
   }
   mlb[message.author.username].msgs ++;
   fs.writeFile("./datajsons/messageleaderboard.json", JSON.stringify(mlb), (err) => {
    if (err) console.log(err)
  });
};