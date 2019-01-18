exports.run = (client, message) => {
	message.author.send({
		embed: {
			author: { name: `Make a donation!` },
			description: `
Hi i'm danielpmc the owner of DanBot!
Maintaining this bot is not free, I need to pay the server, the domain for the website.
I do not want to be paid to code, i just need money to maintain my bot.\nIf you want to support me and DanBot. Please donate using paypal.
Thank You for using DanBot
All the donations are used for System and for improve it. 
All donations above 1$ i will give something back like the donators perm level on DanBot where you will soon have access to commands that normal users wont.
And you will be on !donators


[Paypal](https://www.paypal.me/danielpmc)`,
			color: 0xFFFFFF
		}
	});
	message.channel.send(":white_check_mark: I have sent my donation information to you through Direct Messages.");
};

              exports.conf = {
                enabled: true,
                guildOnly: true,
                aliases: [],
                permLevel: "User"
              };
              exports.help = {
                name: "donate",
                category: "Info Commands",
                description: "Donate for a donation perm with access to new commands!",
                usage: "donate"
              };