import { Request, Response } from 'express';
import HttpStatusCode from '../constants/HttpStatusCode';

export default (_req: Request, _res: Response, result?: any) => {
  return _res.status(HttpStatusCode.OK).jsonp(result);
};
