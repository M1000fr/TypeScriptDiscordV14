import Event from '../../../Interfaces/Event';
import ExtendedClient from "../../../Class/Client";

export const registerCommands: Event = {
    name: 'ready',
    run: (client: ExtendedClient) => {
        client.Commands.forEach(c => {
            client.database.commands.upsert({
                name: c.name,
                options: c.options || []
            });
        })
    }
}