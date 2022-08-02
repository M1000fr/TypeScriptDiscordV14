import { Client, ClientOptions, Guild, REST, Routes } from 'discord.js';
import CommandOption from '../Interfaces/CommandOption';
import * as database from '../Database';
import * as log from '../Libs/logs';
import path from 'path';
import 'dotenv/config';
import fs from 'fs';

export default class ExtendedClient extends Client {
    static modulesPath = path.join(__dirname, '../Modules');
    public Commands = new Map();
    public database = database;
    public guild: Guild;
    public libs = {
        log
    };

    constructor(options: ClientOptions) {
        super(options);
        this.init();
    }

    private async init() {
        this.database.sequelizeInstance.authenticate().then(() => {
            this.libs.log.print('Connected.', 'Database').success();
        }).catch(error => {
            this.libs.log.print('Error: %s', 'Database', true).error(error);
        });

        await this.loadModules();
        await this.login(process.env.TOKEN);
        await this.pushCommandGuild();
    }

    private async loadModules() {
        for (const m of fs.readdirSync(ExtendedClient.modulesPath)) {
            const t1 = Date.now();
            // Events
            const events = await import(path.join(ExtendedClient.modulesPath, m, 'Events'))
            for (const event in events) {
                const e = events[event];
                this.on(e.name, (...args) => e.run(this, ...args));
            }

            // Commands
            const cmdsFolder = fs.readdirSync(path.join(ExtendedClient.modulesPath, m, 'Commands'))
            for (var cmdFolder of cmdsFolder) {
                const cmdFiles = fs.readdirSync(path.join(ExtendedClient.modulesPath, m, 'Commands', cmdFolder));
                
                if (!cmdFiles.includes('options.ts')) {
                    this.libs.log.print(`%s has no options file.`).error(`${m}/${cmdFolder}`);
                    continue;
                }

                const options = (await import(path.join(ExtendedClient.modulesPath, m, 'Commands', cmdFolder, 'options.ts'))).default as CommandOption;
                this.Commands.set(options.name, options);
            }

            this.libs.log.print(`Load %s in %sms.`, 'Modules').log(m, Date.now() - t1);
        }
    }

    private async pushCommandGuild() {
        try {
            const data = Array.from(this.Commands.values());
            await this.rest.put(
                Routes.applicationGuildCommands(this.user?.id.toString() as string, process.env.GUILD as string),
                { body: data },
            );
            this.libs.log.print('Successfully reloaded application (/) commands.', 'Discord').success();
        } catch (error) {
            this.libs.log.print("%s").error(error);
        }
    }
}