const Discord = require('discord.js');
const fetch = require('node-fetch');
const emoji = require('../../assets/json/emoji.json');
const config = require('../../config.json');

module.exports = {
    name: "koala",
    aliases:["kola"],
    category: "convat",
    description: "\`spam ảnh về gấu koala\`",
    usage:"!koala",

    run: async (client, message, args) => {

    const res = await fetch('https://some-random-api.ml/img/koala');
    const img = (await res.json()).link;

    const embed = new Discord.MessageEmbed()
    .setTitle(`${emoji.Koala} GẤU KOALA ${emoji.Koala}`)
    .setImage(img)
    .setFooter(`Matcha Synthetic | được yêu cầu bởi: ${message.member.displayName}`,  message.author.displayAvatarURL({ dynamic: true }))
    .setTimestamp()
    .setColor(message.guild.me.displayHexColor);
    message.channel.send(embed);
  }
}
