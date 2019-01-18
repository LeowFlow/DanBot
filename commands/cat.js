const request = require('request');
exports.run = (client, message, args) => {
  var r = request.get('http://thecatapi.com/api/images/get.php/', function(err, res, body) {
     if (err) {
      message.channel.send("Cat API Offline :(");
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
  name: "cat",
  category: "Animal Commands",
  description: "Post a random image of a cat",
  usage: "cat"
};