const db = require('quick.db');
const ms = require("parse-ms");
const { MessageEmbed } = require("discord.js");

module.exports = {
    name: 'work',
    description: "Làm việc và Kiếm tiền. Đó là cách Thế giới Hoạt động.",
    usage: "?work",
    run: async(client, message, args) => {

        let user = message.author;
        let author = await db.fetch(`worked_${message.guild.id}_${user.id}`)
        let timeout = 21600000

        if(author !== null && timeout - (Date.now() - author) > 0) {
            let time = ms(timeout - (Date.now() - author));
            const workEmbed = new MessageEmbed()
            .setDescription(`Bạn không thể làm việc trong ${time.hours} Giờ, ${time.minutes} phút và ${time.seconds} giây`)
            .setColor("RANDOM")

            return message.channel.send(workEmbed)
        } else {
            let amount = Math.floor(Math.random() * 25) + 1
            db.add(`money_${message.guild.id}_${user.id}`, amount)
            db.set(`worked_${message.guild.id}_${user.id}`, Date.now())

            const workSuccess = new MessageEmbed()
            .setDescription(`${user}, Bạn đã làm việc và kiếm tiền \$${amount}\nHãy chắc chắn rằng bạn tiếp tục làm việc để kiếm được nhiều tiền hơn.`)
            .setColor("BLUE")

            message.channel.send(workSuccess)
        }
    }
}
