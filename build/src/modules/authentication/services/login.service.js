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
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
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
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const tsyringe_1 = require("tsyringe");
const authentication_mapper_1 = __importDefault(require("../../../shared/infra/typeom/mappers/authentication.mapper"));
const AppError_1 = __importStar(require("../../../shared/errors/AppError"));
const CommonMessages_1 = require("../../../shared/errors/CommonMessages");
let LogInService = class LogInService {
    constructor(authRepository) {
        this.authRepository = authRepository;
    }
    execute(data) {
        return __awaiter(this, void 0, void 0, function* () {
            const foundUser = yield this.authRepository.getUserByEmail(data.email);
            if (!foundUser) {
                throw new AppError_1.default(AppError_1.AlertMessage.error, 'No user found with provided email', CommonMessages_1.CommonMessages.NOT_FOUND_ERROR);
            }
            if (!(yield bcrypt_1.default.compare(data.password, foundUser.password))) {
                throw new AppError_1.default(AppError_1.AlertMessage.error, 'Invalid credentials', CommonMessages_1.CommonMessages.INVALID_CREDENTIALS);
            }
            data.token = jsonwebtoken_1.default.sign({
                email: data.email,
            }, process.env.JWT_TOKEN_KEY, {
                expiresIn: '2h',
            });
            const mappedUser = authentication_mapper_1.default.toEntity(data);
            yield this.authRepository.login(mappedUser.email, mappedUser.token);
            return 'Successfully logged in';
        });
    }
};
LogInService = __decorate([
    (0, tsyringe_1.injectable)(),
    __param(0, (0, tsyringe_1.inject)('AuthenticationRepository')),
    __metadata("design:paramtypes", [Object])
], LogInService);
exports.default = LogInService;
//# sourceMappingURL=login.service.js.map