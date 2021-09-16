const { Client, Message, MessageEmbed } = require("discord.js");

module.exports = {
  name: "firstmessage",
  aliases:"1msg",
  description: "\`Xem lại tin nhắn đầu tiên của channell :))\`",
  /**
   * @param {Client} client
   * @param {Message} message
   * @param {String[]} args
   */
  run: async (client, message, args) => {
    const fetchMessages = await message.channel.messages.fetch({
      after: 1,
      limit: 1,
    });
    const msg = fetchMessages.first();

    message.channel.send(
      new MessageEmbed()
        .setTitle(`Tin nhắn đầu tiên trong ${message.guild.name}`)
        .setURL(msg.url)
        .setThumbnail(msg.author.displayAvatarURL({ dynamic: true }))
        .setDescription("Nội dung: " + msg.content)
        .addField("Tác giả", msg.author, true)
        .addField('ID tin nhắn', msg.id, true)
        .addField('Được tạo lúc', message.createdAt.toLocaleDateString(), true)
    );
  },
};
