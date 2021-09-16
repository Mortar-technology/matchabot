module.exports = {
    name: "crush",
    category: "fun",
    aliases:['cr', 'ch', 'cru'],
    description: "Tìm ngẫu nhiên crush của bạn",
    usage:".cr để tìm đứa đang crush bạn đã lâu < lệnh random nên không cần tag ai>",
    run: async (client, message, args) => {
        message.delete()
        let person = message.guild.members.cache.filter(m => !m.user.bot && m.user.id !== message.author.id).random();
        if (!person) person = message.author;
        message.channel.send(`**${person.displayName}** \` nó đang muốn chơi thằng \` **${message.member.displayName}** \`từ lâu......:}\``);
    },
};
