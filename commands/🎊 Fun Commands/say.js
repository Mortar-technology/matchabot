const Discord = require('discord.js');
const config = require('../../config.json');
const emoji = require('../../assets/json/emoji.json');

module.exports = {
    name: "say",
    category: "Utility",
    dscription: "Sends a message in embed",
    usage: `${config.Prefix}say Hi`,

    run: async (client, message, args) => {

        if (message.deletable) await message.delete();

        if (args.length <= 0)
        return message.reply(`${emoji.Error} bạn cần nhập chữ gì đó!!`)
        .then(msg => {
            msg.delete({ timeout: 10000 })
        });
        if (message.content.includes("discord.gg"))
        return message.reply(`${emoji.Error} không dùng tôi để tag link server nhé!!!`)
        .then(msg => {
            msg.delete({ timeout: 15000 })
        });

        const embed = new Discord.MessageEmbed()
        .setDescription(args.join(" "))
        message.channel.send(embed)

    }
}
