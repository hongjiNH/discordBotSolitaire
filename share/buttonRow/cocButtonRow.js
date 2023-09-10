
const { ButtonBuilder, ActionRowBuilder,ButtonStyle } = require("discord.js");

module.exports = (clanTag) => {

    if (clanTag !== null) {

        const clanTagButton = new ButtonBuilder()
            .setCustomId('clantagbutton')
            .setLabel('Clan Tag: ' + clanTag)
            .setDisabled()
            .setStyle(ButtonStyle.Secondary);

        const cocButton = new ButtonBuilder()
            .setCustomId('cocbutton')
            .setLabel('Clash Of Clan')
            .setDisabled()
            .setStyle(ButtonStyle.Secondary);

        return new ActionRowBuilder().addComponents(clanTagButton, cocButton);

    }
    else {
        const cocButton = new ButtonBuilder()
            .setCustomId('cocbutton')
            .setLabel('Clash Of Clan')
            .setDisabled()
            .setStyle(ButtonStyle.Secondary);

        return new ActionRowBuilder().addComponents(cocButton);
    }
}

