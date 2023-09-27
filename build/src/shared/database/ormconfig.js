"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppDataSource = void 0;
require("reflect-metadata");
const typeorm_1 = require("typeorm");
const _1695742412613_CreateUsersTable_1 = require("../infra/typeom/migrations/1695742412613-CreateUsersTable");
const user_entity_1 = __importDefault(require("../infra/typeom/entities/user.entity"));
exports.AppDataSource = new typeorm_1.DataSource({
    type: 'mysql',
    host: '127.0.0.1',
    port: 3306,
    username: 'root',
    password: 'Pass@123',
    database: 'ff_replat',
    synchronize: true,
    logging: false,
    entities: [user_entity_1.default],
    migrations: [_1695742412613_CreateUsersTable_1.CreateUsersTable1695742412613],
    subscribers: [],
    migrationsRun: true, // Boolean(process.env.FF_TYPEORM_MIGRATIONS) || true,
});
//# sourceMappingURL=ormconfig.js.map