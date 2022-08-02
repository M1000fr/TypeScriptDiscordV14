import { SlashCommandBuilder } from "discord.js"

export default interface CommandOption extends SlashCommandBuilder {
    run: Function
}