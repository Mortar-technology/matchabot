const db = require('quick.db');
const ms = require("parse-ms");
const { MessageEmbed } = require("discord.js");

module.exports = {
    name: 'daily',
    description: "Cung cấp cho bạn tiền thưởng tiền mặt hàng ngày của bạn",
    usage: "?daily",
    run: async(client, message, args) => {
        let timeout = 86400000;
        let amount = 100;
        let user = message.author

        let daily =  await db.fetch(`daily_${message.guild.id}_${user.id}`)
        if(daily !== null && timeout - (Date.now() - daily) > 0) {
            let time = ms(timeout - (Date.now() - daily))

            const dailyEmbed = new MessageEmbed()
            .setDescription(`Bạn đã Nhận được Tiền thưởng Hàng ngày của mình.\nQuay lại sau: ${time.hours} Giờ, ${time.minutes} phút và ${time.seconds} giây`)
            .setColor("#f56c42")

            return message.channel.send(dailyEmbed)
        } else {
            db.add(`money_${message.guild.id}_${user.id}`, amount)
            db.set(`daily_${message.guild.id}_${user.id}`, Date.now())

            const dailySuccess = new MessageEmbed()
            .setDescription(`Tại đây, Hãy lấy\$${amount} làm Phần thưởng tiền mặt hàng ngày của bạn!`)
            .setColor("BLUE")

            message.channel.send(dailySuccess)
        }
    }
}
