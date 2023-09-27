"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const HttpStatusCode_1 = __importDefault(require("../constants/HttpStatusCode"));
exports.default = (_req, _res, result) => {
    return _res.status(HttpStatusCode_1.default.OK).jsonp(result);
};
//# sourceMappingURL=response.success.js.map