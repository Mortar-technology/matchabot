const Discord = require('discord.js');
const fetch = require('node-fetch');
const config = require('../../config.json');

module.exports = {
    name: "gaumeo",
    category: "convat",
    description: "\`Spam ảnh con gấu mèo bố đời\`",
    usage: ".gaumeo",

    run: async (client, message, args) => {

    const res = await fetch('https://some-random-api.ml/img/racoon');
    const img = (await res.json()).link;

    const embed = new Discord.MessageEmbed()
    .setTitle(`🦝 GẤU MÈO 🦝`)
    .setImage(img)
    .setFooter(`Matcha Synthetic | được yêu cầu bởi: ${message.member.displayName}`,  message.author.displayAvatarURL({ dynamic: true }))
    .setTimestamp()
    .setColor(message.guild.me.displayHexColor);
    message.channel.send(embed);
  }
}
