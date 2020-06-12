import {createLogger, transports, format} from "winston";
import * as path from 'path';

export function logger(caller: any) {
    return createLogger({
        defaultMeta: {app: 'dynamo-investigation'},
        level: process.env.APP_LOG_LEVEL ?? 'info',
        transports: [new transports.Console()],
        format: format.combine(
            format.label({label: path.basename(caller)}),
            format.timestamp({format: 'YYYY-MM-DD HH:mm:ss'}),
            format.printf(log => `${log.timestamp} ${log.level.toUpperCase()} [${log.label}]: ${log.message}`
            )
        )
    });
}