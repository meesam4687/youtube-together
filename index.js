const Discord = require("discord.js");
const { DiscordTogether } = require('discord-together');
const client = new Discord.Client({ intents: ['GUILDS', 'GUILD_VOICE_STATES', 'GUILD_MESSAGES', 'DIRECT_MESSAGES', 'GUILD_BANS', 'GUILD_EMOJIS_AND_STICKERS', 'GUILD_MEMBERS', 'GUILD_MESSAGE_REACTIONS', 'GUILD_INTEGRATIONS', 'GUILD_PRESENCES', 'GUILD_SCHEDULED_EVENTS', 'DIRECT_MESSAGE_TYPING', 'GUILD_INVITES'], allowedMentions: { parse: ['users'], repliedUser: true } });
const fs = require("fs");
client.discordTogether = new DiscordTogether(client)

const events = fs.readdirSync('./events/discordjs').filter(file => file.endsWith('.js'));

for (const file of events) {
  const events = require(`./events/discordjs/${file}`);
  if (events.once) {
    client.once(events.name, (...args) => events.execute(...args));
  } else {
    client.on(events.name, (...args) => events.execute(...args));
  }
}

client.login(process.env.TOKEN)