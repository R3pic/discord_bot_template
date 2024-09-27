import { Events, type ClientEvents } from 'discord.js';
import Logger from '../../logger/Logger';
import { BotEvent } from '../../core/BotEvent';

export class ReadyEvent extends BotEvent<Events.ClientReady> {
    constructor() {
        super({ name: Events.ClientReady, once: true });
    }

    async execute(...args: ClientEvents[Events.ClientReady]): Promise<void> {
        const client = args[0];
        Logger.info(`${client.user.tag} Is Ready!`);
    }
}