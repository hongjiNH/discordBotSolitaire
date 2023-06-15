require('dotenv').config();

const botName = process.env.botName
const logo=process.env.logo


const { AttachmentBuilder} = require("discord.js");

module.exports=  file = new AttachmentBuilder('../'+botName+'/assets/'+logo);
