const db = require('quick.db');
const { MessageEmbed } = require('discord.js');

module.exports = {
    name: 'withdraw',
    description: "Rút tiền từ tài khoản VIETIN-Bank của bạn!",
    usage: "?withdraw <amount>",
    run: async (client, message, args) => {
        let member = message.author;
        let bankBalance = db.fetch(`bank_${message.guild.id}_${member.id}`)

        if (!args[0]) {
            const withdrawError = new MessageEmbed()
                .setDescription("Bạn cần cung cấp một số tiền hợp lệ để rút")
                .setColor("BLUE")

            return message.channel.send(withdrawError)
        }
        if (isNaN(args[0])) {
            const withdrawError2 = new MessageEmbed()
                .setDescription("Đó không phải là số tiền hợp lệ!")
                .setColor("BLUE")

            return message.channel.send(withdrawError2)
        }
        if(args[0] > bankBalance) {
            const withdrawError3 = new MessageEmbed()
                .setDescription("Bạn không có nhiều tiền trong tài khoản VIETIN-Bank của mình")
                .setColor("BLUE")

            return message.channel.send(withdrawError3)
        }
        if(args[0] > 250) {
            const withdrawError4 = new MessageEmbed()
                .setDescription("Bạn chỉ có thể rút $ 250 cùng một lúc.")
                .setColor("BLUE")

            return message.channel.send(withdrawError4)
        }

        
        db.subtract(`bank_${message.guild.id}_${member.id}`, args[0])
        db.add(`money_${message.guild.id}_${member.id}`, args[0])
        let cashBalance = db.fetch(`money_${message.guild.id}_${member.id}`)

        const withdrawSuccess = new MessageEmbed()
        .setDescription(`Rút tiền thành công \$${args[0]} từ Ngân hàng của bạn. \ trên Số dư tiền mặt hiện tại của bạn là: \$${cashBalance}`)
        .setColor("BLUE")

        message.channel.send(withdrawSuccess)

    }
}
