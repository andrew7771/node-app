import { IncomingMessage, ServerResponse } from 'http';
import { ITableHandler } from './table-handler.interface';
import { GuestTableHandler } from './tables/guests';

export class TableInitializer {
    create(req: IncomingMessage, res: ServerResponse): void {
        const tableHandlers: ITableHandler[] = [];

        tableHandlers.push(new GuestTableHandler());

        tableHandlers.forEach(handler => handler.createTable());

        res.end();
    }
}