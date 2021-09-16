const Discord = require('discord.js');
const config = require('../../config.json');

module.exports = {
    name: "uptime",
    aliases: ["up", "ut"],
    category: "Info",
    description: "⏱️\`Hiển thị thời gian online của bot\`",
    example: `${config.Prefix}uptime`,

    run: async (client, message, args) => {
        let Days = Math.floor(client.uptime / 86400000);
        let Hours = Math.floor(client.uptime / 3600000) % 24;
        let Minutes = Math.floor(client.uptime / 60000) % 60;
        let Seconds = Math.floor(client.uptime / 1000) % 60;    
        const RemoveUseless = (Duration) => {
      return Duration.replace("0 Ngày\n", "").replace("0 Giờ\n", "").replace("0 Phút\n", "");
    };
    let Uptime = await RemoveUseless(`\`${Days}\` ${Days > 1 ? "Days" : "Day"} \`${Hours}\` ${Hours > 1 ? "Hours" : "Hour"} \`${Minutes}\` ${Minutes > 1 ? "Minutes" : "Minute"} \`${Seconds}\` ${Seconds > 1 ? "Seconds" : "Second"}`);
    
    const embed = new Discord.MessageEmbed()
    
    .setTitle(`Thời gian bot online`)
    .setDescription(`${Uptime}`)
    .setFooter(`Matcha Synthetic | yêu cầu bởi: ${message.author.username}`, message.author.displayAvatarURL({dynamic: true}))
    .setTimestamp();

    await message.channel.send(embed)
    }
}
