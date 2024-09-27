
import { type ChatInputCommandInteraction, SlashCommandBuilder } from 'discord.js';
import { BotCommand } from '../core/BotCommand';
export class ExampleCommand extends BotCommand {
    constructor() {
        super(new SlashCommandBuilder()
            .setName('ping')
            .setDescription('reply pong.')
        );
    }

    async execute(interaction: ChatInputCommandInteraction): Promise<void> {
        interaction.reply("Pong!");
    }
}
