const Discord = require('discord.js')
module.exports.run = async (client, message, args) => {
    if (!message.member.hasPermission("MANAGE_MESSAGES")) return message.reply("Sorry, but you can't do that!");
    const filter = m => m.author.id === message.author.id;

    let suggestionchannel = message.guild.channels.find(`id`, "527914596552409088");
    message.channel.send("Who's Suggeston is it ?").then((message2) => {
        message2.channel.awaitMessages(filter, {
            max: 1, 
            time: 20000,
            errors: ['time'],
        }).then((collected1) => {
            if (collected1.first().content === 'cancel') {
                message.channel.bulkDelete(3)
                return message.reply("Canceled.").then(q => q.delete(5000))
        }
            message2.channel.send("", {
                embed: new Discord.RichEmbed()
                    .setColor(0x36393e)
                    .setDescription(`Suggestion by :**${collected1.first().content}**\n What is the suggestion content ?`)
                    .setFooter("You can type 'cancel' to cancel the request")
                 }).then((message3) => {
                    message3.channel.awaitMessages(filter, {
                        max: 1, 
                        time: 20000,
                        errors: ['time'],
                    }).then((collected2) => {
                        if (collected2.first().content === 'cancel') {
                            message.channel.bulkDelete(3)
                            return message.reply("Canceled.").then(q => q.delete(5000))
                    }
                        message3.channel.send("", {
                            embed: new Discord.RichEmbed()
                                .setColor(0x36393e)
                                .setDescription(`Suggestion by :**${collected1.first().content}**\n suggestion content:**${collected2.first().content}** `)
                                .setFooter("You can type 'cancel' to cancel the request")
                             })
                             suggestionchannel.send("", {
                               embed: new Discord.RichEmbed()
                                .setTitle("New Suggestion")
                                .setDescription(`Suggestion From: **${collected1.first().content}**`)
                                .addField("Suggestion Content:", `**${collected2.first().content}**`)
                                .setTimestamp()
                             }).then(x => {
                                const filter2 = (reaction, user) => reaction.emoji.name === '👎' && reaction.emoji.name === '👍' && user.id !== `${client.user.id}`
                                 x.react("👎")
                                 x.react("👍")
                                 x.awaitReactions(filter2, {
                                    time: 172800000 
                                })
                                .then(collected => {
                                    const users1 = x.reactions.get("👎").users;
                                    const users2 = x.reactions.get("👍").users;
                                    const list1 = users1.array().filter(u => u.id !== client.user.id);
                                    const list2 = users2.array().filter(u => u.id !== client.user.id);
                                x.edit("", {
                               embed: new Discord.RichEmbed()
                                .setTitle("New Suggestion")
                                .setDescription(`Suggestion From: **${collected1.first().content}**`)
                                .addField("Suggestion Content:", `**${collected2.first().content}**`)
                                .addField("Results:", `${list2.length} 👍 || ${list1.length} 👎`)
                                .setTimestamp()

                                })
                                })
                             })
                         })
                 })
             })
        })
    };

    exports.conf = {
        enabled: true,
        guildOnly: true,
        aliases: [],
        permLevel: "Bot Owner"
    };
    
    exports.help = {
        name: "suggestionvote",
        category: "Bot Staff Commands",
        description: "Suggestion vote.",
        usage: "suggestionvote"
    };