const { MessageEmbed } = require("discord.js");
const db = require('quick.db');

module.exports = {
    name: 'buy',
    description: "Mua hàng từ cửa hàng!",
    aliases: [],
    usage: "?buy [item]",
    run: async(client, message, args) => {
        let purchase = args.join(" ")
        let cash = await db.fetch(`money_${message.guild.id}_${message.author.id}`)

        if(!purchase) {
            const buyError = new MessageEmbed()
            .setDescription("Bạn cần cung cấp một mặt hàng bạn muốn mua!")
            .setColor("BLUE")

            return message.channel.send(buyError)
        }
        let items = await db.fetch(`items_${message.guild.id}_${message.author.id}`, {items: []})

        if(purchase == 'Thief Outfit') {
            if(cash < 50) {
                const purchaseError = new MessageEmbed()
                .setDescription("Bạn Không Có Đủ Tiền Để Mua Trang Phục Của Kẻ Trộm!")
                .setColor("BLUE")

                return message.channel.send(purchaseError)
            }

            db.subtract(`money_${message.guild.id}_${message.author.id}`, 50)
            db.push(`items_${message.guild.id}_${message.author.id}`, "Thief outfit")

            const purchaseThiefOutfitSuccess = new MessageEmbed()
            .setDescription(`Mua thành công một bộ trang phục của tên trộm với giá $50`)
            .setColor("BLUE")

            message.channel.send(purchaseThiefOutfitSuccess)
        }

        if(purchase == 'Car') {
            if(cash < 150) {
                const purchaseError2 = new MessageEmbed()
                .setDescription("Bạn không có đủ tiền để mua xe")
                .setColor("BLUE")

                return message.channel.send(purchaseError2)
            }

            db.subtract(`money_${message.guild.id}_${message.author.id}`, 150)
            db.push(`items_${message.guild.id}_${message.author.id}`, 'Car')

            const purchaseCarSuccess = new MessageEmbed()
            .setDescription(`Mua thành công một chiếc ô tô với giá $150`)
            .setColor("BLUE")

            message.channel.send(purchaseCarSuccess)
        }
    }
}
