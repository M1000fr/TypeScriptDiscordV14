import Command from "../../../../Interfaces/Command";

const index: Command = (_client, interaction) => {
    const user = interaction.options.getUser('user');
    if (!user) {
        interaction.reply({ content: 'Pong !' });
    } else {
        interaction.reply({ content: `${user}, Pong !` });
    }
}

export default {
    index: index
}