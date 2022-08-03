import Event from '../../../Interfaces/Event';
import ExtendedClient from "../../../Class/Client";
import Command from '../../../Interfaces/Command';

export const registerCommands: Event = {
    name: 'ready',
    run: async (client: ExtendedClient) => {
        const dbCmds = await client.database.commands.findAll({ raw: true });

        for (const cmdK of client.Commands.keys()) {
            const cmd = client.Commands.get(cmdK) as Command;
            if (!cmd.name) continue;

            const notRegistered = dbCmds.find(dbcmd => dbcmd.name === cmd.name) === undefined;
            if (notRegistered) client.database.commands.upsert({ name: cmd.name, options: cmd });
        }

        for (const dbcmd of dbCmds) {
            const cmd = client.Commands.get(dbcmd.name) as Command;
            if (cmd === undefined) client.database.commands.destroy({ where: { name: dbcmd.name } });
        }
    }
}