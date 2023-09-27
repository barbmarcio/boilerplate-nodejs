"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const compression_1 = __importDefault(require("compression"));
const routes_1 = __importDefault(require("./shared/infra/http/routes"));
class App {
    constructor() {
        this.app = (0, express_1.default)();
        this.config();
    }
    config() {
        this.app.use((0, compression_1.default)());
        this.app.use(express_1.default.json({ limit: '50mb' }));
        this.app.use(express_1.default.urlencoded({ limit: '50mb' }));
        this.app.use((0, cors_1.default)());
        this.app.use(routes_1.default);
    }
}
exports.default = new App().app;
//# sourceMappingURL=index.js.map