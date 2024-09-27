import { GatewayIntentBits, type ClientOptions } from 'discord.js';

const clientOptions: ClientOptions = {
    intents: (
        GatewayIntentBits.Guilds |
        GatewayIntentBits.GuildMessages |
        GatewayIntentBits.MessageContent
    )
};

export default clientOptions;