import CommandOption from '../../../Interfaces/CommandOption';
import Event from '../../../Interfaces/Event';
import { CommandInteraction, Interaction } from 'discord.js';
import ExtendedClient from "../../../Class/Client";

const error = (client: ExtendedClient, interaction: CommandInteraction, cmdName: string, type: 'as any Handler' | 'Handler is not an Function' | 'not found in the Map') => {
    client.libs.log.print(`%s as trying to execute %s but ${type}.`, "Command").error(interaction.user.tag, cmdName);
    interaction.reply({ content: `Command \`${cmdName}\` ${type}.`, ephemeral: true });
}

const execute = (client: ExtendedClient, interaction: CommandInteraction, cmd: CommandOption) => {
    if (!cmd.run) return error(client, interaction, cmd.name, 'as any Handler');

    try {
        cmd.run(client, interaction);
    } catch (error) {
        error(client, interaction, cmd.name, 'Handler is not an Function');
        return;
    }

    client.libs.log.print(`%s as executing %s.`, "Command").log(interaction.user.tag, cmd.name);
}

export const CommandHandler: Event = {
    name: 'interactionCreate',
    run: (client: ExtendedClient, interaction: Interaction) => {
        if (!interaction.isChatInputCommand()) return;
        const name = interaction.commandName,
            sub = interaction.options?.getSubcommand(false),
            subGroup = interaction.options?.getSubcommandGroup(false);

        var cmd = client.Commands.get(name) as CommandOption;
        if (!cmd) error(client, interaction, name, 'not found in the Map');

        if (!sub && !subGroup) execute(client, interaction, cmd);
        else if (sub && !subGroup) execute(client, interaction, (cmd.options as unknown as CommandOption[]).find(o => o.name === sub));
        else if (sub && subGroup) {
            const group = cmd.options.find(o => (o as any).name === subGroup) as any;
            execute(client, interaction, (group.options as CommandOption[]).find(o => o.name === sub));
        }
    }
}