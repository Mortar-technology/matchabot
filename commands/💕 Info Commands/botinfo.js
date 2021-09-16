const Discord = require('discord.js');
const moment = require('moment');
const emoji = require('../../assets/json/emoji.json');
const config = require('../../config.json');

module.exports = {
    name: "botinfo",
    category: "Info",
    aliases: ["bot", "info", "stats"],
    description: "\`Hiển thị những thông tin về bot\`",
    usage:"!botinfo",

    run: async (client, message, args) => {

        let usersCount = 0;
        for (const guild of client.guilds.cache) {
        usersCount += (await guild[1].members.fetch()).size
        }

        let Days = Math.floor(client.uptime / 86400000);
        let Hours = Math.floor(client.uptime / 3600000) % 24;
        let Minutes = Math.floor(client.uptime / 60000) % 60;
        let Seconds = Math.floor(client.uptime / 1000) % 60;    
        const RemoveUseless = (Duration) => {
        return Duration.replace("0 Day\n", "").replace("0 Hour\n", "").replace("0 Minute\n", "");
        }

        const Developer = client.users.cache.get(config.Owner)

        let Uptime = await RemoveUseless(`${Days}${Days > 1 ? "d" : "d"} ${Hours}${Hours > 1 ? "h" : "h"} ${Minutes}${Minutes > 1 ? "m" : "m"} ${Seconds}${Seconds > 1 ? "s" : "s"}`);
    

        const embed = new Discord.MessageEmbed()
        
        .setAuthor(client.user.tag, client.user.displayAvatarURL())
        .setTitle(`Information`)
        .addField(`Name | ID`, `\`\`\`${client.user.tag} | ${client.user.id}\`\`\``, true)
        .addField(`🤭Được sử dụng bởi:`, `\`\`\`${client.guilds.cache.size} Servers\`\`\``, true)
        .addField(`😂Số lượng người dùng:`, `\`\`\`${usersCount} Users\`\`\``, true)
        .addField(`💬Số kênh:`, `\`\`\`${client.channels.cache.size} Channels\`\`\``, true)
        .addField(`🎲 Chạy bằng:`, `\`\`\`Discord.js & Node.js\`\`\``, true)
        .addField(`${emoji.CreationDate} Ngày thành lập:`, `\`\`\`${moment.utc(client.user.createdAt).format('DD/MMM/YYYY')}\`\`\``, true)
        .addField(`🔫Bot Ping`, `\`\`\`Latency: ${Date.now()-message.createdTimestamp} ms\nAPI Latency: ${Math.round(client.ws.ping)} ms\`\`\``, true)
        .addField(`🛠️ Số lệnh`, `\`\`\`${client.commands.size} Commands\n${client.aliases.size} Aliases\`\`\``, true)
        .addField(`🔰 Prefix`, `\`\`\`${config.Prefix}\`\`\``, true)
        .addField(`👑 Chủ bot`, `\`\`\`${Developer.tag} | ${config.Owner}\`\`\``, true)
        .addField(`⏱️ Thời gian hoạt động`, `\`\`\`${Uptime}\`\`\``, true)
        .addField(`📌 Links`, `[Add BOT](${config.Invite}) | [DISCORD Server](${config.Server})`)
        .setColor(message.guild.me.displayHexColor)
        .setTimestamp()

        message.channel.send(embed)
    }
}
