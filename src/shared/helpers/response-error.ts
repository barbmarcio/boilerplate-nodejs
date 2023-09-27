import { Request, Response } from 'express';
import { CommonMessages } from '../errors/common-messages';

export default (_req: Request, _res: Response, error: any) => {
  let errorCode;
  if (error?.errorCode) {
    errorCode = {
      code: error.errorCode.code,
      message: error.errorCode.message,
      status: error.errorCode.status,
    };
  } else {
    errorCode = CommonMessages.NOT_EXPECTED_ERROR;
  }

  return _res.status(errorCode.status).jsonp({
    errorCode: errorCode.code,
    errorMessage: errorCode.message,
  });
};
