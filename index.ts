import { GatewayIntentBits } from 'discord.js';
import ExtendedClient from './src/Class/Client';

export default new ExtendedClient({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMembers] });