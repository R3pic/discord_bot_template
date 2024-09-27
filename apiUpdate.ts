import { REST, Routes, type APIApplicationCommand, type RESTPostAPIChatInputApplicationCommandsJSONBody } from "discord.js";
import { Env } from "./src/core/Env";
import type { BotCommand } from "./src/core/BotCommand";
import { ExampleCommand } from "./src/ExampleService/PingPongCommand";

const rest = new REST().setToken(Env.BOT_TOKEN);

class CommandLoader {
    static load(commands: BotCommand[]) {
        const loaded: RESTPostAPIChatInputApplicationCommandsJSONBody[] = [];
        commands.forEach(command => {
            const commandData = command.toJSON() as RESTPostAPIChatInputApplicationCommandsJSONBody;
            loaded.push(commandData);
        });

        return loaded;
    }
}

const commands = CommandLoader.load([
    /* Command for APIUpdate */
    new ExampleCommand(),
]);

console.info('Command API update Start');
try {
    console.info('Started refreshing application (/) commands.');

    const currentCommands: APIApplicationCommand[] = await rest.get(
        Routes.applicationCommands(Env.BOT_ID)
    ) as APIApplicationCommand[];
    const commandsToDelete = currentCommands.filter(currentCommand => {
        return !commands.some(newCommand => newCommand.name === currentCommand.name);
    });
    for (const command of commandsToDelete) {
        await rest.delete(
            `${Routes.applicationCommands(Env.BOT_ID)}/${command.id}`
        );
        console.info(`Deleted command: ${command.name}`);
    }

    await rest.put(
        Routes.applicationCommands(Env.BOT_ID),
        { body: commands }
    );

    console.debug('Successfully reloaded application (/) commands.');
} catch (error) {
    console.error(error);
}
console.info('Command API update End');