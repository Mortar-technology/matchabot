const Discord = require('discord.js');
const config = require('../../config.json');
const emoji = require('../../assets/json/emoji.json');
const fetch = require('node-fetch');

module.exports = {
    name: "shiba",
    category: "Animals",
    description: "\`Spam ảnh chó shiba của nhật bản\`",
    example: `${config.Prefix}shibe`,

    run: async (client, message, args) => {

        try {
            const res = await fetch('http://shibe.online/api/shibes');
            const img = (await res.json())[0];

            const embed = new Discord.MessageEmbed()
            .setTitle(`${emoji.Doggy} 柴犬 ${emoji.Doggy}`)
            .setImage(img)
            .setColor(message.guild.me.displayHexColor)
            .setFooter(`Matcha Synthetic | được yêu cầu bởi: ${message.author.username}`,  message.author.displayAvatarURL({ dynamic: true }))
            .setTimestamp()

            message.channel.send(embed)

        } catch (err) {
            message.reply(`${emoji.Error} \`Không tìm thấy hình ảnh vui lòng thử lại sau vài phút\``)
        }

    }
}
