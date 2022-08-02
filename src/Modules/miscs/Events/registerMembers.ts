import Event from '../../../Interfaces/Event';
import ExtendedClient from "../../../Class/Client";

export const registerMembers: Event = {
    name: 'ready',
    run: async (client: ExtendedClient) => {
        client.guild.members.fetch().then(members => {
            client.database.members.bulkCreate(members.filter(m => !m.user.bot).map(m => ({
                id: m.id
            })), { updateOnDuplicate: ['id'] });
        })
    }
}