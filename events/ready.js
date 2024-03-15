const chalk = require('chalk');
const moment = require('moment');
const Discord = require('discord.js');
const ayarlar = require('../ayarlar.json');

var prefix = ayarlar.prefix;


module.exports = client => {
  console.log(`${client.user.username} İsmi İle Giriş Yapıldı!`);
  client.user.setStatus("dnd");

  console.log(`                                                                                                                                                                     `)
  client.user.setActivity(``, { type: "WATCHING"});

  console.log(`${client.user.username}: Şu An ` + client.channels.size + ` Adet Kanala, ` + client.guilds.size + ` Adet Sunucuya Ve ` + client.guilds.reduce((a, b) => a + b.memberCount, 0).toLocaleString() + ` Kullanıcıya Hizmet Veriliyor!`);
};