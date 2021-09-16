const Discord = require('discord.js');
const emoji = require('../../assets/json/emoji.json');
const config = require('../../config.json');
const log = require('../../assets/json/channels.json');

module.exports = {
    name: "baocao",
    category: "channell",
    description: "\`Nhận báo cáo về lỗi của BÓT mà bạn ghặp phải\`",
    usage:"!baocao ( lỗi mà bạn ghặp phải )",

    run: async (client, message, args) => {
        
        const Channel = client.channels.cache.get(log.Report);

        if(!args[0])
        return message.reply(`Bạn có lỗi gì cần phải báo cáo**\`${config.Prefix}baocao [Your report]\`**`)

        let report = message.content.slice(message.content.indexOf(args[0]), message.content.length);

        const embed = new Discord.MessageEmbed()
        .setTitle('__BÁO LỖI LỆNH__')
        .setThumbnail(message.author.displayAvatarURL({ dynamic: true, size: 1024 }))
        .setDescription(report)
        .addField('TÊN + ID', `\`${message.member.user.tag}\` | \`${message.member.id}\``)
        .addField('TÊN SERVER', `\`${message.guild.name}\` | \`${message.guild.id}\``)
        .setTimestamp()
        .setColor(message.guild.me.displayHexColor);

        Channel.send(embed)

        await message.channel.send(`💯\`Đã gửi báo cáo lỗi cho Matcha Synthetic\``)
    }
}
