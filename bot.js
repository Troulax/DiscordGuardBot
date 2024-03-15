 const Discord = require('discord.js');
const client = new Discord.Client
const Client = new Discord.Client
const ayarlar = require('./ayarlar.json');
const fs = require('fs');
const chalk = require('chalk');
const Jimp = require('jimp');
const db = require('quick.db');
const http = require('http');
const express = require('express');
require('./util/eventLoader')(client);
const path = require('path');
const request = require('request');
client.queue = new Map()
   
const app = express();
app.get("/", (request, response) => {
  console.log(Date.now() + " Ping tamamdır.");
  response.sendStatus(200);
});
app.listen(process.env.PORT);
setInterval(() => {
  http.get(`http://${process.env.PROJECT_DOMAIN}.glitch.me/`);
}, 280000);

var prefix = ayarlar.prefix;

const log = message => {
    console.log(`${message}`);
};

client.commands = new Discord.Collection();
client.aliases = new Discord.Collection();
fs.readdir('./komutlar/', (err, files) => {
  if (err) console.error(err);
  log(`${files.length} komut yüklenecek.`);
  files.forEach(f => {
    let props = require(`./komutlar/${f}`);
    log(`Yüklenen komut: ${props.help.name}.`);
    client.commands.set(props.help.name, props);
    props.conf.aliases.forEach(alias => {
      client.aliases.set(alias, props.help.name);
    });
  })
});


client.reload = command => {
  return new Promise((resolve, reject) => {
    try {
      delete require.cache[require.resolve(`./komutlar/${command}`)];
      let cmd = require(`./komutlar/${command}`);
      client.commands.delete(command);
      client.aliases.forEach((cmd, alias) => {
        if (cmd === command) client.aliases.delete(alias);
      });
      client.commands.set(command, cmd);
      cmd.conf.aliases.forEach(alias => {
        client.aliases.set(alias, cmd.help.name);
      });
      resolve();
    } catch (e){
      reject(e);
    }
  });
};

client.load = command => {
  return new Promise((resolve, reject) => {
    try {
      let cmd = require(`./komutlar/${command}`);
      client.commands.set(command, cmd);
      cmd.conf.aliases.forEach(alias => {
        client.aliases.set(alias, cmd.help.name);
      });
      resolve();
    } catch (e){
      reject(e);
    }
  });
};

client.unload = command => {
  return new Promise((resolve, reject) => {
    try {
      delete require.cache[require.resolve(`./komutlar/${command}`)];
      let cmd = require(`./komutlar/${command}`);
      client.commands.delete(command);
      client.aliases.forEach((cmd, alias) => {
        if (cmd === command) client.aliases.delete(alias);
      });
      resolve();
    } catch (e){
      reject(e);
    }
  });
};
    
client.elevation = message => {
  if (!message.guild) return;
  let permlvl = 0;
  if (message.member.hasPermission("BAN_MEMBERS")) permlvl = 2;
  if (message.member.hasPermission("ADMINISTRATOR")) permlvl = 3;
  if (message.author.id == "") permlvl = 4;
  if (message.author.id == ayarlar.sahip) permlvl = 4;
  return permlvl;
};

///////////////////////////////////////////////////////////////////////////////////////////////////

client.on('roleDelete', async (role) => {
   
    const entry = await role.guild.fetchAuditLogs({type: 'ROLE_DELETE'}).then(audit => audit.entries.first());
    const yetkili = await role.guild.members.get(entry.executor.id);
    const eskihali = role.permissions;
          console.log(eskihali)
   if (yetkili.id === "")return;
   if (yetkili.id === "")return;
   if (yetkili.id === "")return;
             let embed = new Discord.RichEmbed()
             .setColor("BLACK")
             .setDescription(`<@${yetkili.id}> İsimli Kişi ${role.id} ID'li Rolü Sildi Ve Sahip Olduğu Tüm Rolleri Alarak, Kendisine \`Cezalı\` Rolünü Verdim. <a:679653893734400022:679653893734400022>`)
             .setTimestamp()
             let roles = role.guild.members.get(yetkili.id).roles.array()
                    try {
                         role.guild.members.get(yetkili.id).removeRoles(roles)
                                                                             
                         }
              catch(err) {
                          console.log(err)
                         } 
    setTimeout(function(){
                         role.guild.members.get(yetkili.id).addRole("679400775226621952")
                         role.guild.owner.send(embed)
                         }, 1500);

                  });

