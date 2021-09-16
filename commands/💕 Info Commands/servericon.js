const Discord = require('discord.js');
const config = require('../../config.json');

module.exports = {
    
    name: "servericon",
    aliases: ["guildicon", "svicon"],
    description: "🎉\`Hiển thị avtar của server\`",
    category: "Info",
    usage: "!icon",

    run: async (client, message, args) => {
        
        const embed = new Discord.MessageEmbed()

        .setTitle(`AVARTAR CỦA ${message.guild.name}`)
        .setImage(message.guild.iconURL({ dynamic: true, size: 1024 }))
        .setFooter(`Matcha Synthetic | yêu cầu bởi: ${message.member.displayName}`,  message.author.displayAvatarURL({ dynamic: true }))
        .setTimestamp()
        .setColor(message.guild.me.displayHexColor)

        message.channel.send(embed)
    }
}
