require('dotenv').config();

const errorEmbed = require('../embed/errorEmbed');
const commonVariable=require('../index');
const { Client } = require('clashofclans.js');

const coctoken = process.env.cocToken;

//key login
const client = new Client({ keys: [coctoken] });
module.exports.cocClientLogin = client;


module.exports.cocClientError = (errorStatus) => {
    
    switch (errorStatus) {
        case 400:
            errorEmbed.data
                .setTitle('Incorrect input')
                .setDescription(`Kindly check ur input as you might have miss spelled /missing letter`)
                .setFields();
            break;
        case 403:
            errorEmbed.data
                .setTitle('Access denined due to clash of clan api issue')
                .setDescription(`Kindly join the support server to inform the support about this thank you  `)
                .setFields({ name: 'Support Server', value: commonVariable.supportLink, inline: true })
            break;
        case 404:
            errorEmbed.data
                .setTitle('Resources Not found')
                .setDescription(`Kindly check ur input as you might have miss spelled /missing letter`)
                .setFields()
            break;
        case 429:
            errorEmbed.data
                .setTitle('Request was throttled')
                .setDescription(`Clash of clan api have a limit of request per time, kindly wait for awhile before trying`)
                .setFields()
            break;
        case 500:
            errorEmbed.data
                .setTitle('Unknown error happened when handling the Clash of clan request ')
                .setDescription(`Kindly join the support server to inform the support about this thank you  `)
                .setFields({ name: 'Support Server', value: commonVariable.supportLink, inline: true })
            break;
        case 503:
            errorEmbed.data
                .setTitle('Clash of clan maintenance  ')
                .setDescription(`Service is temprorarily unavailable because of maintenance  `)
                .setFields()
            break;
        // default:
        //     errorEmbed.data
        //         .setTitle('Unknown error happened when handling the Clash of clan request code: '+errorStatus)
        //         .setDescription(`Kindly join the support server to inform the support about this thank you  `)
        //         .setFields({ name: 'Support Server', value: commonVariable.supportLink, inline: true })
        //     break;
    }

    return errorEmbed.data;


}

