import Command from "../../../../Interfaces/Command";

const index: Command = (_client, interaction) => {
    interaction.reply("Pong !");
}

export default {
    index: index
}