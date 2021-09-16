const Discord = require('discord.js')
const config = require('../../config.json')
const emoji = require('../../assets/json/emoji.json');
const rgx = /^(?:<@!?)?(\d+)>?$/;

module.exports = {
  name: "leaveserver",
  aliases: ["leaveguild", "ls"],
  description: "\`Bot rời khỏi máy chủ nhưng nó chỉ dành cho Owner của tôi\`",
  usage:".leaveserver [guildID]",
  category: "Developer",

  run: async (client, message, args) => {

    if (message.author.id !== config.Owner) {
    return;
    }

    const guildId = args[0] || message.guild;
    if (!rgx.test(guildId))
    return;

    const guild = message.client.guilds.cache.get(guildId);

    if (!guild) return;
    await guild.leave();

    await message.channel.send(`rời khỏi server **\`${guild.name}\`** with **\`${guild.memberCount}\`** Users👋`);

  }
}
