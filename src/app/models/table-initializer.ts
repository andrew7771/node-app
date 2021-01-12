import { IncomingMessage, ServerResponse } from 'http';
import { ITableHandler } from './table-handler.interface';
import { AmenitiesTableHandler } from './tables/amenities';
import { AmenityCategoriesTableHandler } from './tables/amenity-categories';
import { CountriesTableHandler } from './tables/countries';
import { GuestTableHandler } from './tables/guests';
import { HostUsersTableHandler } from './tables/host-users';
import { HotelsTableHandler } from './tables/hotes';

export class TableInitializer {
    async create(req: IncomingMessage, res: ServerResponse): Promise<void> {
        const tableHandlers: ITableHandler[] = [];

        tableHandlers.push(new CountriesTableHandler());
        tableHandlers.push(new GuestTableHandler());
        tableHandlers.push(new HostUsersTableHandler());
        tableHandlers.push(new HotelsTableHandler());
        tableHandlers.push(new AmenitiesTableHandler());
        tableHandlers.push(new AmenityCategoriesTableHandler());

        for (const handler of tableHandlers) {
            await handler.createTable();
        }

        res.end();
    }
}