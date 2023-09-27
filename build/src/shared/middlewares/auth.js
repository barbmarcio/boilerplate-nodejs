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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = require("dotenv");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const AppError_1 = __importStar(require("../errors/AppError"));
const CommonMessages_1 = require("../errors/CommonMessages");
const response_error_1 = __importDefault(require("../helpers/response-error"));
(0, dotenv_1.config)();
const verifyToken = (_req, _res, _next) => {
    const token = _req.body.token || _req.query.token || _req.headers['x-access-token'];
    if (!(token === null || token === void 0 ? void 0 : token.length)) {
        return (0, response_error_1.default)(_req, _res, new AppError_1.default(AppError_1.AlertMessage.error, 'Missing token', CommonMessages_1.CommonMessages.MISSING_TOKEN));
    }
    try {
        const decoded = jsonwebtoken_1.default.verify(token, process.env.JWT_TOKEN_KEY);
        _req.user = decoded;
    }
    catch (err) {
        return (0, response_error_1.default)(_req, _res, new AppError_1.default(AppError_1.AlertMessage.error, 'Invalid token', CommonMessages_1.CommonMessages.INVALID_TOKEN));
    }
    return _next();
};
exports.default = verifyToken;
//# sourceMappingURL=auth.js.map