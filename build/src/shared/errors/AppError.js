"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AlertMessage = void 0;
var AlertMessage;
(function (AlertMessage) {
    AlertMessage["error"] = "FF_BE_App_Error";
    AlertMessage["warn"] = "FF_BE_App_Warning";
    AlertMessage["info"] = "FF_BE_App_Info";
})(AlertMessage || (exports.AlertMessage = AlertMessage = {}));
class AppError {
    constructor(errorType, message, errorCode) {
        this.errorType = errorType;
        this.message = message;
        this.errorCode = errorCode;
    }
}
exports.default = AppError;
//# sourceMappingURL=AppError.js.map