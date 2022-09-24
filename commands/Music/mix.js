  const {
	MessageEmbed,
	Message
} = require("discord.js");
const config = require("../../botconfig/config.json");
const ee = require("../../botconfig/embed.json");
const settings = require("../../botconfig/settings.json");
module.exports = {
	name: "mix", //the command name for the Slash Command

	category: "Music",
	aliases: ["musicmix", "playmix", "playlist", "playmusicmix"],
	usage: "mix [MIXNAME]",

	description: "Plays a defined Mix", //the command description for Slash Command Overview
	cooldown: 2,
	requiredroles: [], //Only allow specific Users with a Role to execute a Command [OPTIONAL]
	alloweduserids: [], //Only allow specific Users to execute a Command [OPTIONAL]

	run: async (client, message, args) => {
		try {
			//things u can directly access in an interaction!
			const {
				member,
				channelId,
				guildId,
				applicationId,
				commandName,
				deferred,
				replied,
				ephemeral,
				options,
				id,
				createdTimestamp
			} = message;
			const {
				guild
			} = member;
			const {
				channel
			} = member.voice;
			if (!channel) return message.reply({
				embeds: [
					new MessageEmbed().setColor(ee.wrongcolor).setTitle(`${client.allEmojis.x} **Please join ${guild.me.voice.channel ? "__my__" : "a"} VoiceChannel First!**`)
				],

			})
			if (channel.userLimit != 0 && channel.full)
				return message.reply({
					embeds: [new MessageEmbed()
						.setColor(ee.wrongcolor)
						.setFooter(ee.footertext, ee.footericon)
						.setTitle(`<:declined:780403017160982538> Your Voice Channel is full, I can't join!`)
					],
				});
			if (channel.guild.me.voice.channel && channel.guild.me.voice.channel.id != channel.id) {
				return message.reply({
					embeds: [new MessageEmbed()
						.setColor(ee.wrongcolor)
						.setFooter(ee.footertext, ee.footericon)
						.setTitle(`<:declined:780403017160982538> I am already connected somewhere else`)
					],
				});
			}

			let link = "https://open.spotify.com/playlist/5aDoTO9WYWOarATKGOXZCE?si=c62870c11ebb4a6a";
			if (args[0]) {
				//s3rl ^^
				if (args[0].toLowerCase().startsWith("s")) link = "https://open.spotify.com/playlist/33bAZZH0tlsjUOMtTnUlaK?si=288a4e16a9bd428b";
				//Sleep Kogo ^^
				if (args[0].toLowerCase().startsWith("a")) link = "https://open.spotify.com/playlist/37i9dQZF1DXbirtHQBuwCo?si=99bcf16ed37b49d3";
				//Aiguyah ^^
				if (args[0].toLowerCase().startsWith("mb")) link = "https://open.spotify.com/playlist/6XRa3UO1HsgE1PaH1Srb4z?si=f81b22cd11f546b6";
				//melodic banger ^^
				if (args[0].toLowerCase().startsWith("hb")) link = "https://open.spotify.com/playlist/1Loix17mMCS6xQCSmDllzG?si=f291043998c5466a";
				//hardbass ^^
				if (args[0].toLowerCase().startsWith("r")) link = "https://open.spotify.com/playlist/5qRPWR8caR62bH8R6ICDEy";
				//red ^^
				if (args[0].toLowerCase().startsWith("mka")) link = "https://open.spotify.com/playlist/7xTiBDLuAiE9bSQ8XeFSrW?si=c3f48e395a5b4e47";
				//maika 
				if (args[0].toLowerCase().startsWith("asd")) link = "https://open.spotify.com/playlist/2SKsJpMmILQkikXG1RelWP?si=03012a5794394435";
				//gilo
				if (args[0].toLowerCase().startsWith("asdasd")) link = "https://open.spotify.com/playlist/1zOq9yGNsQ8ZGOrAJ8B6Ef?si=f6fca32a2f4e4c62";
				//gilo2
				if (args[0].toLowerCase().startsWith("mka1")) link = "https://www.youtube.com/playlist?list=PLgermon1lM3CpgljkDR8ffMs_JrQ_5_Yn";
				//maika2
        if (args[0].toLowerCase().startsWith("weeb")) link = "https://www.youtube.com/playlist?list=PL2YA1TDAlCTG6WGSOckTirFosFK20H90F";
				//ian
				//if (args[0].toLowerCase().startsWith("s")) link = "";
				//magic-release
				//if (args[0].toLowerCase().startsWith("ma")) link = "";
				//metal
				//if (args[0].toLowerCase().startsWith("me")) link = "";
				//heavy metal
				//if (args[0].toLowerCase().startsWith("h")) link = "";
			}
			let newMsg = await message.reply({
				content: `${client.allEmojis.loading} Loading the **'${args[0] ? args[0] : "Default"}' Music Mix**`,
			});
			try {
				let queue = client.distube.getQueue(guildId)
				let options = {
					member: member,
				}
				if (!queue) options.textChannel = guild.channels.cache.get(channelId)
				await client.distube.playVoiceChannel(channel, link, options)
				//Edit the reply
				newMsg.edit({
					content: `${queue?.songs?.length > 0 ? "👍 Loaded" : "🎶 Now Playing"}: the **'${args[0] ? args[0] : "Default"}'**`,
				});
			} catch (e) {
				console.log(e.stack ? e.stack : e)
				message.reply({
					content: `${client.allEmojis.x} | Error: `,
					embeds: [
						new MessageEmbed().setColor(ee.wrongcolor)
						.setDescription(`\`\`\`${e}\`\`\``)
					],

				})
			}
		} catch (e) {
			console.log(String(e.stack).bgRed)
		}
	}
}