client.on("roleUpdate", async function(oldRole, newRole) {
  
   const bilgilendir = await newRole.guild.fetchAuditLogs({type: "ROLE_UPLATE"}).then(hatırla => hatırla.entries.first())
    let yapanad= bilgilendir.executor;
  let idler= bilgilendir.executor.id;
  if(idler === "") return
  if(oldRole.hasPermission("ADMINISTRATOR")) return
  
   setTimeout(() => {

     if(newRole.hasPermission("ADMINISTRATOR")){
   newRole.setPermissions((newRole.permissions-8))    
 }
     
 if(newRole.hasPermission("ADMINISTRATOR")){
  
     if(!client.guilds.get(newRole.guild.id).channels.has("679605883180679180")) return newRole.guild.owner.send(`Rol Koruma Nedeniyle ${yapanad} Kullanıcısı Bir Role Yönetici Verdiği İçin Rolün **Yöneticisi** Alındı. \Rol: **${newRole.name}** <a:679653893734400022:679653893734400022>`)

  client.channels.get("679605883180679180").send(`Rol Koruma Nedeniyle ${yapanad} Kullanıcısı Bir Role Yönetici Verdiği İçin Rolün **Yöneticisi Alındı**. \Rol: **${newRole.name}** <a:679653893734400022:679653893734400022>`)
 }
      }, 1000)
  })

//////////////////////////////////////////////////////////////////////////////////////////////////

client.on('channelDelete', async (channel) => {
 
 const entry = await channel.guild.fetchAuditLogs({type: 'CHANNEL_DELETE'}).then(audit => audit.entries.first());
 const yetkili = await channel.guild.members.get(entry.executor.id);
	 if (yetkili.id === "")return;
   if (yetkili.id === "")return; 
   if (yetkili.id === "")return; 
 let embed = new Discord.RichEmbed()
.setColor("BLACK")
.setDescription(`<@${yetkili.id}> İsimli Kişi ${channel.id} ID'li Kanalı Sildi Ve Sahip Olduğu Tüm Rolleri Alarak, Kendisine (Cezalı) Rolünü Verdim. <a:679653893734400022:679653893734400022>`)
.setTimestamp()
 let roles = channel.guild.members.get(yetkili.id).roles.array()
 try {
channel.guild.members.get(yetkili.id).removeRoles(roles)
                                                                           
  }
 catch(err) {
 console.log(err)
 } 
 setTimeout(function(){
      channel.guild.members.get(yetkili.id).addRole("679400775226621952")
      channel.guild.owner.send(embed)
               }, 1500);

                                                                               
                                                                                     
     });

//////////////////////////////////////////////////////////////////////////////////////////////////

client.on('guildBanAdd',  async (guild, user) => {

    const entry = await guild.fetchAuditLogs({type: 'MEMBER_BAN_ADD'}).then(audit => audit.entries.first());
    const yetkili = await guild.members.get(entry.executor.id); 
            if (yetkili.id === "")return;
            if (yetkili.id === "")return;
            if (yetkili.id === "")return;
  
        let embed = new Discord.RichEmbed()
       .setColor("BLACK")
       .setDescription(`<@${yetkili.id}> , <@${user.id}> Kişisini  Banladı Ve Sahip Olduğu Tüm Rolleri Alarak, Kendisine \`Cezalı\` Rolünü Verdim. <a:679653893734400022:679653893734400022>`)
       .setTimestamp()
        let roles = guild.members.get(yetkili.id).roles.array()
        try {
              guild.members.get(yetkili.id).removeRoles(roles)
           }
        catch(err) { 
                      console.log(err)
                   } 
 	  setTimeout(function(){
              guild.members.get(yetkili.id).addRole("670663271509917727")
         
			 guild.owner.send(embed)
          
                         }, 1500);
                                               
                                                 });


