import { CommandData } from "../../../../Types/Command";
import handler from './ping';

export default {
    name: 'ping',
    description: 'Response with "Pong !"',
    options: [
        {
            type: 6,
            name: 'user',
            description: 'The user to ping'
        }
    ],
    run: handler.index
} as CommandData;