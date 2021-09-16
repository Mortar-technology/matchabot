module.exports = {

	name: 'add',	category: 'ticket',

	description: 'Thêm một thành viên vào một vé được chỉ định.',

	aliases: [],

	usage: 'add <member>',

	userperms: ['ADMINISTRATOR'],

	botperms: [],

	run: async (client, message, args, prefix) => {

		if(message.channel.name.includes('ticket-')) {

			const member = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.guild.members.cache.find(x => x.user.username === args.slice(0).join(' ') || x.user.username === args[0]);

			if(!member) {

				return message.channel.send(`Sử dụng không chính xác! Cách sử dụng đúng:<prefix>add <member>`);

			}

			try{

				message.channel.updateOverwrite(member.user, {

					VIEW_CHANNEL: true,

					SEND_MESSAGES: true,

					ATTACH_FILES: true,

					READ_MESSAGE_HISTORY: true,

				}).then(() => {

					message.channel.send(`Thêm thành công ${member} Đến ${message.channel}`);

				});

			}

			catch(e) {

				return message.channel.send('Có lỗi xảy ra. Vui lòng thử lại!');

			}

		}

	},

};
