
const { AttachmentBuilder} = require("discord.js");


// all the commonly use variable will be place here

module.exports.supportLink ="https://discord.gg/CbGhn6cmpp"
module.exports.versionNo ="Version 0.0.3"
module.exports.botName ="Test01"
module.exports.logo =`pic1.png`
module.exports.donation ="https://streamlabs.com/nothealthyofficial/tip"
module.exports.interval=60000;
module.exports.communityLink="https://discord.gg/KYqnX3VTP9";
module.exports.addBotUrl='https://discord.com/api/oauth2/authorize?client_id=1118062954978492486&permissions=8&scope=bot'

//bot command
module.exports.solitaire="list";
module.exports.ping="ping";
module.exports.support="support";
module.exports.command="command";
module.exports.version="version";
module.exports.countdown="countdown";
module.exports.community="community";
module.exports.addbot='addbot';

//coc command
module.exports.cocCurrentWar="coccw";
//module.exports.cocListMember="coclm";
module.exports.cocGetClanInfo="cocgcl";
module.exports.cocGoldPass="cocgp";
module.exports.cocDiscordSetRole="cocdcsr";
module.exports.cocCreateList="coccl";
//module.exports.cocWarLog="cocwarlog";

// module.exports.cocCurrentWarLeagueGroup="coccwlg";
// module.exports.cocIndividualWarLeague="coccwl";

//embed
module.exports.defaultEmbedColorCode=0x0099FF;
module.exports.cocEmbedColorCode=0xffed00;
module.exports.errorEmbedColorCode=0xED4245;
module.exports.embedFooter={ text: `By @nothealthy - youtube channel`, iconURL: 'attachment://'+this.logo}


//file
module.exports.file = new AttachmentBuilder('./assets/'+this.logo);

//valorent
// module.exports.valorentVersion ="vversion";
// module.exports.valorentPlatformData ="vpd";