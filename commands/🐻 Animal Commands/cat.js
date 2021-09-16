const Discord = require('discord.js');
const fetch = require('node-fetch');
const emoji = require('../../assets/json/emoji.json');
const config = require('../../config.json');

module.exports = {
    name: "cat",
    aliases: ["mèo", "kitty", "pussy"],
    category: "convat",
    description: "\`Spam ảnh về mấy con mồm lèo, chiếc mèo vui tính\`",
    usage: "!mèo",

    run: async (client, message, args) => {

    const res = await fetch('https://some-random-api.ml/img/cat');
    const img = (await res.json()).link;

    const embed = new Discord.MessageEmbed()
    .setTitle("🐈 meow meow 🐈")
    .setImage(img)
    .setFooter(`Matcha Synthetic | được yêu cầu bởi: ${message.member.displayName}`,  message.author.displayAvatarURL({ dynamic: true }))
    .setTimestamp()
    .setColor(message.guild.me.displayHexColor);
    message.channel.send(embed);
  }
}
