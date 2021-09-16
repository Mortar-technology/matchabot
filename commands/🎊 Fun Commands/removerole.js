const Discord = require('discord.js');
const emoji = require('../../assets/json/emoji.json');
const config = require('../../config.json');

module.exports = {
    name: "removerole",
    aliases: ["xoarole"],
    category: "Moderation",
    description: "\`Xoá role thành viên trong discord\`",
    usage:"< prefix >xoarole @thành viên @role",

    run: async (client, message, args) => {

        const user = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
        const perms = ["MANAGE_ROLES" || "ADMINSTRATOR"];
        const doggo = message.guild.members.cache.get(client.user.id);
        const role = message.mentions.roles.first() || message.guild.roles.cache.get(args[1]);

        let reason = args.slice(2).join(' ');
        if (!reason) reason = '`-`';
        if (reason.length > 1024) reason = reason.slice(0, 1021) + '...';

        if(!message.member.hasPermission(perms)) 
        return message.reply("❌\`Bạn không được phép làm điều đó, hãy thử yêu người có role cao hơn bạn cho phép quyền hạn cao hơn\`")
        .then(msg => {
            msg.delete({ timeout: 20000 })
        });

        if(!doggo.hasPermission(perms))
        return message.reply("❌\`Tôi không có quyền bổ sung, vui lòng cho phép quyền hạn cao nhất để thực hiện\`")

        if (!user)
        return message.reply("❌\`Vui lòng chỉ định người bạn muốn xóa vai trò !! ** \ `< prefix >removerole [Người dùng] [Đề cập đến ROLE hoặc ID ROLE]\`")

        if (!role)
        return message.reply(`❌ \`Vui lòng đề cập đến một ROLE hoặc cung cấp một ID ROLE hợp lệ\``);

        if (user.roles.highest.position >= message.member.roles.highest.position)
        return message.reply(`❌ \`Bạn không thể xóa ROLE của người khác cao hơn hoặc bằng ROLE của bạn\``)

        if (user.roles.highest.position >= doggo.roles.highest.position)
        return message.reply(`❌ \`Tôi không thể xóa ROLE của người khác cao hơn hoặc bằng ROLE của tôi\``)

        else if (!user.roles.cache.has(role.id))
        return message.reply(`❌ \`Người dùng không có vai trò được cung cấp\``);

        else {
            try {
      
              await user.roles.remove(role);

              const embed = new Discord.MessageEmbed()
                .setTitle('XOÁ ROLE THÀNH VIÊN')
                .setDescription(`Đã xoá role: ${role}(\`${role.id}\`) của <@${user.id}>(\`${user.user.tag}\`) Thành công`)
                .addField('Người xoá', `<@${message.member.id}>\n(\`${message.member.user.tag}\`)`, true)
                .addField('Người bị xoá', `<@${user.id}>\n(\`${user.user.tag}\`)`, true)
                .addField('Role', `${role}\n(\`${role.id}\`)`, true)
                .addField('Lý do', reason)
                .setFooter(`Matcha Synthetic | yêu cầu bởi: ${message.member.displayName}`,  message.author.displayAvatarURL({ dynamic: true }))
                .setTimestamp()
                .setColor(message.guild.me.displayHexColor);
              await message.channel.send(embed);
      
            } catch (err) {
              return message.reply(`${emoji.Error} Please check the role hierarchy !!!`, err.message);
            }
        }  
    }
}
