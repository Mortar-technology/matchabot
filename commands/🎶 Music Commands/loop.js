const color = require('../../assets/json/colors.json')
const footer = require('../../assets/json/footer.json')

module.exports = {
  name: "loop",
  aliases: ["repeat"],
  description : '🎙️\`lặp lại bài hát đang phát: 3\`',
  run: async (client, message, args) => {
    const { channel } = message.member.voice;
    if (!channel)
      return message.channel.send({embed : {
        description : `❌\`Bạn phải ở trong một kênh thoại để sử dụng lệnh này\``
      }})
    const serverQueue = client.queue.get(message.guild.id);
    try {
      if (!serverQueue)
        return message.channel.send({embed : {
          description : `❌ \`Không có bài nào để phát lại hãy thử thêm một số bài hát\``
        }})
      if (message.guild.me.voice.channel !== message.member.voice.channel) {
        return message.channel.send({embed:{
          description : `❌\`Bạn phải ở cùng kênh với bot\``
        }})
      }
      if (!serverQueue.loop) {
        serverQueue.loop = true;
        return message.channel.send({
          embed:{
        color: color.blue,
        description: `🔁 \`Vòng lặp hiện đã được bật\``
        }})
      } else {
        serverQueue.loop = false;
        return message.channel.send(
          {embed: {
            description : `🔁 \`Vòng lặp hiện đã bị vô hiệu hóa\``
          }})
      }
    } catch {
      serverQueue.connection.dispatcher.end();
      await channel.leave();
      return message.channel.send({embed:{
        description : `💥 \`Đã xảy ra lỗi trong hệ thống BOT, hãy thử lại sau\``
      }})
    }
  }
};
