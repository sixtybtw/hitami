const Discord = require("discord.js");
const db = require('quick.db');

module.exports.run = async(bot, message, args) => {

  let member = message.mentions.members.first() || message.member;
  const gMessage = new db.table('MESSAGES')
  let guild = await db.fetch(`guildMessages_${member.guild.id}_${member.id}`);

  let gembed = new Discord.RichEmbed()
  .setDescription(`:speech_balloon: | **${member.user.username}#${member.user.discriminator}**, momentan ai **${guild} mesaje** pe acest server.`)
  .setColor("#36393e")
  .setAuthor(message.guild.name, message.author.displayAvatarURL)
  
  message.channel.send(gembed);
  
}
module.exports.help = {
    name: "messages"
}