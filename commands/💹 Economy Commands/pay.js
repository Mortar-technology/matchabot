const { MessageEmbed } = require('discord.js')
const db = require('quick.db');

module.exports = {
    name: 'pay',
    description: "Thanh toán cho người khác bằng tiền mặt!",
    usage: "?pay [amount] <mention>",
    run: async(client, message, args) => {

        let user = message.mentions.users.first()
        let amount = args[0]
        let author = message.author;

        if(!user) {
            const payError = new MessageEmbed()
            .setDescription("Bạn cần đề cập đến một người dùng để cung cấp tiền cho")
            .setColor("RANDOM")

            return message.channel.send(payError)
        }
        if(isNaN(args[0])) {
            const payError2 = new MessageEmbed()
            .setDescription("Đó không phải là số tiền hợp lệ")
            .setColor("RANDOM")

            return message.channel.send(payError2)
        }
        if(user.id === author.id) {
            const payError3 = new MessageEmbed()
            .setDescription("Bạn không thể tự trả tiền cho mình")
            .setColor("RANDOM")
            
            return message.channel.send(payError3)
        }

        if(args[0] < 0) {
            const payError4 = new MessageEmbed()
            .setDescription("Bạn cần cung cấp nhiều hơn \$0")
            .setColor("RANDOM")

            return message.channel.send(payError4)
        }

        let PayerAmount = db.fetch(`money_${message.guild.id}_${author.id}`)

        if(args[0] > PayerAmount) {
            const payError5 = new MessageEmbed()
            .setDescription("Bạn không có đủ tiền để gửi!")
            .setColor("RANDOM")

            return message.channel.send(payError5)
        }


        db.subtract(`money_${message.guild.id}_${author.id}`, args[0])
        db.add(`money_${message.guild.id}_${user.id}` , args[0])

        const paySuccess = new MessageEmbed()
        .setDescription(`Đã thanh toán thành công: \$${args[0]} cho ${user}`)
        .setColor("RANDOM")

        message.channel.send(paySuccess)

    }
}
