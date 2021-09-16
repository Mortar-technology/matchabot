const color = require('../../assets/json/colors.json')
const footer = require('../../assets/json/footer.json')
module.exports = {
  name: "skipto",
  alisases : ['st'],
  description : '\`Để chuyển sang một bài hát cụ thể:3\`',

  run: async (client, message, args) => {
    if (!args[0])
      return message.channel.send({embed : {
        description : `❌ \`Vui lòng cung cấp số bài hát từ hàng đợi\``,
        color : color.error,
        footer : {
          text : footer.footertext,
          icon_url : footer.footericon
        }
      }})

    const { channel } = message.member.voice;
    if (!channel) return message.channel.send({embed : {
      description : `❌\`Bạn phải ở trong kênh thoại để sử dụng lệnh này\``,
      color : color.error,
      footer : {
        text : footer.footertext,
        icon_url : footer.footericon
      }
    }})
    const serverQueue = client.queue.get(message.guild.id);
    if (!serverQueue) {
      message.channel.send({embed:{
        description : `❌ \`Bạn phải ở trong kênh thoại để sử dụng lệnh này\``,
        color : color.error,
        footer : {
          text : footer.footertext,
          icon_url : footer.footericon
        }
      }})
    }

    if (message.guild.me.voice.channel !== message.member.voice.channel) {
      return message.channel.send({embed:{
          description : `❌ \`Bạn phải ở trong kênh thoại để sử dụng lệnh này\``,
          color : color.error,
          footer : {
            text : footer.footertext,
            icon_url : footer.footericon
          }
        }})
    }

    if (args[0] < 1 && args[0] >= serverQueue.songs.length) {
      return message.channel.send({embed : {
        description : `❌ \`Vui lòng cung cấp số bài hát hợp lệ từ hàng đợi\``,
        color : color.error,
        footer : {
          text : footer.footertext,
          icon_url : footer.footericon
        }
      }})
    }
    try {
      serverQueue.songs.splice(0, args[0] - 2);
      serverQueue.connection.dispatcher.end();
      return;
    } catch {
      serverQueue.connection.dispatcher.end();
      await channel.leave();
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
