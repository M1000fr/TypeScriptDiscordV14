import { Client, ClientOptions, Guild, Routes } from 'discord.js';
import * as database from '../Database';
import * as log from '../Libs/logs';
import path from 'path';
import 'dotenv/config';
import fs from 'fs';
import { Module } from '../Interfaces';
import Event from '../Interfaces/Event';
import Commands from './Commands';

export default class ExtendedClient extends Client {
    static modulesPath = path.join(__dirname, '../Modules');
    public Commands: Map<String, Commands> = new Map();
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
            const module = require(path.join(ExtendedClient.modulesPath, m)) as Module;
            var eventCount = 0,
                cmdCount = 0;

            // Events
            for (const Event of Object.keys(module.Events)) {
                const event = module.Events[Event] as Event;
                this.on(event.name, (...args) => event.run(this, ...args));
                eventCount++;
            }

            // Commands
            for (const Command of Object.keys(module.Commands)) {
                const command = module.Commands[Command] as Commands;
                this.Commands.set(command.options.name, command);
                cmdCount++;
            }

            this.libs.log.print(`Load %s, %s commands, %s events, in %s ms.`, 'Modules').log(m, cmdCount, eventCount, Date.now() - t1);
        }
    }

    private async pushCommandGuild() {
        return new Promise(async (resolve, reject) => {
            try {
                if (!process.env.GUILD) return this.libs.log.print('No guild specified.', 'Commands').error();

                const data = Array.from(this.Commands.values()).map(c => c.options);
                await this.rest.put(
                    Routes.applicationGuildCommands(this.user?.id.toString() as string, process.env.GUILD),
                    { body: data },
                );

                log.print('Commands registered on %s', 'Discord').success(process.env.GUILD);
                resolve(true);
            } catch (error) {
                return reject(error);
            }
        })
    }
}
