import Commands from "../../../../Class/Commands";
import options from './options';

const cmd = new Commands(options, []);

cmd.setHandler({}, async (interaction) => {
    interaction.reply({
        content: 'Pong !',
        ephemeral: true
    });
});