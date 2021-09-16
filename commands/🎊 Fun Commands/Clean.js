module.exports = {
    name: 'clean',
    aliases:['botcl', 'cln', 'xtncb'],
    category: 'fun',
    usage:".botcl < Số tin nhắn mà bạn muốn xoá vd: .clean 10 >",
    description: "\`Xoá các tin nhắn của BOT\`",
    run: async (client, message, args) => {
        if (message.deletable) await message.delete();
        message.channel.messages.fetch({
            limit: 50,
        }).then(async messages => {
            messages = messages.filter(msg => msg.author.id === client.user.id).array();
            await message.channel.bulkDelete(messages, true);
            await message.channel.send('\`ĐÃ SÓA TIN NHẮN CỦA BOT THEO YÊU CẦU CỦA BẠN\`').then(m => m.delete({ timeout: 10000 }));
        });
    },
};
