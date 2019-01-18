exports.run = async (client, message) => {
    message.channel.send("(╯°□°)╯  ︵  ┻━┻").then(m => {
        setTimeout(() => {
            m.edit("(╯°□°)╯    ]").then(ms => {
                setTimeout(() => {
                    ms.edit("(°-°)\\ ┬─┬")
                }, 500);
            });
        }, 500);
})}

exports.conf = {
    enabled: true,
    guildOnly: true,
    aliases: [],
    permLevel: "User"
  };
  exports.help = {
    name: "unflip",
    category: "Fun Commands",
    description: "unflip that table!",
    usage: "unflip"
  };