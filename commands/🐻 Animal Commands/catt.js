const { MessageEmbed, MessageAttachment } = require('discord.js');
const { readdirSync, readFileSync } = require('fs');

module.exports = {
    name: 'catt',
    category: 'vui',
    description: '\`Show ảnh mèo xD ( nếu có ảnh mèo cute phô mai que thì hãy liên hệ với vinh để add vào nhé )\`',
    aliases: ['mèoo', 'meo', 'mew'],
    usage:".mèo",
    cooldown: 3,
    run: async (client, message, args) => {
        const folder = readdirSync("././assets/cat");
        const randomFile = folder[Math.floor(Math.random() * folder.length)];
        const file = readFileSync(`././assets/cat/${randomFile}`);
        const ext = randomFile.slice(-3);
        const attachment = new MessageAttachment(file, `cat.${ext}`);
        const embed = new MessageEmbed()
            .attachFiles(attachment)
            .setImage(`attachment://cat.${ext}`);
        message.channel.send(embed);
    },
};
