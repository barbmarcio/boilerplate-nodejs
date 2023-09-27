import HttpStatusCode from '../constants/HttpStatusCode';
import ErrorResultInterface from './error-result.interface';

export const CommonMessages: {
  [key: string]: ErrorResultInterface;
} = {
  PARAMETERS_MANDATORY: {
    code: '000-001',
    message: 'Mandatory parameters not provided',
    status: HttpStatusCode.BAD_REQUEST,
  },
  NOT_EXPECTED_ERROR: {
    code: '000-002',
    message: 'Not expected error',
    status: HttpStatusCode.INTERNAL_SERVER_ERROR,
  },
  NOT_FOUND_ERROR: {
    code: '000-003',
    message: 'Provided ID was not found',
    status: HttpStatusCode.NOT_FOUND,
  },
  TOO_MANY_REQUESTS: {
    code: '000-004',
    message: 'Too many requests while processing data',
    status: HttpStatusCode.TOO_MANY_REQUESTS,
  },
  WRONG_FORMAT: {
    code: '000-005',
    message: 'Unexpected data format',
    status: HttpStatusCode.BAD_REQUEST,
  },
  ALREADY_EXISTS: {
    code: '000-006',
    message: 'Already existing information',
    status: HttpStatusCode.CONFLICT,
  },
  INVALID_TOKEN: {
    code: '000-007',
    message: 'Invalid token',
    status: HttpStatusCode.UNAUTHORIZED,
  },
  INVALID_CREDENTIALS: {
    code: '000-008',
    message: 'Invalid credentials',
    status: HttpStatusCode.UNAUTHORIZED,
  },
  MISSING_TOKEN: {
    code: '000-009',
    message: 'Missing token',
    status: HttpStatusCode.FORBIDDEN,
  },
};
