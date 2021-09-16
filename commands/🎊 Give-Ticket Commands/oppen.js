module.exports = {
	name: 'open',
	category: 'ticket',
	description: 'Mở lại một ticket.',
	aliases: [],
	usage: 'open',
	userperms: ['ADMINISTRATOR'],
	botperms: [],
	run: async (client, message, args) => {
		if (message.channel.name.includes('ticket-')) {
			const member = message.guild.members.cache.get(message.channel.name.split('ticket-').join(''));
			try {
				message.channel.updateOverwrite(member.user, {
					VIEW_CHANNEL: true,
					SEND_MESSAGES: true,
					ATTACH_FILES: true,
					READ_MESSAGE_HISTORY: true,
				})
					.then(() => {
						message.channel.send(`Đã mở lại thành công ${message.channel}`);
					});
			}
			catch (e) {
				return message.channel.send('Có lỗi xảy ra. Vui lòng thử lại!');
			}
		}
		else {
			return message.reply(
				'bạn không thể sử dụng lệnh này ở đây. Vui lòng sử dụng lệnh này trên một ticket đã đóng.',
			);
		}
	},
};
