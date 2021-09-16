const { MessageEmbed } = require("discord.js");
const color = require('../../assets/json/colors.json')
const footer = require('../../assets/json/footer.json')
module.exports = {
  name: "queue",
  aliases: ["q"],
  description : '\`Để hiển thị hàng đợi bài hát:3\`',
  run: async (client, message, args) => {
    const { channel } = message.member.voice;
    if (!channel)
      return message.channel.send({embed:{
        description : `❌ \`Bạn phải ở trong kênh thoại để sử dụng lệnh này\` `
      }})
    if (message.guild.me.voice.channel !== message.member.voice.channel) {
      return message.channel.send({embed:{
        description : `❌ \`Bạn phải ở trong kênh với tư cách là bot\``
      }})
    }
    const serverQueue = client.queue.get(message.guild.id);
    if (!serverQueue)
      return message.channel.send({embed : {
        description : `❌ \`Không có bài nào được phát\``,
        color : color.error,
        footer : {
          text : footer.footertext,
          icon_url : footer.footericon
        }
      }})
    try {
      let currentPage = 0;
      const embeds = generateQueueEmbed(message, serverQueue.songs);
      const queueEmbed = await message.channel.send(
        embeds[currentPage]
      );
      await queueEmbed.react("⬅️");
      await queueEmbed.react("⏹");
      await queueEmbed.react("➡️");

      const filter = (reaction, user) =>
        ["⬅️", "⏹", "➡️"].includes(reaction.emoji.name) &&
        message.author.id === user.id;
      const collector = queueEmbed.createReactionCollector(filter);

      collector.on("collect", async (reaction, user) => {
        try {
          if (reaction.emoji.name === "➡️") {
            if (currentPage < embeds.length - 1) {
              currentPage++;
              queueEmbed.edit(
                `**Trang hiện tại - ${currentPage + 1}/${embeds.length}**`,
                embeds[currentPage]
              );
            }
          } else if (reaction.emoji.name === "⬅️") {
            if (currentPage !== 0) {
              --currentPage;
              queueEmbed.edit(
                `**Trang hiện tại- ${currentPage + 1}/${embeds.length}**`,
                embeds[currentPage]
              );
            } 
          } else {
            collector.stop();
            reaction.message.reactions.removeAll();
          }
          await reaction.users.remove(message.author.id);
        } catch {
          serverQueue.connection.dispatcher.end();
          return message.channel.send({embed :{
            description : `:x: \`Thiếu quyền [ADD_REACTIONS],[MANAGE_MESSAGES]\``
          }})
        }
      });
    } catch {
      serverQueue.connection.dispatcher.end();
      return message.channel.send({embed :{
            description : `:x: \`Thiếu quyền [ADD_REACTIONS],[MANAGE_MESSAGES]\``
          }})
    }
  }
};

function generateQueueEmbed(message, queue) {
  const embeds = [];
  let k = 10;
  for (let i = 0; i < queue.length; i += 10) {
    const current = queue.slice(i, k);
    let j = i;
    k += 10;
    const info = current
      .map(track => `**\`${++j} :\` -  [${track.title}](${track.url}) ${track.duration}**`)
      .join("\n");
    const embed = new MessageEmbed()
      .setTitle("Server Queue\n")
      .setColor(color.blue)
      .setDescription(
        `**\`Bài hát hiện tại:\` - [${queue[0].title}](${queue[0].url})**\n\n${info}`
      )
     .setFooter(footer.footertext, footer.footericon) 
    embeds.push(embed);
  }
  return embeds;
}
