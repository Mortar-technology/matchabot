const Discord = require('discord.js');
const emoji = require('../../assets/json/emoji.json');
const config = require('../../config.json');

module.exports = {
    name: "addrole",
    category: "Moderation",
    aliases: ["ar", "giverole"],
    description: "\`Cập nhận role cho thành viên DISCORD qua lệnh add role\`",
    usage: "!addrole @thành viên  @role",

    run: async (client, message, args) => {

        const user = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
        const perms = ["MANAGE_ROLES" || "ADMINSTRATOR"];
        const doggo = message.guild.members.cache.get(client.user.id);
        const role = message.mentions.roles.first() || message.guild.roles.cache.get(args[1]);

        let reason = args.slice(2).join(' ');
        if (!reason) reason = '`-`';
        if (reason.length > 1024) reason = reason.slice(0, 1021) + '...';

        if(!message.member.hasPermission(perms)) 
        return message.reply(`\`Bạn không có quyền!\``)
        .then(msg => {
            msg.delete({ timeout: 20000 })
        });

        
        if(!doggo.hasPermission(perms))
        return message.reply("❌\`Tôi không có quyền cấp role!\`")

        if (!user)
        return message.reply("❌\`Vui lòng chỉ định người bạn muốn giao vai trò\`")

        if (!role)
        return message.reply("❌\`Vui lòng đề cập đến một vai trò hoặc cung cấp một ID vai trò hợp lệ\`");

        if (user.roles.highest.position >= message.member.roles.highest.position)
        return message.reply("❌\`Bạn không thể giao vai trò cho người cao hơn hoặc bằng bạn\`")

        if (user.roles.highest.position >= doggo.roles.highest.position)
        return message.reply("❌\`Bạn không thể giao vai cho người cao hơn hoặc bằng vai của tôi\`")

        else if (user.roles.cache.has(role.id))
        return message.reply("❌\`Người dùng đã có vai trò được cung cấp\`");

        else {
            try {

                await user.roles.add(role);

                const embed = new Discord.MessageEmbed()
                .setTitle('<a:R75_ghim:860577713819615282> ĐÃ CẤP ROLE <a:R75_ghim:860577713819615282>')
                .setDescription(`🎊 Đã cấp ${role}(\`${role.id}\`) cho thằng <@${user.id}>(\`${user.user.tag}\`)`)
                .addField('Người cấp', `<@${message.member.id}>\n(\`${message.member.user.tag}\`)`, true)
                .addField('Người nhận', `<@${user.id}>\n(\`${user.user.tag}\`)`, true)
                .addField('Role', `${role}\n(\`${role.id}\`)`, true)
                .addField('Ghi chú', reason)
                .setFooter(`Matcha Synthetic | yêu cầu bởi: ${message.member.displayName}`,  message.author.displayAvatarURL({ dynamic: true }))
                .setTimestamp()
                .setColor(message.guild.me.displayHexColor);

                await message.channel.send(embed);
      
            } catch (err) {
            return message.reply("\`Vui lòng kiểm tra vị trí vai trò\`");
            }
        }
    
    }      
        
}
