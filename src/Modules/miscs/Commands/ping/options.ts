import { ApplicationCommandData } from "discord.js";

export default {
    name: 'ping',
    description: 'Response with "Pong !"',
    options: [
        {
            type: 6,
            name: 'user',
            description: 'The user to ping'
        }
    ]
} as ApplicationCommandData;