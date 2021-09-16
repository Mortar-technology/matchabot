const color = require('../../assets/json/colors.json')
const footer = require('../../assets/json/footer.json')

module.exports = {
  name: "pause",
  aliases : ['ps'],
  description : '▶️\`tạm dừng nhạc đang phát:3\`',
  run: async (client, message, args) => {
    const serverQueue = client.queue.get(message.guild.id);
    const { channel } = message.member.voice;
    try {
      if (!channel)
        return message.channel.send({embed:{
          description : `❌ \`Bạn phải ở trong kênh thoại để sử dụng lệnh này\``
          
        }})
      if (message.guild.me.voice.channel !== message.member.voice.channel) {
        return message.channel.send({embed:{
          description : `❌ \`Bạn phải ở cùng kênh với bot\``
        }})
      }
      if (serverQueue && serverQueue.playing) {
        serverQueue.playing = false;
        serverQueue.connection.dispatcher.pause(true);
        return message.channel.send({
          embed: {
            color: color.blue,
            description : `⏸️ \`Đã tạm dừng nhạc cho bạn\``
          }
        })
      }
      return message.channel.send({embed : {
        description : `:x: \`Không có bài nhạc nào\``
      }})
    } catch {
      serverQueue.connection.dispatcher.end();
      await channel.leave();
    }
  }
};
