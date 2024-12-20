import winston from "winston"
import { Config } from ".";

const levels = {
    error: 0,
    warn: 1,
    info: 2,
    http: 3,
    verbose: 4,
    debug: 5

};

const colors = {
    error: 'red',
    warn: 'yellow',
    info: 'green',
    http: 'magenta',
    debug: 'blue',
};

winston.addColors(colors);

// log Format

const logFormat = winston.format.combine(
    winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
    winston.format.colorize({ all: true }),
    winston.format.json(),
    winston.format.printf(
        (info) => `${info.timestamp} ${info.level}: ${info.message}`
    )
)

// get level for logger

const level = () => {
    const env = Config.NODE_ENV || 'production';
    return env === 'development' ? 'debug' : 'info'
}

const logger = winston.createLogger({
    level:level(),
    levels,
    format:logFormat,
    transports:[
        new winston.transports.Console()
    ]
})

export default logger