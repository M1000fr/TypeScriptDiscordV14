import { Client, ClientOptions } from 'discord.js';
import 'dotenv/config';

export default class ExtendedClient extends Client {
    public Events = new Map();

    constructor(options: ClientOptions) {
        super(options);

        this.login(process.env.TOKEN);

        this.on('ready', () => {
            console.log(`Logged in as ${this.user?.tag}!`);
        })
    }
}