import 'reflect-metadata';
import { Request, Response } from 'express';
import { container } from 'tsyringe';
import responseError from '../../../../../shared/helpers/response-error';
import responseSuccess from '../../../../../shared/helpers/response.success';
import AppError, { AlertMessage } from '../../../../../shared/errors/app-error';
import { CommonMessages } from '../../../../../shared/errors/common-messages';
import RegisterService from '../../../services/register.service';
import ForgotPasswordService from '../../../services/forgot-password.service';
import ResetPasswordService from '../../../services/reset-password.service';
import { ActionType } from '../../../../../shared/constants/actions';
import AuthenticationService from '../../../services/authentication.service';

class AuthenticationController {
  public async register(_req: Request, _res: Response): Promise<Response> {
    try {
      const { firstName, lastName, email, password } = _req.body;

      // Validate user input
      if (!(email && password && firstName && lastName)) {
        throw new AppError(
          AlertMessage.error,
          'Required fields missing',
          CommonMessages.PARAMETERS_MANDATORY,
        );
      }

      const user = _req.body;
      const registerService = container.resolve(RegisterService);
      const registerResponse = await registerService.execute(user);
      return responseSuccess(_req, _res, registerResponse);
    } catch (error) {
      console.error(error);
      return responseError(_req, _res, error);
    }
  }

  public async login(_req: Request, _res: Response): Promise<Response> {
    try {
      const { email, password } = _req.body;

      // Validate user input
      if (!(email && password)) {
        throw new AppError(
          AlertMessage.error,
          'Required fields missing',
          CommonMessages.PARAMETERS_MANDATORY,
        );
      }

      const user = _req.body;
      const action = ActionType.LOG_IN;
      const authService = container.resolve(AuthenticationService);
      const authResponse = await authService.execute(user, action);
      return responseSuccess(_req, _res, authResponse);
    } catch (error) {
      console.error(error);
      return responseError(_req, _res, error);
    }
  }

  public async logout(_req: Request, _res: Response): Promise<Response> {
    try {
      const { email, password } = _req.body;

      // Validate user input
      if (!(email && password)) {
        throw new AppError(
          AlertMessage.error,
          'Required fields missing',
          CommonMessages.PARAMETERS_MANDATORY,
        );
      }

      const user = _req.body;
      const action = ActionType.LOG_OUT;
      const authService = container.resolve(AuthenticationService);
      const authResponse = await authService.execute(user, action);
      return responseSuccess(_req, _res, authResponse);
    } catch (error) {
      console.error(error);
      return responseError(_req, _res, error);
    }
  }

  public async forgotPassword(
    _req: Request,
    _res: Response,
  ): Promise<Response> {
    try {
      const { email } = _req.body;

      // Validate user input
      if (!email) {
        throw new AppError(
          AlertMessage.error,
          'Required fields missing',
          CommonMessages.PARAMETERS_MANDATORY,
        );
      }

      const forgotPasswordService = container.resolve(ForgotPasswordService);
      const forgotPasswordResponse = await forgotPasswordService.execute(email);
      return responseSuccess(_req, _res, forgotPasswordResponse);
    } catch (error) {
      console.error(error);
      return responseError(_req, _res, error);
    }
  }

  public async resetPassword(_req: Request, _res: Response): Promise<Response> {
    try {
      const { password } = _req.body;
      const { resetToken } = _req.params;

      // Validate user input
      if (!(password && resetToken)) {
        throw new AppError(
          AlertMessage.error,
          'Required fields missing',
          CommonMessages.PARAMETERS_MANDATORY,
        );
      }

      const resetPasswordService = container.resolve(ResetPasswordService);
      const resetPasswordResponse = await resetPasswordService.execute(
        resetToken,
        password,
      );
      return responseSuccess(_req, _res, resetPasswordResponse);
    } catch (error) {
      console.error(error);
      return responseError(_req, _res, error);
    }
  }
}

export default AuthenticationController;
