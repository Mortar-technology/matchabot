const { MessageEmbed } = require("discord.js");
const { promptMessage } = require("../../include/utils");
const { getMember } = require('../../include/utils');
module.exports = {
    name: "kick",
    category: "fun",
    description: "Kick 1 người trong server",
    usage: "<PREIFX>kick <@tag, id> [lý do]",
    run: async (client, message, args) => {

        const logChannel = message.guild.channels.cache.get() || message.channel;

        if (message.deletable) message.delete();

        // No args
        if (!args[0]) return message.reply("\`Tag tên người dùng để kick\`").then(m => m.delete({ timeout: 5000 }));
        const reason = args.slice(1).join(' ') || "Không có lý do.";

        // No author permissions
        if (!message.member.hasPermission("KICK_MEMBERS")) {
            return message.reply("\`❌ Ảo ma canada.... Hãy làm MOD đi rồi quay lại thử lại sau nhé!\`")
                .then(m => m.delete({ timeout: 5000 }));
        }

        // No bot permissions
        if (!message.guild.me.hasPermission("KICK_MEMBERS")) {
            return message.reply("\`❌ Tôi không có quyền\`")
                .then(m => m.delete({ timeout: 5000 }));
        }

        const toKick = await getMember(message, args.join(' '), false);
        // No member found
        if (!toKick) {
            return message.reply("\`Không tìm thấy người dùng này\`")
                .then(m => m.delete({ timeout: 5000 }));
        }

        // Can't kick urself
        if (toKick.id === message.author.id) {
            return message.reply("\`Không thể kick bản thân\`")
                .then(m => m.delete({ timeout: 5000 }));
        }

        // Check if the user's kickable
        if (!toKick.kickable) {
            return message.reply("\`Role họ cao hơn tôi\`")
                .then(m => m.delete({ timeout: 5000 }));
        }

        const embed = new MessageEmbed()
            .setColor("#ff0000")
            .setThumbnail(toKick.user.displayAvatarURL())
            .setFooter(message.member.displayName, message.author.displayAvatarURL())
            .setTimestamp()
            .addField('\`Matcha Synthetic KÍCK\`', [
                `**- Đã kick:** ${toKick} (${toKick.id})`,
                `**- Người kick:** ${message.member} (${message.member.id})`,
                `**- Lý do:** ${reason}`,
            ]);

        const promptEmbed = new MessageEmbed()
            .setColor("RANDOM")
            .setAuthor(`Hãy trả lời trong 30s.`)
            .setDescription(`Bạn có muốn kick ${toKick}?`);

        // Send the message
        await message.channel.send(promptEmbed).then(async msg => {
            // Await the reactions and the reaction collector
            const emoji = await promptMessage(msg, message.author, 30, ["✅", "❌"]);

            // The verification stuffs
            if (emoji === "✅") {
                try {
                    if (message.deletable) msg.delete();
                    await toKick.send(`Alo ông vừa bị kick ra khỏi server \`${toKick.guild.name}\`. Lý do: \`${args.slice(1).join(' ')}\``);
                    toKick.kick(reason);
                    logChannel.send(embed);
                }
                catch(err) {
                    if (err.message.includes("Cannot send messages to this user")) {
                        toKick.kick(reason);
                        logChannel.send(embed);
                    }
                    else return message.channel.send(`Bị lỗi khi kick: ${err.message}`);
                };
            } else if (emoji === "❌") {
                msg.delete();
                message.reply(`Đã huỷ kick.`)
                    .then(m => m.delete({ timeout: 10000 }));
            }
        });
    },
};
