import Commands from "../../../../Class/Commands";
import { CommandInteraction } from "discord.js";
import options from './options';

const cmd = new Commands(options, ['Administrator']);

cmd.setHandler({}, (interaction: CommandInteraction) => {
    const content = interaction.options.get('content');

    interaction.reply(`Pong !\n${content ? content.value : ''}`);
});

export default cmd;