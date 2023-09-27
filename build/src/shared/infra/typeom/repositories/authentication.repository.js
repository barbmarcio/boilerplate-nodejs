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
const ormconfig_1 = require("../../../database/ormconfig");
const user_entity_1 = __importDefault(require("../entities/user.entity"));
class AuthenticationRepository {
    constructor() {
        this.authRepository = ormconfig_1.AppDataSource.getRepository(user_entity_1.default);
    }
    getUserByEmail(email) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.authRepository.findOne({
                where: {
                    email,
                }
            });
        });
    }
    register(data) {
        return __awaiter(this, void 0, void 0, function* () {
            const newUser = this.authRepository.create(data);
            yield this.authRepository.save(newUser);
            return newUser;
        });
    }
    login(email, token) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.authRepository.save({
                email,
                token,
            });
        });
    }
    logout(data) {
        return __awaiter(this, void 0, void 0, function* () {
            return '';
        });
    }
    resetPassword(email) {
        return __awaiter(this, void 0, void 0, function* () {
            return '';
        });
    }
}
exports.default = AuthenticationRepository;
//# sourceMappingURL=authentication.repository.js.map