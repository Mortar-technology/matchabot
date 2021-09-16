const Discord = require("discord.js");
const color = require('../../assets/json/colors.json')
const footer = require('../../assets/json/footer.json')
module.exports = {
  name: "nowplaying",
  aliases: ["np"],
  description :'😂\`Để hiển thị bài hát đang phát:3\`',
  run: async (client, message, args) => {
    const Channel = message.member.voice.channel;

    if (!Channel) return message.channel.send({embed:{
      description : `❌\`Bạn phải ở trong kênh thoại để sử dụng lệnh này\``
    }})

        if (message.guild.me.voice.channel !== message.member.voice.channel) {
      return message.channel.send({embed:{
        description : `❌\`Bạn phải ở cùng kênh với bot\``
      }})
    }


    const serverQueue = message.client.queue.get(message.guild.id);
        if (!serverQueue)
      return message.channel.send({embed:{
        description : `❌\`Không có bài hát nào cả hãy thử thêm một số bài hát\``
      }})
    let song = serverQueue.songs[0]
    let embed = new Discord.MessageEmbed()
      .setTitle("Matcha Synthetic đang hát:")
      .setThumbnail(song.img)
      .setColor(color.blue)
      .setDescription(`
      **Tên bài hát: \`${song.title}\`
      Thời lượng bài hát: \`${song.duration}\`
      Người yêu cầu bài hát: \`${song.req.tag}\` **`)
      .setFooter(footer.footertext, footer.footericon)
    return message.channel.send(embed).then(msg=>msg.react('🔘'))
  }
};
