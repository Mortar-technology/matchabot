const Discord = require('discord.js');
const emoji = require('../../assets/json/emoji.json');
const config = require('../../config.json');

module.exports = {
    name: "unban",
    category: "Moderation",
    description: "Unbans the banned user with the provided user ID",
    example: `${config.Prefix}unban 4389334384384323 Innocent`,

    run: async (client, message, args) => {

        const id = args[0];
        const Banned = await message.guild.fetchBans();
        const user = Banned.get(id).user;
        const Perms = ["BAN_MEMBERS" || "ADMINSTRATOR"] 
        const doggo = message.guild.members.cache.get(client.user.id);

        
        if(!message.member.hasPermission(Perms)) 
        return message.reply(`${emoji.Error} Bạn không có quyền làm điều đó để bỏ cấm một người nào đó mà bạn cần phải có quyền **\`BAN_MEMBERS\`** or **\`ADMINISTRATOR\`**`)
        .then(msg => {
            msg.delete({ timeout: 20000 })
        });

        if(!doggo.hasPermission(Perms))
        return message.reply(`${emoji.Error} Tôi không có quyền bỏ cấm người dùng, vui lòng cho phép **\`BAN_MEMBERS\`** or **\`ADMINSTRATOR\`** for me`)

        if(!user)
        return message.reply(`${emoji.Error} Vui lòng cung cấp ID người dùng của một người bị cấm đăng ký để bỏ cấm người dùng đó **\`${config.Prefix}unban [Banned User's ID] [Reason]\`**`)

        if(user === client.user.id)
        return message.reply(`${emoji.Error} Chờ gì ?? !! tôi thậm chí bị cấm trong hội này?!!!`)

        if(!user === message.author.id) 
        return message.reply(`${emoji.Error} Lmao tự bỏ cấm nếu bạn bị cấm thì bạn ở thế nào trong hội này cũng bị cấm rồi nhờ người bỏ cấm!!`)

        const reason = args.slice(1).join(" ");

        await message.guild.members.unban(user, reason);

        const embed = new Discord.MessageEmbed()
        .setTitle('Unban !!')
        .setDescription(`${emoji.Approved} Unbanned **\`${user.tag}\`**`)
        .addField('Reason', `${reason != "" ? reason : "-"}`, true)
        .addField('Unbanned By', `<@${message.member.id}> `, true)
        .setTimestamp()

        message.channel.send(embed)

    }

}
