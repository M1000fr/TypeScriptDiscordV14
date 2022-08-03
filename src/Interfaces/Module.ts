import CommandOption from "./CommandOption";
import Event from "./Event";

export interface Module {
    Events: Event[];
    Commands: CommandOption[];
}