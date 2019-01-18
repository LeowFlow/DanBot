const request = require('request');
exports.run = (client, message, args) => {
  var r = request.get('https://api.thedogapi.com/api/images/get.php/', function(err, res, body) {
     if (err) {
      message.channel.send("Dog API Offline :(");
      return;
     }
     message.channel.sendFile(r.uri.href);
    });
}

exports.conf = { 
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: "User"
};

exports.help = {
  name: "dog",
  category: "Animal Commands",
  description: "Post a random image of a dog",
  usage: "dog"
};