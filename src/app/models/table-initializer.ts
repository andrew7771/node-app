import { IncomingMessage, ServerResponse } from 'http';
import { ITableHandler } from './table-handler.interface';
import { GuestTableHandler } from './tables/guests';

export class TableInitializer {
    async create(req: IncomingMessage, res: ServerResponse): Promise<void> {
        const tableHandlers: ITableHandler[] = [];

        tableHandlers.push(new GuestTableHandler());

        for (const handler of tableHandlers) {
            await handler.createTable();
        }

        res.end();
    }
}