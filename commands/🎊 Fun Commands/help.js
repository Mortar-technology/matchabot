const { MessageEmbed } = require("discord.js");
const { readdirSync } = require("fs");
const default_prefix = require("../../config.json").default_prefix;

module.exports = {
  name: "help",
  aliases : ['h', 'cứu', 'cuu'],
  usage:`( ${default_prefix}h < Tên lệnh vd : !help avatar > )`,
  description: "\`Hiển thị các lệnh bot hiện đang có\`",
  run: async(client, message, args) => {

    const roleColor =
      message.guild.me.displayHexColor === "#000000"
        ? "#ffffff"
        : message.guild.me.displayHexColor;

    if (!args[0]) {
      let categories = [];

      readdirSync("./commands/").forEach((dir) => {
        const commands = readdirSync(`./commands/${dir}/`).filter((file) =>
          file.endsWith(".js")
        );

        const cmds = commands.map((command) => {
          let file = require(`../../commands/${dir}/${command}`);

          if (!file.name) return "\`Không có tên lệnh\`";

          let name = file.name.replace(".js", "");

          return `\`${name}\``;
        });

        let data = new Object();

        data = {
          name: dir.toUpperCase(),
          value: cmds.length === 0 ? "In progress." : cmds.join(" "),
        };

        categories.push(data);
      });

      const embed = new MessageEmbed()
        .setTitle("SUPERBOT : HELP COMMANDS")
        .addFields(categories)
        .setDescription(
          `\`Sử dụng ${default_prefix}help theo sau là tên lệnh để biết thêm thông tin về lệnh. Ví dụ: ${default_prefix}help < Tên lệnh con >\``
        )
        .setFooter(
          `Matcha Synthetic | yêu cầu bởi: ${message.author.tag}`,
          message.author.displayAvatarURL({ dynamic: true })
        )
        .setTimestamp()
        .setColor("RANDOM");
      return message.channel.send(embed);
    } else {
      const command =
        client.commands.get(args[0].toLowerCase()) ||
        client.commands.find(
          (c) => c.aliases && c.aliases.includes(args[0].toLowerCase())
        );

      if (!command) {
        const embed = new MessageEmbed()
          .setTitle(`Ngáo đá à ? Tao làm đéo gì có lệnh đấy ? ${default_prefix}help để xem các lệnh hiện có`)
          .setColor("FF0000");
        return message.channel.send(embed);
      }

      const embed = new MessageEmbed()
        .setTitle("Chi tiết lệnh:")
        .addField("PREFIX:", `${default_prefix}`)
        .addField(
          "LỆNH CHÍNH:",
          command.name ? `\`${command.name}\`` : "\`Không có tên cho lệnh này\`"
        )
        .addField(
          "LỆNH PHỤ:",
          command.aliases
            ? `\`${command.aliases.join("` `")}\``
            : "\`Không có aliases cho lệnh này\`"
        )
        .addField(
          "SỬ DỤNG:",
          command.usage
            ? `\`.${command.name} ${command.usage}\``
            : `\`.${command.name}\``
        )
        .addField(
          "MÔ TẢ LỆNH:",
          command.description
            ? command.description
            : "\`Không có mô tả cho lệnh này\`"
        )
        .setFooter(
          `Matcha Synthetic | yêu cầu bởi ${message.author.tag}`,
          message.author.displayAvatarURL({ dynamic: true })
        )
        .setTimestamp()
        .setColor(roleColor);
      return message.channel.send(embed);
    }
  },
};
