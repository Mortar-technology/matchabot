const { MessageEmbed } = require("discord.js");
const db = require('quick.db');;

module.exports = {
    name: 'leaderboard',
    description: "Kiểm tra Ai đang dẫn đầu bảng xếp hạng về Số dư MatchaBank!",
    usage: "?leaderboard",
    aliases: ['level', 'levels'],
    run: async(client, message, args) => {
        let money = db.all().filter(lb => lb.ID.startsWith(`bank_${message.guild.id}`)).sort((a, b) => b.data- a.data)
        let bankBalance = money.slice(0, 10)
        console.log(bankBalance)
        let content = "";

        for(let i = 0; i < bankBalance.length; i++) {
            let user = client.users.cache.get(bankBalance[i].ID.split('_')[2])

            content += `${i+1}. ${user} - \$${bankBalance[i].data} \n`

        }

        const embed = new MessageEmbed()
        .setColor("RANDOM")
        .setTitle(`${message.guild.name}\'s Bảng xếp hạng`)
        .setDescription(`${content}`)
        .setTimestamp()

        message.channel.send(embed)
    }
}
