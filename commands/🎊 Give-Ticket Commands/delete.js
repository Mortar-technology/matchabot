module.exports = {
	name: 'delete',
	category: 'ticket',
	description: 'Xóa một vé được chỉ định',
	aliases: [],
	usage: 'delete',
	userperms: ['SEND_MESSAGES'],
	botperms: [],
	run: async (client, message, args) => {
		if(message.channel.name.includes('ticket-')) {
			message.channel.delete();
		}
		else {
			return message.reply('bạn không thể sử dụng lệnh này ở đây. Vui lòng sử dụng lệnh này khi bạn muốn xóa một vé');
		}
	},
};
