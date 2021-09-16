const math = require('mathjs');
const { MessageEmbed } = require("discord.js");
module.exports = {
    name: "calc",
    aliases: ['mt', 'máy tính', 'tính toán'],
    category: "",
    usage:"( .mt < phép tính > )",
    description: "\`+-x: các phép toán toán nào cũng giải được\`",
    run: async (client, message, args) => {
        if (!args[0]) return message.reply("\`Nhập phép tính để tính chứ bạn ơi :(\`");
        try {
            const resp = math.evaluate(args.join(' '));
            const embed = new MessageEmbed()
                .setColor(0xffffff)
                .setTitle('Matcha Synthetic')
                .addField('Phép toán', `\`\`\`${args.join(' ')}\`\`\``)
                .addField('Kết quả', `\`\`\`js\n${resp}\`\`\``);
            message.channel.send(embed);
        } catch (e) {
            return message.channel.send("Bạn nhập phép tính sai rồi mình không giải được :(");
        }
    },
};
