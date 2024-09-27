import type { ClientEvents } from "discord.js";

export abstract class BotEvent<K extends keyof ClientEvents> {
    name: K;
    once: boolean;

    constructor(data: { name: K, once: boolean }) {
        this.name = data.name;
        this.once = data.once;
    }

    abstract execute(...args: ClientEvents[K]): Promise<void>;
}