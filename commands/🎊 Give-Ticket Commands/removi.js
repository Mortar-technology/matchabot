module.exports = {
	name: 'remove',
	category: 'ticket',
	description: 'Xóa một thành viên đối với một ticket được chỉ định.',
	aliases: [],
	usage: 'remove <member>',
	userperms: ['ADMINISTRATOR'],
	botperms: [],
	run: async (client, message, args, prefix) => {
		if(message.channel.name.includes('ticket-')) {
			const member = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.guild.members.cache.find(x => x.user.username === args.slice(0).join(' ') || x.user.username === args[0]);
			if(!member) {
				return message.channel.send(`\`Sử dụng không chính xác! Cách sử dụng đúng: <prefix> remove <member>\``);
			}
			try{
				message.channel.updateOverwrite(member.user, {
					VIEW_CHANNEL: false,
					SEND_MESSAGES: false,
					ATTACH_FILES: false,
					READ_MESSAGE_HISTORY: false,
				}).then(() => {
					message.channel.send(`Đã xóa thành công ${member} từ ${message.channel}`);
				});
			}
			catch(e) {
				return message.channel.send('\`Có lỗi xảy ra. Vui lòng thử lại\`');
			}
		}
	},
};
