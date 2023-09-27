"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const CommonMessages_1 = require("../errors/CommonMessages");
exports.default = (_req, _res, error) => {
    let errorCode;
    if (error === null || error === void 0 ? void 0 : error.errorCode) {
        errorCode = {
            code: error.errorCode.code,
            message: error.errorCode.message,
            status: error.errorCode.status,
        };
    }
    else {
        errorCode = CommonMessages_1.CommonMessages.NOT_EXPECTED_ERROR;
    }
    return _res.status(errorCode.status).jsonp({
        errorCode: errorCode.code,
        errorMessage: errorCode.message,
    });
};
//# sourceMappingURL=response-error.js.map