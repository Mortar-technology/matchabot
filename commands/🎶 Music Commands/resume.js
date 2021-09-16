const color = require('../../assets/json/colors.json')
const footer = require('../../assets/json/footer.json')

module.exports = {
        name: 'resume',
        aliases : ['re'],
        description : '\`Để tiếp tục nhạc đang phát:3\`',
        
    run: async (client, message, args) => {
        const { channel } = message.member.voice;
        if (!channel) { 
          
          message.channel.send({embed : {
            description : `❌ \`Bạn phải ở trong một kênh thoại trước khi sử dụng lệnh này\``,
            color : color.error,
            footer : {
              text : footer.footertext,
              icon_url : footer.footericon
            }
          }}).then(msg=>msg.react('❌'))
                      }
        const serverQueue = client.queue.get(message.guild.id);


        if (message.guild.me.voice.channel !== message.member.voice.channel) {
            return message.channel.send({embed : {
            description : `❌ \`Bạn phải ở cùng kênh thoại với bot\``,
            color : color.error,
            footer : {
              text : footer.footertext,
              icon_url : footer.footericon
            }
          }}).then(msg=>msg.react('❌'))
      try {
        if (serverQueue && !serverQueue.playing) {
            serverQueue.playing = true;
            serverQueue.connection.dispatcher.resume();
            return message.channel.send({embed:{
color: color.blue,                                       
description: `▶ \`Tiếp tục phát bài hát cho bạn\``,
footer : {
  text : footer.footertext,
  icon_url : footericon
}

}}).then(msg=>msg.react('▶️'))
        }
        return message.channel.send({embed : {
          description : `❌ \`Không có nhạc để phát\``,
          color : color.error,
          footer :  {
            text : footer.footertext,
            icon_url : footer.footericon
          }
        }}).then(msg=>msg('❌'))
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
      }}).then(msg=>msg.react('💥'));
      }
  }
  }
};
