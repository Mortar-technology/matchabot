const Discord = require('discord.js');
const fetch = require('node-fetch');
const emoji = require('../../assets/json/emoji.json');
const config = require('../../config.json');

module.exports = {
    name: "panda",
    aliases: ["gautruc"],
    category: "convat",
    description: "🐼\`Spam ảnh về gấu trúc\`",
    usage:".gautruc",

    run: async (client, message, args) => {

    const res = await fetch('https://some-random-api.ml/img/panda');
    const img = (await res.json()).link;

    const embed = new Discord.MessageEmbed()
    .setTitle("🐼 GẤU TRÚC 🐼")
    .setImage(img)
    .setFooter(`Matcha Synthetic | được yêu cầu bởi: ${message.member.displayName}`,  message.author.displayAvatarURL({ dynamic: true }))
    .setTimestamp()
    .setColor(message.guild.me.displayHexColor);
    message.channel.send(embed);
  }
}
