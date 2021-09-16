const Discord = require('discord.js');
const emoji = require('../../assets/json/emoji.json');
const config = require('../../config.json');
const moment = require('moment');

const channelType = {
    dm: 'DM',
    text: `${emoji.TextChannnel} \`Text\``,
    voice: `${emoji.VoiceChannel} \`Voice\``,
    category: `${emoji.Category} \`Category\``,
    news: `${emoji.AnnouncementChannel} \`Announcement\``,
    store: `${emoji.StoreChannel} \`Store\``
};



module.exports = {
    name: "channelinfo",
    aliases: ["channel"],
    description: "\`Hiển thị các thông tin liên quan đến channel\`",
    category: "Info",
    usage:"!channelinfo #tên channel",

    run: async (client, message, args) => {

        let channel = message.mentions.channels.first() || message.guild.channels.cache.get(args[0]) || message.channel;

        if(!channel)
        return message.reply(`${emoji.Error} Provide a valid channel or channel from this server not from other server !! **\`${config.Prefix}channelinfo [Channel Form this server]\`**`)

        const totalUsers = channel.members.size;
        const bots = channel.members.array().filter(b => b.user.bot).length;
        const humans = channel.members.size - bots;
        const NFSW = {
            true: 'Có',
            false: 'Không'
        }
        
        const embed = new Discord.MessageEmbed()
        .setTitle('Channel Info')
        .addField('Tên', channel, true)
        .addField('ID', `\`${channel.id}\``, true)
        .addField('kiểu kênh', channelType[channel.type], true)
        .addField('Người dùng', `\`${totalUsers}\` Users`, true)
        .addField('Người', `\`${humans}\` Users`, true)
        .addField('Bots', `\`${bots}\` Users`, true)
        .addField('Ngày thành lập', `\`${moment(channel.createdAt).format('DD/MMM/YYYY')}\``, true)
        .addField('NSFW ', `\`${NFSW[channel.nsfw]}\``, true)
        .setColor(message.guild.me.displayHexColor)
        .setTimestamp()

        message.channel.send(embed)

    }

}
