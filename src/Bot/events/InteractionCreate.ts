import { Events, type ClientEvents } from 'discord.js';

import Logger from '../../logger/Logger.ts';
import { BotEvent } from '../../core/BotEvent.ts';
import type { BotClient } from '../../core/BotClient.ts';

export class InteractionCreateEvent extends BotEvent<Events.InteractionCreate> {
    constructor() {
        super({ name: Events.InteractionCreate, once: false });
    }

    async execute(...args: ClientEvents[Events.InteractionCreate]): Promise<void> {
        const interaction = args[0];
        if (!interaction.isChatInputCommand()) return;

        const { client, commandName } = interaction;
        const command = (client as BotClient).commands.get(commandName);

        if (!command) {
            Logger.error(`No Command Match ${commandName}`);
            await interaction.reply({ content: '존재하지 않는 명령어입니다.', ephemeral: true });
            return;
        }

        try {
            await command.execute(interaction);
        } catch (err) {
            Logger.error(err);
            if (interaction.replied || interaction.deferred) {
                await interaction.followUp({ content: '명령어를 실행하는 중 에러가 발생했습니다.', ephemeral: true });
            } else {
                await interaction.reply({ content: '명령어를 실행하는 중 에러가 발생했습니다.', ephemeral: true });
            }
        }
    }
}