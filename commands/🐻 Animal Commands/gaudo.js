const Discord = require('discord.js');
const fetch = require('node-fetch');
const emoji = require('../../assets/json/emoji.json');
const config = require('../../config.json');

module.exports = {
    name: "redpanda",
    aliases: ["gaudo"],
    category: "convat",
    description: "\`Spam hình ảnh Gấu trúc đỏ ngẫu nhiên\`",
    usage: ".gaudo",

    run: async (client, message, args) => {

    const res = await fetch('https://some-random-api.ml/img/red_panda');
    const img = (await res.json()).link;

    const embed = new Discord.MessageEmbed()
    .setTitle("🍀 GẤU TRÚC ĐỎooo 🍀")
    .setImage(img)
    .setFooter(`Matcha Synthetic | được yêu cầu bởi: ${message.member.displayName}`,  message.author.displayAvatarURL({ dynamic: true }))
    .setTimestamp()
    .setColor(message.guild.me.displayHexColor);
    message.channel.send(embed);
  }
}
