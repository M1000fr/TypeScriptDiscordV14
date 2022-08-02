import { ApplicationCommandData } from "discord.js"
import Command from '../Interfaces/Command';

export type CommandOptions = ApplicationCommandData & {
    run: Command
}
