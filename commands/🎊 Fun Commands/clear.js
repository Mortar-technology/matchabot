const emoji = require('../../assets/json/emoji.json');
const config = require('../../config.json');

module.exports = {
    name: "clear",
    aliases: ["purge", "nuke", "clean"],
    category: "fun",
    description: "Clears the chat",
    usage:"!clear ( số tìn nhắn muốn xoá )",
    
    run: async (client, message, args) => {

        const perms = ["MANAGE_MESSAGES" || "ADMINSTRATOR"]

        if (message.deletable) {
            message.delete();
        }
    
        if (!message.member.hasPermission(perms)) {
            return message.reply(`❌ \`Không có quyền mà cứ đòi xóa tin nhắn của người khác là sao?\``)
            .then(msg => {
                msg.delete({ timeout: 15000 })
              })
        }

        if (!message.guild.me.hasPermission(perms)) {
            return message.reply(`❌ \`Tôi thiếu quyền\``)
            .then(msg => {
                msg.delete({ timeout: 15000 })
              })
        }

        if (isNaN(args[0]) || parseInt(args[0]) <= 0) {
            return message.reply(`\`Vui lòng cung cấp số từ 1 => 100 để tiến hành xóa\``)
            .then(msg => {
                msg.delete({ timeout: 15000 })
              })
        }

        if (parseInt(args[0]) > 100) 
        return message.reply('\`Không thể xóa hơn 100 tin nhắn cùng 1 lúc\`')
        .then(msg => {
            msg.delete({ timeout: 15000 })
        })

        let deleteAmount = parseInt(args[0]);  

        message.channel.bulkDelete(deleteAmount, true)
            .then(deleted => message.channel.send(`❌ \`ĐÃ XOÁ ${deleted.size} TIN NHẮN THEO YÊU CẦU CỦA BẠN\``))
            .then(msg => {
                msg.delete({ timeout: 3000 })
              })
            
    }
}
