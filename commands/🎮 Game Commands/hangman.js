const { hangman } = require('reconlx')

module.exports = {
    name : 'hangman',
    run : async(client, message, args) => {
        if(!message.member.hasPermission("MANAGE_MESSAGES")) return message.channel.send('Bạn cần quyền quản lý tin nhắn.')
        const channel = message.mentions.channels.first() || message.guild.channels.cache.get(args[0])
        if(!channel) return message.channel.send('Vui lòng chỉ định kênh')
        const word = args.slice(1).join(" ")
        if(!word) return  message.channel.send('Vui lòng chỉ định một từ để đoán.')

        const hang = new hangman({
            message: message,
            word: word,
            client: client,
            channelID: channel.id,
        })

        hang.start();
    }
}
