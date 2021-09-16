const color = require('../../assets/json/colors.json')
const footer = require('../../assets/json/footer.json')
module.exports = {
        name: 'skip',
        aliases : ['s'],
        description : '\`chuyển sang bài hát tiếp theo:3\`',
        run: async (client, message, args) => {
        const { channel } = message.member.voice;
        if (!channel) return message.channel.send({embed : {
          description : `❌\`Bạn phải ở trong một kênh thoại để sử dụng lệnh này\``
        }});
        if (message.guild.me.voice.channel !== message.member.voice.channel) {
            return message.channel.send({embed : {
              description : `❌ \`Bạn phải ở cùng kênh với bot\``
            }})
          }
        const serverQueue = client.queue.get(message.guild.id);
        if (!serverQueue) return message.channel.send({embed : {
          description : `:x: \`Không có gì đang chơi\``
        }})
      try {
        serverQueue.connection.dispatcher.end();
        return message.channel.send({
          embed:{
          color: color.blue,
          description: `⏩ \`Đã bỏ qua bài hát cho bạn\``,
          footer : {
            text : footer.footertext,
            icon_url : footer.footericon
          } 
          
        }})
      } catch {
          serverQueue.connection.dispatcher.end();
          await channel.leave();
          return message.channel.send({embed:{
        description : `💥 \`Bot lỗi vui lòng thử lại sau\``,
        color : color.boom,
        footer : {
          text : footer.footertext,
          icon_url : footer.footer.icon
        }
      }})
      }
    }
};
