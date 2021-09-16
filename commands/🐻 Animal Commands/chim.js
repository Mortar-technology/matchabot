const Discord = require('discord.js');
const fetch = require('node-fetch');
const emoji = require('../../assets/json/emoji.json');
const config = require('../../config.json');

module.exports = {
  name: "chim",
  category: "convat",
  aliases: ["birdy", "chirp"],
  description: "\`Spam ảnh về mấy con chim bố đời\`",
  usage: ".chim",

  run: async (client, message, args) => {

    const res = await fetch('http://shibe.online/api/birds');
    const img = (await res.json())[0];
    const embed = new Discord.MessageEmbed()
    .setTitle(`${emoji.Bird} CHIM-CHIM ${emoji.Bird}`)
    .setImage(img)
    .setFooter(`Matcha Synthetic | được yêu cầu bởi: ${message.member.displayName}`,  message.author.displayAvatarURL({ dynamic: true }))
    .setTimestamp()
    .setColor(message.guild.me.displayHexColor);
    message.channel.send(embed);
  } 
}
