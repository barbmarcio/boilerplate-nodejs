"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CommonMessages = void 0;
const HttpStatusCode_1 = __importDefault(require("../constants/HttpStatusCode"));
exports.CommonMessages = {
    PARAMETERS_MANDATORY: {
        code: '000-001',
        message: 'Mandatory parameters not provided',
        status: HttpStatusCode_1.default.BAD_REQUEST,
    },
    NOT_EXPECTED_ERROR: {
        code: '000-002',
        message: 'Not expected error',
        status: HttpStatusCode_1.default.INTERNAL_SERVER_ERROR,
    },
    NOT_FOUND_ERROR: {
        code: '000-003',
        message: 'Provided ID was not found',
        status: HttpStatusCode_1.default.NOT_FOUND,
    },
    TOO_MANY_REQUESTS: {
        code: '000-004',
        message: 'Too many requests while processing data',
        status: HttpStatusCode_1.default.TOO_MANY_REQUESTS,
    },
    WRONG_FORMAT: {
        code: '000-005',
        message: 'Unexpected data format',
        status: HttpStatusCode_1.default.BAD_REQUEST,
    },
    ALREADY_EXISTS: {
        code: '000-006',
        message: 'Already existing information',
        status: HttpStatusCode_1.default.CONFLICT,
    },
    INVALID_TOKEN: {
        code: '000-007',
        message: 'Invalid token',
        status: HttpStatusCode_1.default.UNAUTHORIZED,
    },
    INVALID_CREDENTIALS: {
        code: '000-008',
        message: 'Invalid credentials',
        status: HttpStatusCode_1.default.UNAUTHORIZED,
    },
    MISSING_TOKEN: {
        code: '000-009',
        message: 'Missing token',
        status: HttpStatusCode_1.default.FORBIDDEN,
    },
};
//# sourceMappingURL=CommonMessages.js.map