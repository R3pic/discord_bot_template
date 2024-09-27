import type { ClientEvents, ClientOptions } from "discord.js";
import { BotClient } from "./BotClient";
import type { BotCommand } from "./BotCommand";
import type { BotEvent } from "./BotEvent";
import Logger from "../logger/Logger";

export interface DiscordBotOption {
    token: string;
    clientOptions: ClientOptions;
}

export class DiscordBot {
    private client: BotClient;
    private token: string;
    constructor(options: DiscordBotOption) {
        this.token = options.token;
        this.client = new BotClient(options.clientOptions);
    }

    commands(...commands: BotCommand[]): DiscordBot {
        Logger.debug('Command Register Start');

        commands.forEach(command => {
            const commandName = command.data.name;
            this.client.commands.set(commandName, command);
            Logger.info(`Successfully Registered Command : ${commandName}`);
        });

        Logger.debug('Command Register End');
        return this;
    }

    events(...events: BotEvent<keyof ClientEvents>[]): DiscordBot {
        Logger.debug('Event Register Start');

        events.forEach(event => {
            if (event.once) {
                this.client.once(event.name, async (...args: ClientEvents[typeof event.name]) => {
                    await event.execute(...args);
                });
                Logger.info(`Successfully Registered Once Event: ${event.name}`);
            } else {
                this.client.on(event.name, async (...args: ClientEvents[typeof event.name]) => {
                    await event.execute(...args);
                });
                Logger.info(`Successfully Registered On Event : ${event.name}`);
            }
        });

        Logger.debug('Event Register End');
        return this;
    }

    async login() {
        await this.client.login(this.token);
    }
}