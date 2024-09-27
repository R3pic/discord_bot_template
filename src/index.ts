import { DiscordBot } from "./core/DiscordBot";
import { Env } from "./core/Env";
import clientOptions from "./Bot/ClientOptions";
import { InteractionCreateEvent, ReadyEvent } from "./Bot/events";
import { ExampleCommand } from "./ExampleService/PingPongCommand";

const bot = new DiscordBot({
    token: Env.BOT_TOKEN,
    clientOptions: clientOptions,
})
    .events(
        new ReadyEvent(),
        new InteractionCreateEvent(),
    )
    .commands(
        new ExampleCommand(),
    );

await bot.login();