module.exports = {
	name: 'new',
	category: 'ticket',
	description: 'Tạo một vé mới.',
	aliases: [],
	usage: 'new',
	run: async (client, message, args, prefix) => {
		if(message.guild.channels.cache.find(channel => channel.name === `ticket-${message.author.id}`)) {
			return message.reply('bạn đã có vé, vui lòng đóng vé hiện có trước khi mở vé mới!');
		}

		message.guild.channels.create(`ticket-${message.author.id}`, {
			permissionOverwrites: [
				{
					id: message.author.id,
					allow: ['SEND_MESSAGES', 'VIEW_CHANNEL'],
				},
				{
					id: message.guild.roles.everyone,
					deny: ['VIEW_CHANNEL'],
				},
			],
			type: 'text',
		}).then(async channel => {
			message.reply(`bạn đã tạo thành công một vé! Vui lòng nhấp vào ${channel} để xem vé của bạn.`);
			channel.send(`chào ${message.author}, chào mừng bạn đến với ticket của bạn! Hãy kiên nhẫn, chúng tôi sẽ có mặt với bạn ngay sau đây. Nếu bạn muốn ticket này, vui lòng chạy \`<prefix>close\``);
			let logchannel = message.guild.channels.cache.find(channel => channel.name === `ticket-logs`)
			if(logchannel) {
				logchannel.send(`Ticket ${message.author.id} tạo. Bấm vào phần sau để xem <#${channel.id}>`);
			}
		});
	},
};
