// require('dotenv').config();

// const commonVariable = require('../index');

// const { API, Regions, Locales, Queue } = require("node-valorant-api");

// const APIKey = process.env.valorentToken; // Your API Key
// // The third parameter is the Region for the Account API
// // choose the one that is the closest to you
// const client = new API(Regions.NA, APIKey, Regions.AMERICAS); // An API instance for Valorant query
// module.exports.valorentClientLogin = client;

// const { EmbedBuilder } = require("discord.js");

// module.exports.valorentClientError = (errorStatus) => {

//     const errorEmbed = new EmbedBuilder()
//         .setColor(commonVariable.errorEmbedColorCode)
//         .setTimestamp()
//         .setFooter(commonVariable.embedFooter)

//     switch (errorStatus) {
//         case 400:
//             errorEmbed
//                 .setTitle('Bad request')
//                 .setDescription(`Kindly check ur input as you might have enter the wrong format or time given is too large`)
//             break;
//         case 401:
//             errorEmbed
//                 .setTitle('Unauthorized request')
//                 .setDescription(`Kindly join the support server to inform the support about this thank you `)
//             break;
//         case 403:
//             errorEmbed
//                 .setTitle('Forbidden request')
//                 .setDescription(`Kindly join the support server to inform the support about this thank you `)
//             break;
//         case 404:
//             errorEmbed
//                 .setTitle('Not found request')
//                 .setDescription(`The ID or name provided does not match any existing resource or no resources that match the parameters specified.`)
//             break;
//         case 415:
//             errorEmbed
//                 .setTitle('Unsupported Media Type request')
//                 .setDescription(`Kindly join the support server to inform the support about this thank you  `)
//             break;
//         case 429:
//             errorEmbed
//                 .setTitle('Rate Limit Exceeded')
//                 .setDescription(`Kindly try again later due to the huge amount of request`)
//             break;
//         case 500:
//             errorEmbed
//                 .setTitle('Internal Server Error')
//                 .setDescription(`Kindly join the support server to inform the support about this thank you  `)
//             break;
//         case 503:
//             errorEmbed
//                 .setTitle('Service Unavailable')
//                 .setDescription(`Kindly join the support server to inform the support about this thank you as The Service Unavailable response implies a temporary condition which will be alleviated after some delay. `)
//             break;
//     }

//     return errorEmbed;

// }

// // // Example usage of the VAL-CONTENT-V1 API
// // valorant.ContentV1.getContent(Locales["en-US"]).then(content => {
// //     console.log(content.characters.map(char => { return char.name }));
// // });

// // // Example usage of the ACCOUNT-V1 and VAL-MATCH-V1 API !!! The MatchV1 API requires a Production API Key
// // valorant.AccountV1.getAccountByRiotID("SoLo", "HK1").then(account => {
// //     valorant.MatchV1.getMatchesByPuuid(account.puuid).then(matches => {
// //         console.log(matches);
// //     })
// // });

// // /**
// //  * Example usage of the VAL-STATUS-V1 API
// //  * https://developer.riotgames.com/apis#val-status-v1/GET_getPlatformData
// //  */
// // valorant.StatusV1.getPlatformData().then(data => {
// //     console.log(data);
// // });

// // /**
// //  * Example usage of the VAL-MATCH-V1 API
// //  * Queue: "competitive", "unranked", "spikerush"
// //  * https://developer.riotgames.com/apis#val-status-v1/GET_getPlatformData
// //  */
// // valorant.MatchV1.getRecentMatches(Queue.Competitive).then(data => {
// //     console.log(data);
// // })