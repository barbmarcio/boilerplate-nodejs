/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Request, Response } from 'express';
import HttpStatusCode from '../constants/HttpStatusCode';

export default (_req: Request, _res: Response, result?: any) => {
  return _res.status(HttpStatusCode.OK).jsonp(result);
};
