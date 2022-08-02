import { CommandInteraction } from "discord.js"
import ExtendedClient from "../Class/Client";

export default interface Command {
    (client: ExtendedClient,
    interaction: CommandInteraction)
}