const { MessageEmbed } = require("discord.js");
const { promptMessage } = require('../../include/utils');
const { getMember } = require('../../include/utils');
module.exports = {
    name: "ban",
    category: "",
    aliases:['bn','out', 'biến', 'cút'],
    description: "\`Ban người dùng khỏi server\`",
    run: async(client,message, args) => {
        const logChannel = message.guild.channels.cache.get() || message.channel;

        if (message.deletable) message.delete();

        // No args
        if (!args[0]) return message.reply("\`Hãy tag tên người dùng cần ban?\`").then(m => m.delete({ timeout: 5000 }));
        const reason = args.slice(1).join(' ') || "\`Không có\`";

        // No author permissions
        if (!message.member.hasPermission("BAN_MEMBERS")) {
            return message.reply("\`❌ Lên làm admin server đi rồi hãng đòi ban người khác\`")
                .then(m => m.delete({ timeout: 5000 }));

        }
        // No bot permissions
        if (!message.guild.me.hasPermission("BAN_MEMBERS")) {
            return message.reply("\`❌ Tôi không có quyền ban người khác!\`")
                .then(m => m.delete({ timeout: 5000 }));
        }

        const toBan = await getMember(message, args.join(' '), false);

        // No member found
        if (!toBan) {
            return message.reply("\`Không tìm thấy người dùng\`")
                .then(m => m.delete({ timeout: 5000 }));
        }

        // Can't ban urself
        if (toBan.id === message.author.id) {
            return message.reply("\`Không thể ban bản thân\`")
                .then(m => m.delete({ timeout: 5000 }));
        }

        // Check if the user's banable
        if (!toBan.bannable) {
            return message.reply("\`Role họ cao hơn tôi thì sao ban được?\`")
                .then(m => m.delete({ timeout: 5000 }));
        }

        const embed = new MessageEmbed()
            .setColor("#ff0000")
            .setThumbnail(toBan.user.displayAvatarURL())
            .setFooter(message.member.displayName, message.author.displayAvatarURL())
            .setTimestamp()
            .addField('\`Matcha Synthetic BAN :))\`', [
                `**- Đã đá thằng:** ${toBan} (${toBan.id})`,
                `**- Người đá:** ${message.member} (${message.member.id})`,
                `**- Lý do:** ${reason}`,
            ]);

        const promptEmbed = new MessageEmbed()
            .setColor("RANDOM")
            .setAuthor(`\`Hãy trả lời trong 60s\``)
            .setDescription(`Bạn có muốn ban ${toBan}?`);

        // Send the message
        await message.channel.send(promptEmbed).then(async msg => {
            // Await the reactions and the reactioncollector
            const emoji = await promptMessage(msg, message.author, 60, ["✅", "❌"]);

            // Verification stuffs
            if (emoji === "✅") {
                try {
                    if (msg.deletable) msg.delete();
                    await toBan.send(`Alo ông vừa bị ban ở server \`${toBan.guild.name}\` Ông xem lại thế nào đi chứ. Lý do ông bị ban: \`${reason}\``);
                    toBan.ban({ reason: reason });
                    logChannel.send(embed);
                }
                catch(err) {
                    if (err.message.includes("Cannot send messages to this user")) {
                        toBan.ban({ reason: reason });
                        logChannel.send(embed);
                    }
                    else return message.channel.send(`\`Bị lỗi khi ban: ${err.message}\``);
                };
            } else if (emoji === "❌") {
                msg.delete();
                message.reply(`\`Đã huỷ ban\``)
                    .then(m => m.delete({ timeout: 10000 }));
            }
        });
    },
};
