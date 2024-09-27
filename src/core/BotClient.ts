import { Client, Collection, type ClientOptions } from "discord.js";
import type { BotCommand } from "./BotCommand";

export class BotClient extends Client {
    commands: Collection<string, BotCommand>;

    constructor(botOption: ClientOptions) {
        super(botOption);
        this.commands = new Collection();
    }
}