const commonVariable=require('../index')

const { EmbedBuilder } = require("discord.js");

module.exports=  {
    data: exampleEmbed = new EmbedBuilder()
    .setColor(0x0099FF)
    .setTimestamp()
    .setFooter({ text: `By @nothealthy - youtube channel`, iconURL: 'attachment://'+commonVariable.logo })
}