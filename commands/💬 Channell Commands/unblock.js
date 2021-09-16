const { MessageEmbed } = require("discord.js")
module.exports = {
    name: "unlock",
    description: "\`Mở khoá kênh với 1 role cụ thể\`",
    run: async(client, message, args) => {
        if(!message.member.hasPermission("MANAGE_CHANNELS")) return message.reply("\`Bạn không có quyền để sử dụng lệnh\`")
        const channel = message.mentions.channels.first()
        if(!channel) return message.reply("\`Hãy đề cập đến một kênh hợp lệ!\`")
        const roletofind = args.slice(1).join(" ")
        const role = message.guild.roles.cache.find(r => r.id === roletofind)
        if(!role) return message.reply("\`Vui lòng cung cấp một id vai trò hợp lệ!\`")
        let embed = new MessageEmbed()
        .setTitle("Mở role channel")
        .setDescription(`\`Người mở role:\`${message.author.tag}`)
        .setTimestamp()
        channel.updateOverwrite(role, {
            SEND_MESSAGES: true
        })
        await channel.send(embed)
    }
}
