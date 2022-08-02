import { CommandOptions } from '../../../../Types/CommandOptions';
import handler from './ping';

export default {
    name: 'ping',
    description: 'Response with "Pong !"',
    run: handler.index,
} as CommandOptions;