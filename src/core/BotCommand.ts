import type {
    SlashCommandBuilder,
    SlashCommandSubcommandsOnlyBuilder,
    SlashCommandSubcommandBuilder,
    SlashCommandOptionsOnlyBuilder,
    ChatInputCommandInteraction
} from "discord.js";

export abstract class BotCommand {
    data: SlashCommandBuilder | SlashCommandSubcommandsOnlyBuilder
        | SlashCommandSubcommandBuilder | SlashCommandOptionsOnlyBuilder;

    constructor(data: SlashCommandBuilder | SlashCommandSubcommandsOnlyBuilder
        | SlashCommandSubcommandBuilder | SlashCommandOptionsOnlyBuilder) {
        this.data = data;
    }

    abstract execute(interaction: ChatInputCommandInteraction): Promise<unknown>;
    toJSON() {
        return this.data.toJSON();
    }
}