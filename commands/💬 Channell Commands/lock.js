const { MessageEmbed } = require("discord.js")
module.exports = {
    name: "lock",
    description: "\`Khóa một kênh nhất định cho một vai trò cụ thể!\`",
    run: async(client, message, args) => {
        if(!message.member.hasPermission("MANAGE_CHANNELS")) return message.reply("\`Bạn không có đủ quyền hạn để sử dụng lệnh này\`")
        const channel = message.mentions.channels.first()
        if(!channel) return message.reply("\`Hãy đề cập đến một kênh hợp lệ!\`")
        const roletofind = args.slice(1).join(" ")
        const role = message.guild.roles.cache.find(r => r.id === roletofind)
        if(!role) return message.reply("\`Vui lòng cung cấp một id vai trò hợp lệ\`")
        let embed = new MessageEmbed()
        .setTitle("channel locked!")
        .setDescription(`\`Kênh này đã bị khóa bởi:\`${message.author.tag}`)
        .setTimestamp()
        channel.updateOverwrite(role, {
            SEND_MESSAGES: false
        })
        await channel.send(embed)
    }
}
