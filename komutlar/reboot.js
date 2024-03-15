const Discord = require('discord.js');
const bot = new Discord.Client();
const ayarlar = require("../ayarlar.json")

module.exports.run = async (bot, message, args) => { 
    if(message.author.id !== ayarlar.sahip)  return message.channel.send("Geliştiricim Değilsin Bu Komutu kullanamazsın.!")

    message.channel.sendMessage('**Başarılı! Bot Yeniden Başlatılıyor**')
      message.delete(60).then(msg => {

    console.log('**Bot Yeniden Başlatılıyor Lütfen Bekleyin**...');

    process.exit(0);
  })


}
module.exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ["Reboot"],
  permLevel: 0
};

module.exports.help = {
  name: 'Reboot',
  description: 'Bot Yeniden Başlar.',
  usage: 'Reboot'
};