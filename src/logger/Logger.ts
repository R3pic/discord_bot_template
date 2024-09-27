import winston from 'winston';
import { Env } from '../core/Env';
const {
    combine,
    timestamp,
    printf,
    colorize,
    errors,
    label
} = winston.format;

const logFormat = printf(({ level, message, timestamp, label, stack }) => {
    return `${timestamp} [${label}] ${level}: ${stack || message}`;
});

const LoggerConfig = {
    get(NODE_ENV: string) {
        return NODE_ENV === 'development' ? this.loggers.development : this.loggers.production;
    },
    loggers: {
        development: {
            level: 'debug',
            format: combine(
                colorize(),
                label({ label: 'Discord Bot' }),
                errors({ stack: true }),
                timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
                logFormat
            )
        },
        production: {
            level: 'info',
            format: combine(
                colorize(),
                label({ label: 'Discord Bot' }),
                errors({ stack: true }),
                timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
                logFormat
            )
        }
    }
};

const { level, format } = LoggerConfig.get(Env.NODE_ENV);

const Logger = winston.createLogger({
    level: level,
    format: format,
    transports: [
        new winston.transports.Console()
    ],
    exceptionHandlers: [
        new winston.transports.Console()
    ]
});

export default Logger;