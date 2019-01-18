const Discord = require("discord.js");

module.exports.run = async (client, message, args) => {
    let rMessage = args.join(" ");

    if (!rMessage) return message.channel.send("Specify a message");

    let validLetters = "abcdefghijklmnopqrstuvwxyz".split("");
    let validOther = [["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "!", "?"], ["zero", "one", "two", "three", "four", "five", "six", "seven", "eight", "nine", "grey_exclamation", "grey_question"]];

    let returnMessage = "";
    for (let i = 0; i < rMessage.length; i++) {
        if (validLetters.includes(rMessage[i].toLowerCase())) returnMessage += `:regional_indicator_${rMessage[i].toLowerCase()}:`;
        else if (validOther[0].includes(rMessage[i].toLowerCase())) returnMessage += `\:${validOther[1][validOther[0].join("").indexOf(rMessage[i].toLowerCase())]}:`
        else returnMessage += rMessage[i];
    }

    if (returnMessage.length > 2000) return errors.other(message, "Message is too long (over 2000 characters)");

    message.delete();
    message.channel.send(returnMessage); 
}

exports.conf = {
    enabled: true,
    guildOnly: true,
    aliases: [],
    permLevel: "User"
};

exports.help = {
    name: "emojitext",
    category: "Fun Commands",
    description: "Display a message in emojis",
    usage: "emojitext"
};