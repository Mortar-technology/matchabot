const Discord = require('discord.js');
const emoji = require('../../assets/json/emoji.json');
const config = require('../../config.json');
const log = require('../../assets/json/channels.json');

module.exports = {
    name: "goiy",
    aliases: ["gợi ý", "traodoi"],
    description: "\`Cung cấp cho OWNER 1 gợi ý nho nhỏ\`",
    category: "channell",
    usage:"!goiy ( câu gợi ý cho tôi )",

    run: async(client, message, args) => {

        const Channel = client.channels.cache.get(log.Suggestion);
        
        if(!args[0])
        return message.reply(`Bạn có lệnh hay là commands muốn gợi ý cho tôi **\`${config.Prefix}goiy [ từ ngữ gợi ý]\`**`)

        let suggestion = message.content.slice(message.content.indexOf(args[0]), message.content.length);

        const embed = new Discord.MessageEmbed()
        .setTitle('__GỢI Ý__')
        .setThumbnail(message.author.displayAvatarURL({ dynamic: true, size: 1024 }))
        .setDescription(suggestion)
        .addField('TÊN + ID', `\`${message.member.user.tag}\` | \`${message.member.id}\``)
        .addField('TÊN SERVER', `\`${message.guild.name}\` | \`${message.guild.id}\``)
        .setTimestamp()
        .setColor(message.guild.me.displayHexColor);

        Channel.send(embed)  
        
        await message.channel.send(`💯\`Đã gửi câu lệnh, từ ngữ gợi ý cho Matcha Synthetic\``)
    }
}
