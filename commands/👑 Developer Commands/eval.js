const Discord = require('discord.js');
const config = require('../../config.json');
const beautify = require('beautify');
const emoji = require('../../assets/json/emoji.json')

module.exports = {
    name: "eval", 
    aliases: ["e", "evaluate"],
    category: "Developer",
    description: "Đánh giá mã bạn đưa vào nhưng nó chỉ có sẵn cho Nhà phát triển của tôi và không ai khác!!!!!",
    example: `${config.Prefix}eval [js string]`,

    run: async (client, message, args) => { 

        if (message.author.id !== config.Owner) {
            return;
        }
        
        if (!args[0]) {
            return;
        }

        try{
            if (args.join(" ").toLowerCase().includes("token")) {
                return;
            }
        
            const toEval = args.join(" ");
            const evaluated = eval(toEval); 

            let embed = new Discord.MessageEmbed()
            .setColor("#00FF00")
            .setTimestamp()
            .setFooter(client.user.username)
            .setTitle("Eval")
            .addField("To Evaluate", `\`\`\`js\n${beautify(args.join(" "), { format: "js"})}\n\`\`\``)
            .addField("Evaluated:", `\`\`\`${evaluated}\`\`\``)
            .addField("Type of:", `\`\`\`${typeof(evaluated)}\`\`\``);

            message.channel.send(embed);

        } catch (e) {
            let embed = new Discord.MessageEmbed()
            .setColor("#FF0000")
            .setTitle(`${emoji.Error} Error!`)
            .setDescription(e)

            message.channel.send(embed);

        }

    }

}
