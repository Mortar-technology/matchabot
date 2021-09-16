const Discord = require('discord.js');
const config = require(`../../config.json`);

module.exports = {
    name: "discord",
    aliases: ["server"],
    category: "info",
    description: "\`Gửi link discord server của owner\`",
    usage:"!discord",

    run: async (client, message, args) => {
        const embed = new Discord.MessageEmbed()
        .setTitle('Join Us')
        .setDescription(`Hãy [bấm vào đây](${config.Server}) để vào discord của Owner`)
        .setTimestamp()

        message.channel.send(embed)
    }
}