client.on("guildMemberRemove", async function(member) {
  let guild = member.guild;
  const entry = await guild
    .fetchAuditLogs({ type: "MEMBER_KICK" })
    .then(audit => audit.entries.first());
  const yetkili = await guild.members.get(entry.executor.id);
  setTimeout(async () => {
    let logs = await guild.fetchAuditLogs({ type: "MEMBER_KICK" });
    if (logs.entries.first().executor.bot) return;
    if (logs.entries.first().target.id !== member.id) return;
    guild.members
      .get(logs.entries.first().executor.id)
      .removeRoles(guild.members.get(logs.entries.first().executor.id).roles); /// TÜM ROLLERİNİ ALIR
    setTimeout(() => {
      guild.members

        .get(logs.entries.first().executor.id)
        .addRole("679400775226621952"); /// VERİLECEK CEZALI ROL İD
    }, 3000);
    
    const k = guild.channels.find(c => c.id === "679605883180679180");
 k.send(`<@${yetkili.id}> <@${member.user.id}> Adlı Kişiye Sağ Tık Kick Atıldığı İçin Kickliyen Kişinin Yetkileri Alındı. <a:679653893734400022:679653893734400022>`);  }, 2000);
});

/////////////////////////////////////////////////////////////////////////////////////////////////



client.on("guildMemberAdd", async member => {
  
   
    if(member.user.bot) {
     
      member.guild.roles.forEach(async function(yetkilirol){
  if(yetkilirol.id ==="")return
  if(yetkilirol.id ==="")return
  if(yetkilirol.id ==="")return
  if(yetkilirol.hasPermission("ADMINISTRATOR")){
       yetkilirol.setPermissions((yetkilirol.permissions-8))    
     }
      })
      let korumakanalı = client.channels.get("679605883180679180")
      if(!korumakanalı || korumakanalı === null){
        member.ban(member);
         member.guild.owner.send(`Log Kanalı Olmadığı İçin Sunucu Sahibinin Özeline Yazıyorum. | **Sunucuya Bir Bot Eklendi Ve Güvenlik Nedeniyle Botu Banladım. \nBanlanan Bot: **${member} <a:679653893734400022:679653893734400022>`)
     }
      else{
        
      member.ban(member);
      korumakanalı.send(`**Sunucuya Bir Bot Eklendi Ve Güvenlik Nedeniyle Botu Banladım. \nBanlanan Bot: **${member} <a:679653893734400022:679653893734400022>`)
     }
  }
    else{
      
    }
  
  })

//////////////////////////////////////////////////////////////////////////////////////////////////c
client.on("guildMemberAdd", member => {
  var moment = require("moment")
  require("moment-duration-format")
  moment.locale("tr")
   var {Permissions} = require('discord.js');
   var x = moment(member.user.createdAt).add(7, 'days').fromNow()
   var user = member.user
   x = x.replace("Birkaç Saniye Önce", " ")
   if(!x.includes("önce") || x.includes("sonra") ||x == " ") {
   var rol = member.guild.roles.get("679400775226621952")
   var kayıtsız = member.guild.roles.get("679400764988194826")
   member.addRole(rol)
member.user.send('Hesabınız 7 Günden Önce Açıldığı İçin Otomatik Olarak Cezalıya Atıldınız, Yetkililere Bildirerek Açtırabilirsiniz Ayrıca Unutmayın Her Şey Siz Değerli Üyelerimizin Güvenliği İçin.')
setTimeout(() => {

        member.removeRole(kayıtsız.id);

}, 1000)


    
   }
        else {

        }  
    });

//////////////////////////////////////////////////////////////////////////////////////////////////

client.on('ready', ()=>{
client.channels.get('681240608912048173').join()
})

//////////////////////////////////////////////////////////////////////////////////////////////////




client.login(ayarlar.token);
