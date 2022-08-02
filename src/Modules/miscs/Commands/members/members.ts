import Command from "../../../../Interfaces/Command";

const index: Command = async (client, interaction) => {
    var membersInGuild = await client.guild.members.fetch();
    const membersInDB = await client.database.members.findAll({ raw: true });

    membersInGuild = membersInGuild.filter(m => !m.user.bot)

    interaction.reply({
        embeds: [{
            color: 0xeb4034,
            description: `Numbers of members registered !`,
            fields: [{
                name: '📜 On the Database',
                value: membersInDB.length.toString(),
                inline: true
            }, {
                name: '🏠 On the Guild',
                value: membersInGuild.size.toString(),
                inline: true
            }]
        }]
    })
}

export default {
    index: index
}