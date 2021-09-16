const { MessageEmbed } = require("discord.js");
module.exports = {
    name: "coinflip",
    aliases:["tdx"],
    description: "\`tung đồng xu\`",
    run: async(client, message, args) => {
        const choices= ["🌕", "🌑"];
        const choice = choices[Math.floor(Math.random() * choices.length)];
        let embed = new MessageEmbed()
        .setTitle("")
        .setDescription(`Bạn đã tung được **${choice}**!`)
        message.channel.send(embed)
    }
}
