const sourcebin = require('sourcebin_js');
const { MessageEmbed } = require('discord.js');

module.exports = {
	name: 'close',
	category: 'ticket',
	description: 'Đóng vé',
	aliases: [],
	usage: 'close',
	userperms: [],
	botperms: [],
	run: async (client, message, args) => {
		if(message.channel.name.includes('ticket-')) {
			const member = message.guild.members.cache.get(message.channel.name.split('ticket-').join(''));
			if(message.member.hasPermission('ADMINISTRATOR') || message.channel.name === `ticket-${message.author.id}`) {
				message.channel.messages.fetch().then(async (messages) => {
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
							title: `Bản ghi cuộc trò chuyện cho ${message.channel.name}`,
							description: ' ',
						});
					}
					catch(e) {
						return message.channel.send('Có lỗi xảy ra. Vui lòng thử lại!');
					}

					const embed = new MessageEmbed()
						.setDescription(`[\`📄 View\`](${response.url})`)
						.setColor('GREEN');
					member.send('Đây là bảng điểm của vé của bạn, vui lòng nhấp vào liên kết bên dưới để xem bảng điểm ', embed);
				}).then(() => {
					try {
						message.channel.updateOverwrite(member.user, {
							VIEW_CHANNEL: false,
							SEND_MESSAGES: false,
							ATTACH_FILES: false,
							READ_MESSAGE_HISTORY: false,
						}).then(() => {
							message.channel.send(`Đã đóng thành công ${message.channel}`);
						});
					}
					catch(e) {
						return message.channel.send('Có lỗi xảy ra. Vui lòng thử lại!');
					}
				});
			}
		}
		else {
			return message.reply('\`bạn không thể sử dụng lệnh này ở đây. Vui lòng sử dụng lệnh này khi bạn đang đóng một vé\`');
		}
	},
};
