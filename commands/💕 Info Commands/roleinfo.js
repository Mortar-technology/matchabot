const Discord = require('discord.js');
const emoji = require('../../assets/json/emoji.json');
const config = require('../../config.json');
const moment = require('moment');

module.exports = {
    name: "roleinfo",
    aliases: ['roleinformation', "role"],
    category: "Info",
    description: 'Gives the info of the provided role !!',
    example: "!!roleinfo @Mod",

    run: async (client, message, args) => {

        const role = message.mentions.roles.first() || message.guild.roles.cache.get(args[0]);

        const permissions = {
            "ADMINISTRATOR": "Người quản lý",
            "VIEW_AUDIT_LOG": "Xem nhật ký chỉnh sửa",
            "VIEW_GUILD_INSIGHTS": "Xem thông tin server",
            "MANAGE_GUILD": "Quản lý server",
            "MANAGE_ROLES": "Quản lý Roles",
            "MANAGE_CHANNELS": "quản lý Channels",
            "KICK_MEMBERS": "Kick Members",
            "BAN_MEMBERS": "Ban Members",
            "CREATE_INSTANT_INVITE": "Tạo lời mời",
            "CHANGE_NICKNAME": "Thay đổi biệt danh",
            "MANAGE_NICKNAMES": "Quản lý biệt danh",
            "MANAGE_EMOJIS": "Quản lý Emojis",
            "MANAGE_WEBHOOKS": "Quản lý Webhooks",
            "VIEW_CHANNEL": "Xem kênh văn bản và voice",
            "SEND_MESSAGES": "Gửi tin nhắn",
            "SEND_TTS_MESSAGES": "Gửi tin nhắn TTS",
            "MANAGE_MESSAGES": "Quản lý tin nhắn",
            "EMBED_LINKS": "Nhúng liên kết",
            "ATTACH_FILES": "Đính kèm tệp",
            "READ_MESSAGE_HISTORY": "Đọc lịch sử tin nhắn",
            "MENTION_EVERYONE": "Được tag @everyone, @here, và tất cả Roles",
            "USE_EXTERNAL_EMOJIS": "sử dụng Emojis",
            "ADD_REACTIONS": "Thêm phản ứng",
            "CONNECT": "Kết nối",
            "SPEAK": "Nói",
            "STREAM": "Video",
            "MUTE_MEMBERS": "Tắt mic thành viên",
            "DEAFEN_MEMBERS": "tắt âm thanh thành viên",
            "MOVE_MEMBERS": "Di chuyển thành viên",
            "USE_VAD": "Sử dụng Hoạt động giọng nói",
            "PRIORITY_SPEAKER": "ưu tiên VOICE"
        }

        const yesno = {
            true: '`Yes`',
            false: '`No`'
        }

        if(!role)
        return message.reply(`Nếu muốn xem role hãy bấm \`${config.Prefix}roleinfo [@role muốn xem]\``)

        const rolePermissions = role.permissions.toArray();
        const finalPermissions = [];
        for (const permission in permissions) {
            if (rolePermissions.includes(permission)) finalPermissions.push(`✔️ ${permissions[permission]}`);
            else finalPermissions.push(`❌ ${permissions[permission]}`);
        }

        const position = `\`${message.guild.roles.cache.size - role.position}\`/\`${message.guild.roles.cache.size}\``;
        
        const embed = new Discord.MessageEmbed()
        
        .setTitle(`Thoong tin ROLE`)
        .setThumbnail(message.guild.iconURL({dynamic: true, size: 1024}))
        .addField('Tên', role, true)
        .addField('ID', `\`${role.id}\``, true)
        .addField('Chức vụ', position, true)
        .addField('Có thể hỗ trợ', yesno[role.mentionable], true)
        .addField('Bot Role', yesno[role.managed], true)
        .addField('Có thể nhìn thấy', yesno[role.hoist], true)
        .addField('Màu role', `\`${role.hexColor.toUpperCase()}\``, true)
        .addField('Số thành viên có role này', `\`${role.members.size}\` Users`, true)
        .addField('Ngày tạo ROLE', `\`${moment(role.createdAt).format('DD/MMM/YYYY')}\``, true)
        .addField('Quyền hạn của ROLE', `\`\`\`diff\n${finalPermissions.join('\n')}\`\`\``)

        message.channel.send(embed)

        
    }
}
