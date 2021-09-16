const Discord = require('discord.js');
const emoji = require('../../assets/json/emoji.json');
const config = require('../../config.json');

module.exports = {
  name: "nickname",
  aliases: ["setnickname", "nick"],
  description: "✅\`Đặt biệt hiệu cho người dùng được đề cập hoặc ID được cung cấp từ guild này\`",
  usage: `!nickname @tag biệt hiệu "Cool"`,
  category: "fun",

   run: async (client, message, args) => {
    const user = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
    const perms = ["MANAGE_NICKNAMES" || "ADMINSTRATOR"];
    const doggo = message.guild.members.cache.get(client.user.id);
    let nickname = args[1];

    if(!message.member.hasPermission(perms)) 
    return message.reply("❌\`Bạn không có quyền hạn để làm việc này\`")
    .then(msg => {
      msg.delete({ timeout: 20000 })
    });

    if(!doggo.hasPermission(perms))
    return message.reply("❌\`Tôi không có quyền cấm người dùng, vui lòng cho phép cấp cho tôi ROLE tương ứng\`");

    if(!user)
    return message.reply("❌\`Vui lòng đề cập hoặc cung cấp ID của người dùng từ guild này || VD: !nick @thanhf viên [ biệt danh ]\`")

    if (!args[1]) 
    return message.reply("❌\`Vui lòng cung cấp biệt hiệu\`");

    if (nickname.startsWith('"')) {
    nickname = message.content.slice(message.content.indexOf(args[1]) + 1);

    if (!nickname.includes('"')) 
    return message.reply("❌\`Hãy đảm bảo rằng biệt hiệu được bao quanh trong dấu ngoặc kép\`");

    if (user.roles.highest.position > message.member.roles.highest.position)
    return message.reply("❌\`Bạn không thể cấm ai đó có vai trò ngang hàng hoặc cao hơn với bạn !!! hoặc nếu bạn là chủ sở hữu, hãy tự mình ở một vị trí cao hơn\`")
    
    
    if (user.roles.highest.position > doggo.roles.highest.position)
    return message.reply("❌\`Bạn không thể cấm ai đó có vai trò ngang bằng hoặc cao hơn tôi\`")

    nickname = nickname.slice(0, nickname.indexOf('"'));
    if (!nickname.replace(/\s/g, '').length)
    return message.reply("❌\`Vui lòng cung cấp biệt hiệu để đặt cho ai đó\`");
    }

    if (nickname.length > 32) {
    return message.reply("❌\`Biệt hiệu được cung cấp quá lớn, vui lòng cung cấp biệt hiệu ít hơn 32 ký tự\`");


    } else {

      let reason;
      if (args[1].startsWith('"'))
      reason = message.content.slice(message.content.indexOf(nickname) + nickname.length + 1);
      else reason = message.content.slice(message.content.indexOf(nickname) + nickname.length);

      if (!reason) reason = '`-`';
      if (reason.length > 1024) reason = reason.slice(0, 1021) + '...';
      
      try {
      
        const oldNickname = user.nickname || user.user.username;
        const changelog = `From \`${oldNickname}\` to \`${nickname}\``;

        await user.setNickname(nickname);

        const embed = new Discord.MessageEmbed()
          .setTitle('💯 Biệt hiệu đã được thay đổi 💯')
          .setDescription(`✔️ <@${user.id}> (\`${user.user.tag}\`) biệt hiệu đã được thay đổi thành công !!`)
          .addField('Thay đổi bởi ', `<@${message.member.id}>\n(\`${message.member.user.tag}\`)`, true)
          .addField('Người dùng đã thay đổi', `<@${user.id}>\n(\`${user.user.tag}\`)`, true)
          .addField('Changelog', changelog, true)
          .setFooter(`Bot made in Nguyễn Vinh | yêu cầu bởi: ${message.member.displayName}`,  message.author.displayAvatarURL({ dynamic: true }))
          .setTimestamp()
          .setColor(message.guild.me.displayHexColor);
        await message.channel.send(embed);
      
      } catch (err) {
        message.reply(`❌\`Vui lòng kiểm tra vị trí vai trò\` `, err.message);
      }
    }  
  }
}
