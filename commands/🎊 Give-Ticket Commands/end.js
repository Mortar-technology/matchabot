const { MessageEmbed } = require('discord.js')
const ms = require('ms');
module.exports = {
        name: "end",
        description: "Giveaway kết thúc",
        accessableby: "Administrator",
        category: "giveaway",
        aliases: ["giveaway-end"],
        usage: '<giveawaymessageid>',
    run: async (bot, message, args) => {
      if(!message.member.hasPermission('MANAGE_MESSAGES') && !message.member.roles.cache.some((r) => r.name === "Giveaways")){
        return message.channel.send('❌ Bạn cần có quyền quản lý tin nhắn để kết thúc giveaway');
    }

    // If no message ID or giveaway name is specified
    if(!args[0]){
        return message.channel.send('❌ Bạn phải chỉ định một ID tin nhắn hợp lệ!');
    }

    // try to found the giveaway with prize then with ID
    let giveaway = 
    // Search with giveaway prize
    bot.giveawaysManager.giveaways.find((g) => g.prize === args.join(' ')) ||
    // Search with giveaway ID
    bot.giveawaysManager.giveaways.find((g) => g.messageID === args[0]);

    // If no giveaway was found
    if(!giveaway){
        return message.channel.send('❌ Không thể tìm thấy Giveaway cho `'+ args.join(' ') + '`.');
    }

    // Edit the giveaway
    bot.giveawaysManager.edit(giveaway.messageID, {
        setEndTimestamp: Date.now()
    })
    // Success message
    .then(() => {
        // Success message
        message.channel.send('Giveaway sẽ kết thúc sau ít hơn '+(bot.giveawaysManager.options.updateCountdownEvery/1000)+' giây...');
    })
    .catch((e) => {
        if(e.startsWith(`Giveaway có ID tin nhắn ${giveaway.messageID} đã kết thúc`)){
            message.channel.send('Giveaway này đã kết thúc!');
        } else {
            console.error(e);
            message.channel.send('Đã xảy ra lỗi...');
        }
    });
    }
}
