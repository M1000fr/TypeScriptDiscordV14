import { CommandOptions } from '../../../../Types/CommandOptions';
import handler from './members';

export default {
    name: 'members',
    description: 'Get the members informations',
    run: handler.index,
} as CommandOptions;