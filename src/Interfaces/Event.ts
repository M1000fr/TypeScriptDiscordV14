import { ClientEvents } from "discord.js";
import ExtendedClient from "../Class/Client";

export default interface Event {
    name: keyof ClientEvents;
    run: (client: ExtendedClient, ...args: any[]) => void;
}