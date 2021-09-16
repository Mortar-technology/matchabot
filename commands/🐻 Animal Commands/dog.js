const axios = require('axios');
const { MessageEmbed } = require("discord.js");
module.exports = {
    name: "dog",
    category: "convat",
    aliases: ['cún', 'chó', 'gâu'],
    description: "\`Gởi ảnh/video về cún, chó 🐶\`",
    usage:".chó",
    run: async(client,message, args) => {
        try {
            const response = await axios.get('https://random.dog/woof.json');
            const embed = new MessageEmbed()
                .setTitle('Dogs <3')
                .setURL(response.data.url)
                .setImage(response.data.url);
            message.channel.send(embed);
        }
        catch(e) {
            console.log(e);
            return message.channel.send('Bot lỗi, vui lòng thử lại sau!');
        }
    },
};
