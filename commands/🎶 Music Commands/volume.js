const color = require('../../assets/json/colors.json')
const footer = require('../../assets/json/footer.json')
module.exports = {
        name: 'volume',
        aliases: ["vol"],
        description : '🔊\`thay đổi âm lượng nhạc:3\`',
       run: async (client, message, args) => {
        const { channel } = message.member.voice;
        if (!channel) return message.channel.send({embed : {
          description : `❌ \`Bạn phải là một kênh thoại để sử dụng lệnh này\``,
          color : color.error,
          footer : {
            text  : footer.footertext,
            icon_url : footer.footericon
          }
        }})
        if (message.guild.me.voice.channel !== message.member.voice.channel) {
            return message.channel.send({embed : {
              description : `❌ \`Bạn phải ở cùng kênh thoại với bot\``,
              color : color.error,
              footer : {
                text : footer.footertext,
                icon_url : footer.footericon
              }
            }})
          }
        const serverQueue = client.queue.get(message.guild.id);
        if (!serverQueue){
          message.channel.send({embed : {
            description : `❌ \`không có bài nào được phát\``,
            color : color.error,
            footer : {
              text : footer.footertext,
              icon_url : footer.footericon
            }
          }})
        }
        if (!args[0]) return message.channel.send({embed : {
          description : `🔊 \`Âm lượng hiện tại là:\` **${serverQueue.volume}**`, 
          color : color.blue,
          footer : {
            text : footer.footertext,
            icon_url : footer.footericon
          }
        }})
      try {
        serverQueue.volume = args[0];
        serverQueue.connection.dispatcher.setVolumeLogarithmic(args[0] / 5);
        return message.channel.send({embed : {
          description : `🔊 \`Đã thay đổi âm lượng thành :\` **${args[0]}**`,
          color : color.blue,
          footer : {
            text : footer.footertext,
            icon_url  : footer.footericon
          }
        }})
      } catch {
          return message.channel.send({embed:{
        description : `💥 \`Đã xảy ra lỗi trong hệ thống bot, hãy thử lại sau\``,
        color : color.boom,
        footer : {
          text : footer.footertext,
          icon_url : footer.footer.icon
        }
      }})
      }
    }
};
