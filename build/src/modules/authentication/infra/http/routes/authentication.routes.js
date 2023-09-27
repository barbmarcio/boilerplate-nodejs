"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const express_1 = require("express");
const tsyringe_1 = require("tsyringe");
const authentication_controller_1 = __importDefault(require("../controller/authentication.controller"));
const authRouter = (0, express_1.Router)();
const authController = tsyringe_1.container.resolve(authentication_controller_1.default);
authRouter.post('/register', authController.register);
authRouter.post('/login', authController.login);
exports.default = authRouter;
//# sourceMappingURL=authentication.routes.js.map