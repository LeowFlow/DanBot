const Discord = require("discord.js");
const ping = require('node-http-ping')
var datetime = require('node-datetime');
const Canvas = require('canvas')
exports.run = async (client, message, args, color) => {


    const canvas = Canvas.createCanvas(700, 250);
    const ctx = canvas.getContext('2d');
    const background = await Canvas.loadImage('./images/background.jpg');
    ctx.drawImage(background, 0, 0, canvas.width, canvas.height);
  
    ctx.strokeStyle = '#74037b';
    ctx.strokeRect(0, 0, canvas.width, canvas.height);
  
    ctx.font = '28px sans-serif';
    ctx.fillStyle = '#ffffff';
    ctx.fillText('Pong,', canvas.width / 2.5, canvas.height / 3.5);
  
    ctx.font.basic = applyText(canvas, `Latency: ${new Date().getTime() - message.createdTimestamp} ms`);
    ctx.fillStyle = '#ffffff';
    ctx.fillText(`API: ${API}ms`, canvas.width / 2.5, canvas.height / 1.8);
  
    ctx.beginPath();
    ctx.arc(125, 125, 100, 0, Math.PI * 2, true);
    ctx.closePath();
    ctx.clip();
  
    const { body: buffer } = await snekfetch.get(member.user.displayAvatarURL);
    const avatar = await Canvas.loadImage(buffer);
    ctx.drawImage(avatar, 25, 25, 200, 200);
  
    const attachment = new Discord.Attachment(canvas.toBuffer(), 'PONG.png');
  
    channel.send(`PONG!!`, attachment);  

};exports.conf = {
    enabled: true,
    guildOnly: true,
    aliases: [],
    permLevel: "User"
  };
  exports.help = {
    name: "ping",
    category: "Info Commands",
    description: "Ping in MS",
    usage: "ping"
  };
