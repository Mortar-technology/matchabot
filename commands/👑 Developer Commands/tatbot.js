const emoji = require('../../assets/json/emoji.json');
const config = require('../../config.json');

module.exports = {
    name: "🐐tatbot",
    aliases: ["tatbot"],
    description: "🇻🇳\`Tắt bot\`",
    category: "Developer",
    usage:"!tatbot",

    run: async(client, message, args) => {
        
        if (message.author.id !== config.Owner) {
            return;
        }
        
        await message.channel.send("✅\`Bot hiện đã bị tắt\`")
        process.exit()
    }
}
