require('dotenv').config();

const commonVariable=require('../index');
const { Client } = require('clashofclans.js');

const coctoken = process.env.cocToken;

//key login
const client = new Client({ keys: [coctoken] });
module.exports.cocClientLogin = client;

const {  EmbedBuilder } = require("discord.js");


module.exports.cocClientError = (errorStatus) => {

    const errorEmbed = new EmbedBuilder()
    .setColor(commonVariable.errorEmbedColorCode)
    .setTimestamp()
    .setFooter(commonVariable.embedFooter)

    
    switch (errorStatus) {
        case 400:
            errorEmbed
                .setTitle('Incorrect input')
                .setDescription(`Kindly check ur input as you might have miss spelled /missing letter`)
            break;
        case 403:
            errorEmbed
                .setTitle('Access denined due to clash of clan api issue')
                .setDescription(`Kindly join the support server to inform the support about this thank you  `)
            break;
        case 404:
            errorEmbed
                .setTitle('Resources Not found')
                .setDescription(`Kindly check ur input as you might have miss spelled /missing letter`)
            break;
        case 429:
            errorEmbed
                .setTitle('Request was throttled')
                .setDescription(`Clash of clan api have a limit of request per time, kindly wait for awhile before trying`)
            break;
        case 500:
            errorEmbed
                .setTitle('Unknown error happened when handling the Clash of clan request ')
                .setDescription(`Kindly join the support server to inform the support about this thank you  `)
            break;
        case 503:
            errorEmbed
                .setTitle('Clash of clan maintenance  ')
                .setDescription(`Service is temprorarily unavailable because of maintenance  `)
            break;
        // default:
        //     errorEmbed
        //         .setTitle('Unknown error happened when handling the Clash of clan request code: '+errorStatus)
        //         .setDescription(`Kindly join the support server to inform the support about this thank you  `)
        //         .setFields({ name: 'Support Server', value: commonVariable.supportLink, inline: true })
        //     break;
    }

    return errorEmbed;


}

