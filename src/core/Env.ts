const {
    NODE_ENV,
    BOT_TOKEN,
    BOT_ID,
    ADMIN_ID,
} = Bun.env;

if (!NODE_ENV) {
    console.error("NODE_ENV not set.");
    process.exit(1);
}

if (!BOT_TOKEN) {
    console.error("BOT_TOKEN not set.");
    process.exit(1);
}

if (!BOT_ID) {
    console.error("BOT_ID not set.");
    process.exit(1);
}

if (!ADMIN_ID) {
    console.warn("ADMIN_ID not set.");
}

export const Env = {
    BOT_TOKEN,
    BOT_ID,
    ADMIN_ID,
    NODE_ENV
}