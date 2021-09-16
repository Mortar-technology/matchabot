const { MessageEmbed } = require('discord.js');
const db = require('quick.db');

module.exports = {
    name: 'inventory',
    description: "Xem khoảng không quảng cáo của bạn",
    aliases: ['inven', 'int'],
    usage: "?inventory",
    run: async(client, message, args) => {

        let items = db.fetch(`items_${message.guild.id}_${message.author.id}`)
        if(items === null) items = "Không có gì";

        const Embed = new MessageEmbed()
        .addField('Hàng tồn kho', items)
        .setColor("RANDOM")

        message.channel.send(Embed)
    }
}
