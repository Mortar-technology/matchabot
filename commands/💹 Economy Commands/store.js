const { MessageEmbed } = require('discord.js');
const db = require('quick.db');

module.exports = {
    name: 'store',
    description: "Cửa hàng thiết bị cơ bản",
    aliases: [],
    usage: "?store",
    run: async(client, message, args) => {

        const embed = new MessageEmbed()
        .setTitle('Store')
        .setColor("BLUE")
        .addField('**Đồ Kẻ Trộm**', "**Bạn không thể cướp bất kỳ ai nếu không có bộ này !, Mua cái này với giá \$50**\n**`< prefix >buy Thief Outfit` để mua**")
        .addField('**Xe**', "**Một chiếc xe đơn giản. Có lẽ để khoe? Chi phí Chỉ $150 **\n **Làm `by car` Để mua**")
        message.channel.send(embed)
    }
}
