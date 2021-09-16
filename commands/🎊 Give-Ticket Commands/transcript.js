const sourcebin = require('sourcebin_js');
const { MessageEmbed } = require('discord.js');

module.exports = {
	name: 'transcript',
	category: 'ticket',
	description: '\`Bản ghi một phiếu cụ thể\`',
	aliases: [],
	usage: 'transcript',
	userperms: [],
	botperms: [],
	run: async (client, message, args) => {
		const channel = message.mentions.channels.first() || message.guild.channels.cache.get(args[0]) || message.channel;
		if (channel.name.includes('ticket-')) {
			if (message.member.hasPermission('ADMINISTRATOR') || channel.name === `ticket-${message.author.id}`) {
				channel.messages.fetch().then(async (messages) => {
					const output = messages.array().reverse().map(m => `${new Date(m.createdAt).toLocaleString('en-US')} - ${m.author.tag}: ${m.attachments.size > 0 ? m.attachments.first().proxyURL : m.content}`).join('\n');

					let response;
					try {
						response = await sourcebin.create([
							{
								name: ' ',
								content: output,
								languageId: 'text',
							},
						], {
							title: `Bản ghi cuộc trò chuyện cho ${channel.name}`,
							description: ' ',
						});
					}
					catch(e) {
						return message.channel.send('\`Có lỗi xảy ra. Vui lòng thử lại!\`');
					}

					const embed = new MessageEmbed()
						.setDescription(`[\`📄 Lượt xem\`](${response.url})`)
						.setColor('RANDOM');
					message.reply('\`bảng điểm đã hoàn thành. Vui lòng nhấp vào liên kết bên dưới để xem bảng điểm\`', embed);
				});
			}
		}
		else {
			return message.reply(
				'\`bạn không thể sử dụng lệnh này ở đây. Vui lòng sử dụng lệnh này trong một vé ( ticket ) mở\`',
			);
		}
	},
};
