import { GatewayIntentBits } from 'discord.js';
import Client from './src';

new Client({ intents: [GatewayIntentBits.Guilds] });