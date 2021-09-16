const { MessageEmbed } = require("discord.js");
const { getMember } = require('../../include/utils');

module.exports = {
    name: "love",
    category: "fun",
    description: "\`Người khác yêu bạn cỡ nào?\`",
    usage: ".love <@tag, id VD: .love @Matcha Tea#0001 >",
    run: async (client, message, args) => {
        // Get a member from mention, id, or username
        const person = await getMember(message, args.join(' '));

        if (!person || !args[0]) return message.channel.send('Hãy tag ai đó đi!');
        const love = Math.random() * 100;
        const loveIndex = Math.floor(love / 10);
        const loveLevel = "💖".repeat(loveIndex) + "💔".repeat(10 - loveIndex);

        const embed = new MessageEmbed()
            .setColor("#ffb6c1")
            .addField(`☁ **${person.displayName}** **${message.member.displayName}**`,
                `💟 ${Math.floor(love)}%\n\n${loveLevel}`);

        message.channel.send(embed);
    },
};
