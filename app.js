// Package-uri.
const Discord = require("discord.js");
const fs = require("fs");
const db = require('quick.db');
const moment = require("moment");
const tz = require("moment-timezone");
const ms = require("ms");
const bot = new Discord.Client();
bot.commands = new Discord.Collection();
const colors = require("colors");

// Host.
const http = require('http');
const express = require('express');
const app = express();
app.get("/", (request, response) => {
  console.log(Date.now() + "");
  response.sendStatus(200);
});
app.listen(process.env.PORT);
setInterval(() => {
  http.get(`http://${process.env.PROJECT_DOMAIN}.glitch.me/`);
}, 280000);

//Command Handler.
fs.readdir("./commands/", (err, files) => {

  if(err) console.log(err);
  let jsfile = files.filter(f => f.split(".").pop() === "js");
  if(jsfile.length <= 0){
    console.log("Oops, i can't find commands!".red);
    return;
  }

  console.log("——————————————————————————————————————".green);
  jsfile.forEach((f, i) =>{
  delete require.cache[require.resolve(`./commands/${f}`)]
    let props = require(`./commands/${f}`);
    console.log(`[+] Command ${f} was succesfully loaded.`.green);
    bot.commands.set(props.help.name, props);
  });
})

// Ready Event
  bot.on("ready", async() => {
  console.log("——————————————————————————————————————".green);
  console.log("Bot has been started! Works fine.g");
  console.log(`${bot.user.username} is connected on ${bot.guilds.size} servers!`);
  });

// Message Event
bot.on("message", async message => {
 
  db.add(`guildMessages_${message.guild.id}_${message.author.id}`, 1);

  if(message.author.bot) return;
  if(message.channel.type === "dm") return;
  
const ceva = ["discord.gg", ".gg", ".rip", ".me", "discord . me", "discord me/ ", "discord gg / ", "discord . gg / ", "discord .gg /", "discord .gg/ " ];
  if(ceva.some(cuvant => message.content.includes(cuvant)) ) {
    if(message.member.hasPermission("ADMINISTRATOR")) return;
    message.channel.send("**That would be nice, no?** :joy:").then(msg => msg.delete(3000));
   message.delete()
 }
 
 if(message.content.indexOf("~") !== 0) return;

  let prefix = "~";
  let messageArray = message.content.split(" ");
  let cmd = messageArray[0];
  let args = messageArray.slice(1);

  let commandfile = bot.commands.get(cmd.slice(prefix.length));
  if(commandfile) commandfile.run(bot,message,args);

  });

bot.login("");