import { Interaction } from 'discord.js';
import Commands from '../../../Class/Commands';
import { Event } from '../../../Interfaces';
import client from '../../../../';

export const CommandHandler: Event = {
    name: 'interactionCreate',
    run: async (interaction: Interaction) => {
        if (!interaction.isChatInputCommand()) return;
        const name = interaction.commandName;

        var cmd = client.Commands.get(name) as Commands;
        if (!cmd) Commands.Error(interaction, name, 'Command not found in Map !', '⚠ Command not found in Map !');

        cmd.run(interaction);
    }
}