const { default_prefix } = require("../../config.json")
const db = require("quick.db")
const color = require('../../assets/json/colors.json')
const footer = require('../../assets/json/footer.json')


module.exports =  {
  name : 'set-prefix',
  aliases : ['prefix', 'pre'],
  run : async (client, message, args) => {

    if(!message.member.hasPermission("ADMINISTRATOR")) {
      return message.channel.send({embed : {
        description : `❌\`Bạn không có quyền [ADMINISTRATOR]\``,
        color : color.error,
        footer  : {
          text : footer.footertext,
          icon_url : footer.footericon
        }
      }}).then(msg=>msg.react('❌'))
    }
       if(!message.guild.me.hasPermission("ADMINISTRATOR")) {
      return message.channel.send({embed : {
        description : `❌\`Tôi không được phép [ADMINISTRATOR]\``,
        color : color.error,
        footer  : {
          text : footer.footertext,
          icon_url : footer.footericon
        }
      }}).then(msg=>msg.react('❌'))
    } 
    
    if(!args[0]) {
      return message.channel.send({embed : {
        description : `❌\`Vui lòng cung cấp PREFIX mà bạn muốn đặt\``,
        color : color.error,
        footer  : {
          text : footer.footertext,
          icon_url : footer.footericon
        }
      }}).then(msg=>msg.react('❌'))
    } 
    
    if(args[1]) {
      return message.channel.send({embed : {
        description : `❌\`PREFIX không được nhiều hơn một đối số\``,
        color : color.error,
        footer  : {
          text : footer.footertext,
          icon_url : footer.footericon
        }
      }}).then(msg=>msg.react('❌'))
    }
    
    if(args[0].length > 5) {
      return message.channel.send({embed : {
        description : `❌\`PREFIX không được nhiều hơn 5 ký tự\``,
        color : color.error,
        footer  : {
          text : footer.footertext,
          icon_url : footer.footericon
        }
      }}).then(msg=>msg.react('❌'))
    }
    
    if(args.join("") === default_prefix) {
      db.delete(`prefix_${message.guild.id}`)
     return await message.channel.send({embed : {
        description : `✅ \`PREFIX đã được đặt lại\``,
        color : color.success,
        footer  : {
          text : footer.footertext,
          icon_url : footer.footericon
        }
      }}).then(msg=>msg.react('✅'))
    }
    
    db.set(`prefix_${message.guild.id}`, args[0])
  await message.channel.send({embed : {
        description : `✅ \`PREFIX được đặt thành : ${args[0]}\``,
        color : color.sucess,
        footer  : {
          text : footer.footertext,
          icon_url : footer.footericon
        }
      }}).then(msg=>msg.react('✅'))

  }
}
