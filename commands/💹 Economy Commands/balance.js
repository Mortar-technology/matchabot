const { MessageEmbed } = require("discord.js");
const db = require('quick.db');

module.exports = {
    name: 'balance',
    description: "Hiển thị số dư ảo của bạn trong Matchabank",
    usage: "?balance <mention>\(cho số dư của người khác \) HOẶC? số dư \ (cho số dư của chính bạn\)",
    aliases: ['bal'],
    run: async(client, message, args) => {

        let user  = message.mentions.users.first() || message.author

        let bal = await db.fetch(`money_${message.guild.id}_${user.id}`)
        let bankBalance = await db.fetch(`bank_${message.guild.id}_${user.id}`)

        if(bal === null) bal = 0;
        if(bankBalance === null) bankBalance = 0;

        const balEmbed = new MessageEmbed()
        .setTitle(`:bank: ${user.username}\'s Balance`)
        .setColor("RANDOM")
        .addField('Tiền mặt', `số dư tiền mặt \$${bal} VND`)
        .addField('Số dư Ngân hàng', `Bạn đang có\$${bankBalance} trong tài khoản ngân hàng của bạn`)

        message.channel.send(balEmbed)
    }
}
