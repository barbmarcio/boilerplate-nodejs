import { config } from 'dotenv';
import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import AppError, { AlertMessage } from '../errors/app-error';
import { CommonMessages } from '../errors/common-messages';
import responseError from '../helpers/response-error';
config();

const verifyToken = (_req: Request, _res: Response, _next: NextFunction) => {
  const token =
    _req.body.token || _req.query.token || _req.headers['x-access-token'];

  if (!token?.length) {
    return responseError(
      _req,
      _res,
      new AppError(
        AlertMessage.error,
        'Missing token',
        CommonMessages.MISSING_TOKEN,
      ),
    );
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_TOKEN_KEY as jwt.Secret);
    (_req as any).user = decoded;
  } catch (err) {
    return responseError(
      _req,
      _res,
      new AppError(
        AlertMessage.error,
        'Invalid token',
        CommonMessages.INVALID_TOKEN,
      ),
    );
  }

  return _next();
};

export default verifyToken;
