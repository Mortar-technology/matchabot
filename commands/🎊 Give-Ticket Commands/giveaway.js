const { MessageEmbed } = require('discord.js')
const ms = require('ms');
module.exports = {
    name: "start",
        description: "Creating giveaway",
        accessableby: "Administrator",
        category: "giveaway",
        aliases: ["giveaway-start"],
        usage: '<channel> <duration> <winners>, <prize>',
    run: async (bot, message, args) => {
       if(!message.member.hasPermission('MANAGE_MESSAGES') && !message.member.roles.cache.some((r) => r.name === "Giveaways")){
        return message.channel.send('❌ Bạn cần có quyền quản lý tin nhắn để bắt đầu giveaway');
    }

    
    let giveawayChannel = message.mentions.channels.first();
    
    if(!giveawayChannel){
        return message.channel.send('❌ Bạn phải đề cập đến một kênh hợp lệ!');
    }

    
    let giveawayDuration = args[1];
    
    if(!giveawayDuration || isNaN(ms(giveawayDuration))){
        return message.channel.send('❌ Bạn phải chỉ định thời hạn hợp lệ!');
    }

    
    let giveawayNumberWinners = args[2];
    
    if(isNaN(giveawayNumberWinners) || (parseInt(giveawayNumberWinners) <= 0)){
        return message.channel.send('❌ Bạn phải chỉ định một số lượng người chiến thắng hợp lệ!');
    }

    
    let giveawayPrize = args.slice(3).join(' ');
    
    if(!giveawayPrize){
        return message.channel.send('❌ Bạn phải chỉ định một giải thưởng hợp lệ!');
    }

    
    bot.giveawaysManager.start(giveawayChannel, {
        
        time: ms(giveawayDuration),
        
        prize: giveawayPrize,
        
        winnerCount: giveawayNumberWinners,
        
        hostedBy: message.author,
        
        messages: {
            giveaway: "🎊🎊 **GIVEAWAY CHANNEL** 🎊🎊",
            giveawayEnded: "🎊🎊 **GIVEAWAY ENDED** 🎊🎊",
            timeRemaining: "Thời gian còn lại: **{duration}**!",
            inviteToParticipate: "React with ðŸŽ‰ to participate!",
            winMessage: "Xin chúc mừng, {winners}! Bạn đã thắng và nhận được **{prize}**!",
            embedFooter: "Giveaways",
            noWinner: "Giveaway bị hủy, không có người tham gia hợp lệ.",
            hostedBy: "Tổ chức bởi: {user}",
            winners: "winner(s)",
            endedAt: "Đã kết thúc lúc",
            units: {
                seconds: "giây",
                minutes: "phút",
                hours: "giờ",
                days: "ngày",
                pluralS: false // Not needed, because units end with a S so it will automatically removed if the unit value is lower than 2
            }
        }
    });

    message.channel.send(`Giveaway bắt đầu ở channel: ${giveawayChannel}!`);

    }
}
