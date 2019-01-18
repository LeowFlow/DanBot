const Discord = require("discord.js");
const { promisify } = require("util");
const readdir = promisify(require("fs").readdir);
const Enmap = require("enmap");
const client = new Discord.Client();
client.config = require("../config.js");
client.logger = require("./modules/Logger");
require("./modules/functions.js")(client);
client.commands = new Enmap();
client.aliases = new Enmap();
client.settings = new Enmap({name: "settings"});
//Case Numbers
const sql = require("sqlite3")
const db = new sql.Database('./database.db');

//Loads Commands
const init = async () => {
  const cmdFiles = await readdir("./commands/");
  const cmdlength = cmdFiles.length;
  client.logger.log(`Loading a total of ${cmdFiles.length} commands.`);
  cmdFiles.forEach(f => {
    if (!f.endsWith(".js")) return;
    const response = client.loadCommand(f);
    if (response) console.log(response);
  });
//Loads Events
  const evtFiles = await readdir("./events/");
  client.logger.log(`Loading a total of ${evtFiles.length} events.`);
  evtFiles.forEach(file => {
    const eventName = file.split(".")[0];
    client.logger.log(`Loading Event: ${eventName}`);
    const event = require(`./events/${file}`);
    client.on(eventName, event.bind(null, client));
  });
//Sets Perm Levels
  client.levelCache = {};
  for (let i = 0; i < client.config.permLevels.length; i++) {
    const thisLevel = client.config.permLevels[i];
    client.levelCache[thisLevel.name] = thisLevel.level;
  }

//Logs In With Token
  client.login(client.config.token);
};

init();
const { Client, Util, MessageEmbed, Collection } = require('discord.js');
const YouTube = require('simple-youtube-api');
const ytdl = require('ytdl-core');
const youtube = new YouTube(client.config.ytKey);

const queue = new Collection();
client.queue = queue;

exports.handleVideo = handleVideo;
exports.queue = queue;
exports.youtube = youtube;

async function handleVideo(video, msg, voiceChannel, playlist = false) {
	if (video.durationSeconds === 0) {
			msg.channel.send({embed: { color: 0xFF0000, description: `**${msg.author.username}**, you can't play live streams.`}});

			return undefined;
		}
	const serverQueue = client.queue.get(msg.guild.id);
	//console.log(video)
	const song = {
    id: video.id,
    title: Util.escapeMarkdown(video.title),
    url: `https://www.youtube.com/watch?v=${video.id}`, 
    durationmm: video.durationSeconds ? video.durationSeconds : video.duration / 1000,
    channel: msg.member.voice.channel.name,
    uploadedby: video.channel.title, 
    channelurl: `https://www.youtube.com/channel/${video.channel.id}`,
    author: msg.author,
    durationh: video.duration.hours,
    durationm: video.duration.minutes,
    durations: video.duration.seconds, 
    duration: video.duration,
};
	if (!serverQueue) {
		const queueConstruct = {
			textChannel: msg.channel,
			voiceChannel: voiceChannel,
			connection: null,
			songs: [],
			volume: 100,
			playing: true,
            loop: false, 
		};
		client.queue.set(msg.guild.id, queueConstruct);
        let m = await queueConstruct.textChannel.send(':grin:  | Music servers are expensive! But you can help out: https://paypal.me/danielpmc');
        setTimeout(() => { m.delete() }, 40000); 
		queueConstruct.songs.push(song);

		try {
			var connection = await voiceChannel.join();
			connection.sendVoiceStateUpdate({self_deaf:true});
			queueConstruct.connection = connection;
			play(msg.guild, queueConstruct.songs[0])
		} catch (error) {
			console.error(`I could not join the voice channel: ${error}`);
			client.queue.delete(msg.guild.id);
			return msg.channel.send({ embed: { color: 0xf91d1d, description: `I could not join the voice channel: ${error}`}});
		}
	} else {
		if (serverQueue.songs.some(song => song.id === video.id)) {				
        msg.channel.send({embed: { color: 0xFF0000, description: `**${Util.escapeMarkdown(video.title)}** is already queued.`}});			
        return;
    }
		serverQueue.songs.push(song);
		console.log(serverQueue.songs) 
		if (playlist) return undefined;
  
var adedembed = new MessageEmbed() 

  .setColor('RANDOM')
  .setAuthor(`✅ Added to Queue:`)
  .setThumbnail(`https://i.ytimg.com/vi/${song.id}/default.jpg?width=80&height=60`)
  .setTitle(`${song.title}`, song.url)
  .addField("Duration:", `${require('./util.js').timeString(song.durationmm)}`, true)
  .addField('<:YouTubeicon:501663319128670209> Uploaded by:', `[${song.uploadedby}](${song.channelurl})`, true)
  .setFooter(`Request by: ${song.author.tag}`)
  .setTimestamp();
		
 return msg.channel.send(adedembed);
	}
	return undefined;
}

function play(guild, song, msg) {
	const serverQueue = client.queue.get(guild.id);
	if (!song) {
		serverQueue.textChannel.send({embed: { color: 0xFF0000, description: 'We\'ve run out of songs! Better queue up some more tunes.'}});
		serverQueue.voiceChannel.leave();
		client.queue.delete(guild.id);
		return;
	}
	console.log(serverQueue.songs) 

	const dispatcher = serverQueue.connection.play(ytdl(song.url, { quality: 'highestaudio' }))
		.on('end', reason => {
			if (reason === 'Stream is not generating quickly enough.') console.log('Song ended.');
			else console.log(reason);
			const shifed = serverQueue.songs.shift();
      if(serverQueue.loop) serverQueue.songs.push(shifed);
			play(guild, serverQueue.songs[0]);
		})
		.on('error', error => console.error(error));
	dispatcher.setVolumeLogarithmic(serverQueue.volume / 100);

var pleyembed = new MessageEmbed() 

  .setColor('RANDOM')
  .setAuthor(`🎶 Start Playing:`)
  .setThumbnail(`https://i.ytimg.com/vi/${song.id}/default.jpg?width=80&height=60`)
  .setTitle(`${song.title}`, song.url)
  .addField("Duration:", `${require('./util.js').timeString(song.durationmm)}`, true)
  .addField('<:YouTubeicon:501663319128670209> Uploaded by:', `[${song.uploadedby}](${song.channelurl})`, true)
  .setFooter("If you can't hear the music, please reconnect. If you still can't hear maybe the bot is restarting!")
  .setTimestamp();

	serverQueue.textChannel.send(pleyembed);

}