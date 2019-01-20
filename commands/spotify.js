const Discord = require('discord.js');
exports.run = (client, message, args) => {
  let user = message.mentions.users.first() || message.author; 
  if (user.presence.activity !== null && user.presence.activity === 'SPOTIFY' && user.presence.activity.name === 'Spotify' && user.presence.activity.assets !== null) {
    let trackIMG = `https://i.scdn.co/image/${user.presence.activity.assets.largeImage.slice(8)}`;
    let trackURL = `https://open.spotify.com/track/${user.presence.activity.syncID}`;
    let trackName = user.presence.activity.details;
    let trackAuthor = user.presence.activity.state;
    let trackAlbum = user.presence.activity.assets.largeText;
    const embed = new Discord.MessageEmbed()
      .setAuthor('Spotify Track Info', 'https://cdn.discordapp.com/emojis/408668371039682560.png')
      .setColor(random)
      .setThumbnail(trackIMG)
      .addField('Song Name', trackName, true)
      .addField('Album', trackAlbum, true)
      .addField('Author', trackAuthor, false)
      .addField('Listen to Track:', `[\`${trackURL}\`](trackURL)`, false);
    message.channel.send(embed);
  } else {
    message.channel.send('**This user isn\'t listening to Spotify!**');
  }
};

exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: [],
    permLevel: "User"
  };
  
  exports.help = {
    name: "spotify",
    category: "Info Commands",
    description: "Gives some info on spotify for who ever the user you tagged",
    usage: "spotify @user"
  };