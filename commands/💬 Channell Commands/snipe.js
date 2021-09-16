const Discord = require('discord.js');
const config = require('../../config.json');

module.exports = {
    name: "snipe",
    category: "channell",
    description: "\`Xem lại tin nhắn đã xoá gần đây nhất\`",
    usage: "!snipe",

    run: async (client, message, args) => {

        try {

            const msg = client.snipes.get(message.channel.id)

            const embed = new Discord.MessageEmbed()
    
            .setTitle('MESSAGE DELETE')
            .setAuthor(msg.author.tag, msg.author.displayAvatarURL({ dynamic: true }))
            .addField('Nội dung đã xoá', msg.content)
            .addField('Người Xoá', `<@${msg.author.id}> (\`${msg.author.tag}\`)`)
            .setFooter(`Matcha Synthetic | yêu cầu bởi: ${message.author.username}`, message.author.displayAvatarURL({ dynamic: true }))
            .setTimestamp()
    
            message.channel.send(embed)

        } catch (err) {
            message.reply("❌\`Tôi không đọc được tin nhắn đó\`")
        }
    } 
    
}
