import { ApplicationCommandData, ApplicationCommandOptionData } from "discord.js"
import Command from '../Interfaces/Command';

export type CommandData = ApplicationCommandData & {
    run: Command
}