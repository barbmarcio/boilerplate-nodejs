"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const tsyringe_1 = require("tsyringe");
const authentication_repository_1 = __importDefault(require("../infra/typeom/repositories/authentication.repository"));
tsyringe_1.container.registerSingleton('AuthenticationRepository', authentication_repository_1.default);
//# sourceMappingURL=index.js.map