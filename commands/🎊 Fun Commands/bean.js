const Discord = require('discord.js');
const emoji = require('../../assets/json/emoji.json');
const config = require('../../config.json');

module.exports = {
    name: "bean",
    category: "Moderation",
    description: "\`|| baned người dùng khỏi server || lệnh ban dọa không phải ban thật ||\`",
    usage:"!bean @tên người bị ban | lý do ban",

    run: async (client, message, args) => {
        const user = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
        const perms = ["BAN_MEMBERS" || "ADMINSTRATOR"] 
        const doggo = message.guild.members.cache.get(client.user.id);

        if(!message.member.hasPermission(perms)) 
        return message.reply("❌\`Gì kì bạn có quyền đou mà đòi\`")
        .then(msg => {
            msg.delete({ timeout: 20000 })
        });

        if (!user)
        return message.reply("🌚\`Vui lòng chỉ định người bạn muốn Band !bean <user> [lý do]\`")

        if(user === client.user.id)
        return message.reply("👻\`Bạn không thể band bản thân\`")
        

        if(user.id === message.author.id) 
        return message.reply("👻\`Bạn không thể band bản thân\`")
        

        if (user.roles.highest.position > message.member.roles.highest.position)
        return message.reply("🌚\`Bạn không thể bean người có vai trò ngang hàng hoặc cao hơn với bạn !!! hoặc nếu bạn là chủ sở hữu, hãy tự mình ở vị trí cao hơn\`")
        

        if (!user.bannable)
        return message.reply("👻\`Role của họ cao hơn tôi nên không thể bean\`");


        const reason = args.slice(1).join(" ");
 
        const embed = new Discord.MessageEmbed()
        .setColor("#00aaaa")
        .setTitle('Matcha Synthetic BAN')
        .setDescription(`🤧 Người dùng <@${user.id}> đã bị baned khỏi **${message.guild.name}**`)
        .addField('Lý Do Baned', `**\`${reason != "" ? reason : "-"}\`**`, true)
        .addField('Người ban', `<@${message.member.id}> (**\`${message.member.user.tag}\`**)`, true)
        .setTimestamp()

        await message.channel.send(embed);
    }
}
