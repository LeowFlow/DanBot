exports.run = async (client, message) => {
}

exports.conf = {
    enabled: true,
    guildOnly: true,
    aliases: [],
    permLevel: "User"
  };
  exports.help = {
    name: "skip",
    category: "Music Commands",
    description: "Skips the currently playing song",
    usage: "skip [number of songs]"
  };