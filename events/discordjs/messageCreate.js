const path = require("path")
module.exports = {
  name: "messageCreate",
  async execute(message){
    const client = message.client
    if (message.author.bot || !message.guild) return;
    if (!message.mentions.has(message.client.user)) return;
    if (!message.content.includes(client.user.id)) return;
    if(!message.member.voice.channel) return message.reply("Join a VC First");
    try {
      client.discordTogether.createTogetherCode(message.member.voice.channel.id, 'youtube').then(async invite => {
        const youtubeEmbed = new Discord.MessageEmbed()
          .setTitle(`Click To Start`)
          .setDescription('Note: It Doesnt Work On Phone')
          .setURL(`${invite.code}`)
          .setFooter('YouTube', 'https://logos-world.net/wp-content/uploads/2020/04/YouTube-Emblem.png')
          .setColor('#fc0320')
        return message.channel.send({ embeds: [youtubeEmbed] }).catch(console.error);
      });
    } catch (e) {
      console.error(e)
      message.channel.send(`Error: \`${e}\``)
  }
  },
}
