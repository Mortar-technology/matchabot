const figlet = require('figlet');
const config = require('../../config.json');

module.exports = {
    name: "ascii",
    category: "Fun",
    description: "\`Chuyển văn bản chữ sang dạng ASCII\`",
    usage: `${config.Prefix}ascii Hi`,

    run: async (client, message, args) => {
        if(!args[0]) return message.channel.send('Vui lòng nhập chữ để chuyển đổi');

        msg = args.join(" ");

        figlet.text(msg, function (err, data){
            if(err){
                console.log('Something went wrong');
                console.dir(err);
            }
            if(data.length > 2000) return message.channel.send('\`Vui lòng chỉ cấp văn bản dưới 2000 kí tự\`')

            message.channel.send('```' + data + '```')
        })
    }
}
