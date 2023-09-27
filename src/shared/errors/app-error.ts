import ErrorResultInterface from './error-result.interface';

export enum AlertMessage {
  error = 'FF_BE_App_Error',
  warn = 'FF_BE_App_Warning',
  info = 'FF_BE_App_Info',
}

class AppError {
  public readonly errorType: AlertMessage;

  public readonly message: string;

  public readonly errorCode: ErrorResultInterface;

  constructor(
    errorType: AlertMessage,
    message: string,
    errorCode: ErrorResultInterface,
  ) {
    this.errorType = errorType;
    this.message = message;
    this.errorCode = errorCode;
  }
}

export default AppError;
