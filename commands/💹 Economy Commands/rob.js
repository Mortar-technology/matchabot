const db = require('quick.db');
const ms = require('parse-ms');
const { MessageEmbed } = require("discord.js");

module.exports = {
    name: 'rob',
    description: "Cướp ai đó nếu họ có tiền mặt!",
    usage: "?rob <mention>",
    run: async(client, message, args) => {
        let timeout = 7200000;
        let user = message.mentions.users.first()
        let cash = db.fetch(`money_${message.guild.id}_${message.author.id}`)

        let robbedCash = db.fetch(`robbedCash_${message.guild.id}_${message.author.id}`)

        if(!db.has(`items_${message.guild.id}_${message.author.id}`, 'Thief Outfit')) {
            const embed = new MessageEmbed()
            .setDescription("Bạn không có trang phục của kẻ trộm, hãy chắc chắn rằng bạn mua một bộ từ Cửa hàng!")
            .setColor("RANDOM")

            return message.channel.send(embed)
        }

        if(!user) {
            const robError = new MessageEmbed()
            .setDescription("Bạn cần đề cập đến ai đó để cướp chúng!")
            .setColor("RANDOM")

            return message.channel.send(robError)
        }
        if(message.author === user) {
            const embed2 = new MessageEmbed()
            .setDescription("Bạn không thể cướp chính mình")
            .setColor("RANDOM")

            return message.channel.send(embed2)
        }

        
        let memberCash = db.fetch(`money_${message.guild.id}_${user.id}`)

        if(memberCash == null || 0) {
            robErr = new MessageEmbed()
            .setDescription(`Rất tiếc, ${user} không có tiền mặt!\nHãy thử lại sau!`)
            .setColor("RED")

            db.set(`robbedCash_${message.guild.id}_${message.author.id}`, Date.now())
            return message.channel.send(robErr)
            
            
        }
        if(cash > memberCash) {
            const robError2 = new MessageEmbed()
            .setDescription("Bạn chỉ có thể cướp ai đó có nhiều tiền hơn bạn!")
            .setColor("RANDOM")

            return message.channel.send(robError2)
        }

        if(robbedCash !== null && timeout - (Date.now() - robbedCash) > 0) {
            let time = ms(timeout - (Date.now() - robbedCash))

            const robEmbed = new MessageEmbed()
            .setDescription(`Bạn không thể cướp ai đó trong ${time.hours} Giờ, ${time.minutes} phút và ${time.seconds} giây`)
            .setColor("RANDOM")

            return message.channel.send(robEmbed)
        }

        let amount = Math.floor(Math.random() * memberCash) + 1
        db.subtract(`money_${message.guild.id}_${user.id}`, amount)
        db.delete(`items_${message.guild.id}_${message.author.id}`, 'Thief Outfit')
        db.add(`money_${message.guild.id}_${message.author.id}`, amount)
        db.set(`robbedCash_${message.guild.id}_${message.author.id}`, Date.now())

        const robSuccess = new MessageEmbed()
        .setDescription(`Cướp thành công\$${amount} từ ${user}`)
        .setColor("RANDOM")

        message.channel.send(robSuccess)
    }
}
