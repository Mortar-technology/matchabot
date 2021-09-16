const color = require('../../assets/json/colors.json')
const footer = require('../../assets/json/footer.json')
const {MessageEmbed} = require('discord.js')
module.exports = {
        name: 'stop',
        aliases : ['leave'],
        description :  '\`Để cho bot rời khỏi kênh và xóa hàng đợi:3\`',
        
    run: async (client, message, args) => {
        const { channel } = message.member.voice;
        if (!channel){ message.channel.send({embed :{
          description : `❌\`Bạn phải ở trong kênh thoại để sử dụng lệnh này\``,
          color  : color.error,
          footer : {
            text : footer.footertext,
            icon_url : footer.footericon
          }
        }})        }
        if (message.guild.me.voice.channel !== message.member.voice.channel) {
            return message.channel.send({embed : {
              description : `❌ \`Bạn phải ở cùng kênh với bot\` `
            }})
          }
        const serverQueue = client.queue.get(message.guild.id);
      try {
        if (serverQueue) {
        serverQueue.songs = [];
        serverQueue.connection.dispatcher.end()
        message.guild.me.voice.channel.leave();
        } else {
        channel.leave();
        }
        return message.channel.send({embed: {
          description: `🛑 \`Được rồi, tôi đi đây :'(\``,
          color : color.error,
          footer : {
            text : footer.footertext,
            icon_url : footer.footericon
          }
          
          }})
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
