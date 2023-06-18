const defaultEmbed = require('../../../share/embed/defaultEmbed');
const file = require('../../../share/file')
const conmmonVariable = require('../../../share/index');
const cocClient = require('../../../share/coc/cocClientLogin');
const { SlashCommandBuilder } = require("discord.js");
module.exports = {
    data: new SlashCommandBuilder()
        .setName(conmmonVariable.cocListMember)
        .setDescription('List clan members. ')
        .addStringOption(option => option.setName('clantag')
            .setDescription('Enter your clan tag etc #2PPP')
            .setMaxLength(10)
            .setMinLength(10)
            .setRequired(true)),
    async execute(interaction) {

        const clanTag = interaction.options.getString('clantag');

        // try {
            const clan = await cocClient.cocClientLogin.getClanMembers(clanTag,4);
            defaultEmbed.data.setTitle('List of member in: ').setFields();

            let totalMember=0;
            console.log(clan.length);

            for(let i=0;i<clan.length;i++){
                console.log(clan[i].league.name);
                totalMember++;
                console.log(defaultEmbed.data.data.fields.length)
                if(defaultEmbed.data.data.fields.length===24){
                    console.log(defaultEmbed.data);
                    // if(interaction.){
                    //     defaultEmbed.data.setDescription("The other "+totalMember+' member ')
                    //     interaction.followUp({ embeds: [defaultEmbed.data], files: [file] });

                    // }
                    // else{
                        defaultEmbed.data.setDescription("The first "+totalMember+' member ')
                        interaction.reply({ embeds: [defaultEmbed.data], files: [file] });

                    // }
                    defaultEmbed.data.setFields();
                }
                else{
                    defaultEmbed.data.addFields(
                  
                        {name:'Name/Role',value:`${clan[i].name}/${clan[i].role}`,inline: true },
                        {name:'Exp Level',value:  `${clan[i].expLevel}`,inline: true },
                        {name:'Trophies/League',value:  `${clan[i].trophies}/${clan[i].league.name} `,inline: true },
                        {name:'Troop Donation/receive',value:  `${clan[i].donations}/${clan[i].received}`,inline: true }
                        )
                }
              
            }

           // defaultEmbed.data.setDescription("Total of "+totalMember+' member found')

           // console.log(clan);
            //return interaction.reply({ embeds: [defaultEmbed.data], files: [file] });

        // }
        // catch (error) {

        //     return interaction.reply({ embeds: [cocClient.cocClientError(error.status)], files: [file] });

        // }

    },
};



