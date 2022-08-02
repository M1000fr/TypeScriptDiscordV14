import CommandOption from '../../../Interfaces/CommandOption';
import Event from '../../../Interfaces/Event';
import { CommandInteraction, Interaction } from 'discord.js';
import ExtendedClient from "../../../Class/Client";

const errorFunction = (client: ExtendedClient, interaction: CommandInteraction, cmdName: string, type: 'as any Handler' | 'not found in the Map') => {
    client.libs.log.print(`%s as trying to execute %s but ${type}.`, "Command").error(interaction.user.tag, cmdName);
    interaction.reply({ content: `Command \`${cmdName}\` ${type}.`, ephemeral: true });
}

export const CommandHandler: Event = {
    name: 'interactionCreate',
    run: (client: ExtendedClient, interaction: Interaction) => {
        if (!interaction.isChatInputCommand()) return;
        const name = interaction.commandName,
            sub = interaction.options?.getSubcommand(false),
            subGroup = interaction.options?.getSubcommandGroup(false);

        const cmd = client.Commands.get(name) as CommandOption;
        if (!cmd) errorFunction(client, interaction, name, 'not found in the Map');

        if (!sub && !subGroup) {
            if (!cmd.run) return errorFunction(client, interaction, name, 'as any Handler');
            cmd.run(client, interaction);
        }
        else if (sub && !subGroup) {
            const handler = (cmd.options.find(o => (o as any).name === sub) as any);
            if (!handler.run) return errorFunction(client, interaction, name, 'as any Handler');
            handler.run(client, interaction);
        }
        else if (sub && subGroup) {
            const group = cmd.options.find(o => (o as any).name === subGroup) as any;
            const handler = (group.options.find(o => (o as any).name === sub) as any)
            if (!handler.run) return errorFunction(client, interaction, name, 'as any Handler');
            handler.run(client, interaction);
        }

        client.libs.log.print(`%s as executing %s.`, "Command").log(interaction.user.tag, name);
    }
}