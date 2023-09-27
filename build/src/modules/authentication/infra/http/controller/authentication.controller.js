"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
require("reflect-metadata");
const tsyringe_1 = require("tsyringe");
const response_error_1 = __importDefault(require("../../../../../shared/helpers/response-error"));
const response_success_1 = __importDefault(require("../../../../../shared/helpers/response.success"));
const login_service_1 = __importDefault(require("../../../services/login.service"));
const AppError_1 = __importStar(require("../../../../../shared/errors/AppError"));
const CommonMessages_1 = require("../../../../../shared/errors/CommonMessages");
const register_service_1 = __importDefault(require("../../../services/register.service"));
class AuthenticationController {
    register(_req, _res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { firstName, lastName, email, password } = _req.body;
                // Validate user input
                if (!(email && password && firstName && lastName)) {
                    throw new AppError_1.default(AppError_1.AlertMessage.error, 'Required fields missing', CommonMessages_1.CommonMessages.PARAMETERS_MANDATORY);
                }
                const user = _req.body;
                const registerService = tsyringe_1.container.resolve(register_service_1.default);
                const registerResponse = yield registerService.execute(user);
                return (0, response_success_1.default)(_req, _res, registerResponse);
            }
            catch (error) {
                console.error(error);
                return (0, response_error_1.default)(_req, _res, error);
            }
        });
    }
    login(_req, _res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const user = _req.body;
                const loginService = tsyringe_1.container.resolve(login_service_1.default);
                const loggedInResponse = yield loginService.execute(user);
                return (0, response_success_1.default)(_req, _res, loggedInResponse);
            }
            catch (error) {
                console.error(error);
                return (0, response_error_1.default)(_req, _res, error);
            }
        });
    }
}
exports.default = AuthenticationController;
//# sourceMappingURL=authentication.controller.js.map