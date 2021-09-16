module.exports = {
    name: "slowmode",
    description: "\`Bật chế độ làm chậm cho 1 kênh cụ thể\`",
    run: async(client, message, args) => {
        if(!message.member.hasPermission("ADMINISTRATOR")) {
            return message.reply("\`Bạn không có quyền để sử dụng lệnh này\`")
        }
        let duration = args[0]
        if(isNaN(duration)) return message.reply("\`Vui lòng cho biết thời gian tính bằng giây\`")
        let reason = args.slice(1).join(" ")
        if(!reason) return message.reply("\`Vui lòng nêu rõ lý do\`")
        
        message.channel.setRateLimitPerUser(duration, reason)
        message.reply(`\`Đặt thành công chế độ làm chậm\` ${duration} \`giây với Lý do\` - ${reason}`)
    }
}
