/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Request, Response } from 'express';
import { CommonMessages } from '../errors/common-messages';
import ErrorResultInterface from '../errors/error-result.interface';

interface DefaultErrorCode {
  errorCode: ErrorResultInterface;
}

export default (
  _req: Request,
  _res: Response,
  error: ErrorResultInterface | DefaultErrorCode,
) => {
  let errorCode;
  if ((error as DefaultErrorCode).errorCode) {
    const mappedError = (error as DefaultErrorCode).errorCode;
    errorCode = {
      code: mappedError.code,
      message: mappedError.message,
      status: mappedError.status,
    };
  } else {
    errorCode = CommonMessages.NOT_EXPECTED_ERROR;
  }

  return _res.status(errorCode.status).jsonp({
    errorCode: errorCode.code,
    errorMessage: errorCode.message,
  });
};
