const Discord = require('discord.js');
const fetch = require('node-fetch');
const emoji = require('../../assets/json/emoji.json');
const config = require('../../config.json');

module.exports = {
  name: "cáo",
  category: "Animals",
  description: "\`Spam ảnh về mấy con cáo 🦊\`",
  usage: ".cáo",

  run: async (client, message, args) => {
        
    const res = await fetch('https://randomfox.ca/floof/');
    const img = (await res.json()).image;
    const embed = new Discord.MessageEmbed()
    .setTitle(`${emoji.Fox} CÁO-CÁO ${emoji.Fox}`)
    .setImage(img)
    .setFooter(`Matcha Synthetic | được yêu cầu bởi: ${message.member.displayName}`,  message.author.displayAvatarURL({ dynamic: true }))
    .setTimestamp()
    .setColor(message.guild.me.displayHexColor);

    message.channel.send(embed);
          
  }   
}   
