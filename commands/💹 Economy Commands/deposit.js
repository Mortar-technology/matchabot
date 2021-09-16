const { MessageEmbed } = require('discord.js');
const db = require('quick.db');
const ms = require('parse-ms');

module.exports = {
    name: 'deposit',
    description: "Gửi tiền vào MatchaBank và giữ an toàn",
    usage: "?deposit <amount>",
    run: async (client, message, args) => {
        
        let member = message.author;


        let all = db.fetch(`money_${message.guild.id}_${member.id}`)

        if(args[0] === "all") args[0] = all


        if (!args[0]) {
            const depositError = new MessageEmbed()
                .setTitle("Bạn cần cung cấp một số tiền hợp lệ để gửi tiền")
                .setColor("RANDOM")
                .setFooter("Bạn có thể thực hiện để gửi tất cả tiền mặt của bạn cùng một lúc")

            return message.channel.send(depositError)
        }

        if (isNaN(args[0])) {
            const depositError2 = new MessageEmbed()
                .setDescription("Đó không phải là số tiền hợp lệ!")
                .setColor("RANDOM")

            return message.channel.send(depositError2)
        }

        if (args[0] > all) {
            const depositError3 = new MessageEmbed()
                .setDescription("Bạn không có nhiều tiền mặt như vậy!")
                .setColor("RANDOM")

            return message.channel.send(depositError3)
        }


        


        
        db.subtract(`money_${message.guild.id}_${member.id}`, args[0])
        db.add(`bank_${message.guild.id}_${member.id}`, args[0])
        let bankBal = db.fetch(`bank_${message.guild.id}_${message.author.id}`)

        let depositSuccess = new MessageEmbed()
            .setDescription(`Đã gửi thành công\$${args[0]} vào Tài khoản ngân hàng của bạn!\trên Số dư Ngân hàng Mới của bạn là: \$${bankBal}`)
            .setColor("RANDOM")

        message.channel.send(depositSuccess)
    }
}
