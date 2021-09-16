module.exports = {
    name: "pick",
    aliases:['random', 'pk', 'ngẫu nhiên'],
    category: "fun",
    description:"\`Chọn ngẫu nhiên 2 phương án hộ bạn\`",
    usage:".pick < 2 phương án VD: .random chơi gái, học bài >",
    run: async (client, message, args) => {
        if (!args[0] || !args[1]) return message.channel.send('\`Sai cú pháp tin nhắn vui lòng xem lại VD: .pick chơi gái, học bài\`');
        const pickWordlist = args.join(' ').split(',');
        message.channel.send(pickWordlist[Math.floor(Math.random() * pickWordlist.length)]);
    },
};
