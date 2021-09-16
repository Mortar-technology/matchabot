const Discord = require('discord.js');
const fetch = require('node-fetch');
const config = require('../../config.json');

module.exports = {
    name: "kangaroo",
    aliases:["gautui"],
    category: "Animals",
    description: "\`Spam ảnh mấy con kangaroo lực điền\`",
    usage: ".gautui",

    run: async (client, message, args) => {

    const res = await fetch('https://some-random-api.ml/img/kangaroo');
    const img = (await res.json()).link;

    const embed = new Discord.MessageEmbed()
    .setTitle(`🦘 GẤU TÚI 🦘`)
    .setImage(img)
    .setFooter(`Matcha Synthetic | được yêu cầu bởi: ${message.member.displayName}`,  message.author.displayAvatarURL({ dynamic: true }))
    .setTimestamp()
    .setColor(message.guild.me.displayHexColor);
    message.channel.send(embed);
  }
}
