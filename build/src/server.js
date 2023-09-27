"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = require("dotenv");
const index_1 = __importDefault(require("./index"));
const ormconfig_1 = require("./shared/database/ormconfig");
require("./shared/dependencies");
(0, dotenv_1.config)();
console.log('🔄 - Connecting to the database.');
ormconfig_1.AppDataSource.initialize()
    .then(() => __awaiter(void 0, void 0, void 0, function* () {
    const PORT = process.env.FF_BACKEND_PORT || 3000;
    index_1.default.listen(PORT, () => {
        console.log('🆗 - Database connected successfully!');
        console.log(`🆗 - FF Backend server started on port ${PORT}!`);
    });
}))
    .catch((error) => {
    console.log('❌ - Error while connecting to the database', error);
});
//# sourceMappingURL=server.js.map